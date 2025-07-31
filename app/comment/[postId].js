import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePosts } from '../context/PostContext';

export default function CommentScreen() {
  const { postId } = useLocalSearchParams();
  const { posts, addComment } = usePosts();
  const router = useRouter();
  const post = posts.find(p => p.id === Number(postId));
  const [input, setInput] = useState('');

  if (!post) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>글을 찾을 수 없습니다.</Text></View>;

  const handleAddComment = () => {
    if (input.trim()) {
      addComment(postId, input);
      setInput('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "#f8fafc" }}>
      {/* SVG 자리 */}
      <View style={{ alignItems: 'center', marginBottom: 16, height: 60 }}>
        {/* <YourSVGComponent /> */}
      </View>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
        <Text style={{ color: "#2563eb", fontSize: 16 }}>← 글로 돌아가기</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>{post.title}</Text>
      <Text style={{ fontSize: 16, color: "#888", marginBottom: 14 }}>{post.content}</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 20 }}>댓글</Text>
      <FlatList
        data={post.comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
            shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 2,
          }}>
            <Text style={{ color: "#374151" }}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888", textAlign: "center", marginVertical: 10 }}>첫 댓글을 남겨보세요!</Text>
        }
        style={{ marginBottom: 12 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <TextInput
          placeholder="댓글 입력"
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 10, backgroundColor: "#fff"
          }}
        />
        <TouchableOpacity onPress={handleAddComment} style={{
          backgroundColor: '#3b82f6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, marginLeft: 8
        }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
