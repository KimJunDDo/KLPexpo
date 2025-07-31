import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KLP from './assets/svgs/KLP_SVG.svg';
import { useAuth } from './context/AuthContext';
import { auth, createUserWithEmailAndPassword } from './firebase';

export default function SignupScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      Alert.alert('회원가입 성공!');
      router.replace('/login');
    } catch (e) {
      Alert.alert('에러', e.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, backgroundColor: '#f8fafc' }}>
      <View style={{ marginBottom: 32, alignItems: 'center', height: 100 }}>
      <KLP width={80} height={80} />
      </View>
      <Text style={{ fontSize: 30, fontWeight: '700', color: '#374151', marginBottom: 28 }}>회원가입</Text>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={{
          width: '100%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12,
          marginBottom: 14, padding: 12, fontSize: 16, backgroundColor: '#fff'
        }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={{
          width: '100%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12,
          marginBottom: 20, padding: 12, fontSize: 16, backgroundColor: '#fff'
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#3b82f6', borderRadius: 12, width: '100%', padding: 16, alignItems: 'center'
        }}
        onPress={handleSignup}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>회원가입</Text>
      </TouchableOpacity>
      {/* 로그인 이동 버튼 */}
      <TouchableOpacity
        style={{ marginTop: 18 }}
        onPress={() => router.replace('/login')}
      >
        <Text style={{ color: '#2563eb', fontSize: 16 }}>이미 계정이 있으신가요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}
