import { auth } from '@/config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface LoginProps {
    onSwitchToSignUp?: () => void;
}

const Login = ({ onSwitchToSignUp }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-900"
        >
            <View className="flex-1 justify-center px-6">
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-white text-center mb-2">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-400 text-center">
                        Sign in to continue to your Todo app
                    </Text>
                </View>

                <View className="space-y-4">
                    <View className='pb-4'>
                        <Text className="text-gray-300 mb-2 font-medium">Email</Text>
                        <TextInput
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            placeholder="Enter your email"
                            placeholderTextColor="#6B7280"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 mb-2 font-medium">Password</Text>
                        <TextInput
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            placeholder="Enter your password"
                            placeholderTextColor="#6B7280"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <TouchableOpacity
                        className={`bg-blue-600 rounded-lg py-3 mt-6 ${isLoading ? 'opacity-50' : ''}`}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-8">
                    <Text className="text-gray-400 text-center">
                        Don't have an account?{' '}
                        <Text 
                            className="text-blue-400 font-semibold"
                            onPress={onSwitchToSignUp}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default Login;