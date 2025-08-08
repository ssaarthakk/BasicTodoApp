import "./global.css";

import AuthScreen from '@/components/AuthScreen';
import { auth } from "@/config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import 'react-native-reanimated';
import HomeScreen from './index';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-400 mt-4 text-lg">Loading...</Text>
      </View>
    );
  }

  return user ? <HomeScreen /> : <AuthScreen />;
}