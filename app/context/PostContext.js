import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { db } from '../firebase'; // ⚠️ firebase.js에서 db만 import (storage import 필요없음)

const PostContext = createContext();

const IMAGE_KEY_PREFIX = 'KLPexpo_image_';

async function saveImageForPost(postId, imageUri) {
  try {
    await AsyncStorage.setItem(IMAGE_KEY_PREFIX + postId, imageUri);
  } catch (e) {
    console.error('이미지 저장 실패:', e);
  }
}

async function getImageForPost(postId) {
  try {
    return await AsyncStorage.getItem(IMAGE_KEY_PREFIX + postId);
  } catch (e) {
    console.error('이미지 불러오기 실패:', e);
    return null;
  }
}

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list = [];
      for (const docSnap of querySnapshot.docs) {
        const post = { id: docSnap.id, ...docSnap.data() };
        // 댓글도 불러오기
        const commentsSnap = await getDocs(collection(db, "posts", post.id, "comments"));
        post.comments = commentsSnap.docs.map(d => d.data());
        // 로컬 이미지 uri 합치기
        post.image = await getImageForPost(post.id);
        list.push(post);
      }
      setPosts(list);
    } catch (e) {
      console.error("Firestore 불러오기 실패:", e);
      Alert.alert("오류", "글 불러오기 실패!");
    } finally {
      setLoading(false);
    }
  }

  // Firestore에 글 추가, 이미지는 AsyncStorage에 따로 저장
  async function addPost(title, content, imageUri, email) {
    try {
      // Firestore에는 image: null로 저장
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        image: null,
        createdAt: Date.now(),
        email: email ?? "",
      });
      // AsyncStorage에 이미지 저장
      if (imageUri) {
        await saveImageForPost(docRef.id, imageUri);
      }
      await fetchPosts();
      return docRef.id;
    } catch (e) {
      console.error('글 작성 실패:', e);
      Alert.alert("오류", "글 작성 실패!");
      throw e;
    }
  }

  // Firestore에 댓글 추가
  async function addComment(postId, commentObj) {
    try {
      const docRef = doc(db, "posts", postId);
      const commentsRef = collection(docRef, "comments");
      await addDoc(commentsRef, commentObj);
      await fetchPosts();
    } catch (e) {
      console.error("댓글 작성 실패:", e);
      Alert.alert("오류", "댓글 작성 실패!");
    }
  }

  return (
    <PostContext.Provider value={{ posts, loading, addPost, addComment, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}
