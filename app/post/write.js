import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

export default function WritePostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addPost } = usePosts();
  const { user } = useAuth();

  // 이미지 고르기
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 글 작성
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('제목과 내용을 모두 입력하세요!');
      return;
    }
    setLoading(true);
    try {
      await addPost(title, content, image, user?.email); // Firebase에 저장 (PostContext.js에서 처리)
      setTitle('');
      setContent('');
      setImage(null);
      Alert.alert('글 작성 완료!');
      router.replace('/');
    } catch (e) {
      Alert.alert('오류', '글 작성에 실패했습니다.\n' + (e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f8fafc' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Ionicons name="arrow-back" size={28} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>글 작성</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={styles.card}>
          <TextInput
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
            style={styles.inputTitle}
            autoFocus
          />
          <TextInput
            placeholder="내용"
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.inputContent}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={22} color="#3b82f6" />
            <Text style={{ color: "#3b82f6", fontWeight: "bold", marginLeft: 6 }}>이미지 첨부</Text>
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image }} style={styles.preview} />
          )}
          <TouchableOpacity
            style={[styles.submitButton, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>등록</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  headerTitle: { paddingTop: 4, fontSize: 18, fontWeight: "600", color: "#222" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginTop: 30,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: "#f9fafb"
  },
  inputContent: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    minHeight: 90,
    fontSize: 16,
    backgroundColor: "#f9fafb"
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#f0f7ff',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#e5e7eb",
  },
  submitButton: {
    marginTop: 6,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
});
