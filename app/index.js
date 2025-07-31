import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import KLP from './assets/svgs/KLP_SVG.svg';
import { useAuth } from "./context/AuthContext";
import { usePosts } from "./context/PostContext";

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const { posts } = usePosts();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) {
    return <View style={styles.center}><Text>로딩 중...</Text></View>;
  }
  if (!user) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ alignItems: 'center', marginTop: 80, marginBottom: 30, height: 80 }}>
        <KLP width={80} height={80} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}
        data={posts}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: "#888", textAlign: "center" }}>
            작성된 글이 없습니다.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/post/${item.id}`)}
            style={styles.postBox}
          >
            {/* 글 이미지 미리보기 */}
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.thumb}
                resizeMode="cover"
              />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/post/write')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  postBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: 7,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  postTitle: {
    fontSize: 20, fontWeight: '600', marginBottom: 4, color: "#374151"
  },
  postContent: {
    color: "#888"
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 36,
    backgroundColor: "#3b82f6",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  fabIcon: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: -2,
  },
});
