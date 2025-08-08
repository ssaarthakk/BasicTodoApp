import "./global.css";

import AuthScreen from '@/components/AuthScreen';
import { auth } from "@/config/firebaseConfig";
import { getUser, storeUser } from "@/utils/asyncStorage";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import 'react-native-reanimated';
import HomeScreen from './index';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {

    const checkStoredUser = async () => {
      try {
        const storedUser = await getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error reading stored user:", error);
      }
    };

    checkStoredUser();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          await storeUser(authUser);
          setUser(authUser);
        } catch (error) {
          console.error("Error storing user:", error);
        }
      } else {
        try {
          await storeUser(null);
          setUser(null);
        } catch (error) {
          console.error("Error clearing stored user:", error);
        }
      }
      
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4 text-lg">Loading...</Text>
      </View>
    );
  }

  return user ? <HomeScreen /> : <AuthScreen />;
}