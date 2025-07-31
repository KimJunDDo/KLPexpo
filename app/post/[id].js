import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KLP from '../assets/svgs/KLP_SVG.svg';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

function formatDate(ts) {
  const date = new Date(ts);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
}

async function getImageForPost(postId) {
  try {
    return await AsyncStorage.getItem('KLPexpo_image_' + postId);
  } catch {
    return null;
  }
}

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { posts, addComment } = usePosts();
  const { user } = useAuth();
  const post = posts.find(p => p.id === id || p.id === Number(id));
  const [input, setInput] = useState('');
  const [imageUri, setImageUri] = useState(post?.image ?? null);

  useEffect(() => {
    let ignore = false;
    if (!post) return;
    getImageForPost(post.id).then(uri => {
      if (!ignore) setImageUri(uri);
    });
    return () => { ignore = true; };
  }, [post?.id]);

  if (!post) return <View style={styles.center}><Text>글을 찾을 수 없습니다.</Text></View>;

  const handleAddComment = () => {
    if (!user) return Alert.alert("로그인 필요", "댓글을 작성하려면 로그인해야 합니다.");
    if (input.trim()) {
      addComment(post.id, {
        text: input,
        email: user.email,
        createdAt: Date.now(),
      });
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 상단바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.headerBack}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게시글</Text>
        <View style={{ flex: 1 }} />
        <KLP width={36} height={36} style={styles.headerSvg} />
      </View>
      
      {/* 게시글 카드 */}
      <View style={styles.card}>
        {/* 제목 & 작성자/날짜 한 줄 */}
        <View style={styles.titleRow}>
          <Text style={styles.postTitle} numberOfLines={2}>{post.title}</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.infoBox}>
            <Text style={styles.infoEmail}>{post.email || "익명"}</Text>
            <Text style={styles.infoDate}>{formatDate(post.createdAt)}</Text>
          </View>
        </View>
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.postImage} resizeMode="cover" />
        )}
        <Text style={styles.postContent}>{post.content}</Text>
      </View>

      {/* 댓글 입력창 */}
      <View style={styles.commentInputBox}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="댓글을 입력하세요"
          style={styles.commentInput}
          multiline
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleAddComment}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>등록</Text>
        </TouchableOpacity>
      </View>

      {/* 댓글 목록 */}
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        data={[...(post.comments || [])].reverse()}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <View style={styles.commentMeta}>
              <Text style={styles.commentEmail}>{item.email || "익명"}</Text>
              <Text style={styles.commentTime}>{item.createdAt ? formatDate(item.createdAt) : ""}</Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 8,
    paddingTop: 30,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  headerLeft: { padding: 8, marginRight: 5 },
  headerBack: { fontSize: 22, color: "#2563eb", fontWeight: "600" },
  headerTitle: { paddingTop: 4, fontSize: 18, fontWeight: "600", color: "#222" },
  headerSvg: { marginRight: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
    marginBottom: 18,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  postTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: "#374151",
    maxWidth: "54%",
  },
  infoBox: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  infoEmail: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 2,
  },
  infoDate: {
    color: "#aaa",
    fontSize: 11,
  },
  postImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 12, backgroundColor: "#e5e7eb" },
  postContent: { fontSize: 17, color: "#374151", marginBottom: 6 },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  commentMeta: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  commentEmail: { fontWeight: "bold", color: "#2563eb", fontSize: 13 },
  commentTime: { marginLeft: 10, color: "#aaa", fontSize: 11 },
  commentText: { color: "#333", fontSize: 15 },
  commentInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8fafc",
    borderColor: "#eee",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginRight: 8,
    fontSize: 15,
  },
  commentButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
