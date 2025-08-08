import { auth } from '@/config/firebaseConfig';
import { storeUser } from '@/utils/asyncStorage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface LoginProps {
    setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setLoginPage }: LoginProps) => {
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
            const user = await signInWithEmailAndPassword(auth, email, password);
            await storeUser(user);
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
            className="flex-1 bg-gray-50"
        >
            <View className="flex-1 justify-center px-6">
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Sign in to continue to your Todo app
                    </Text>
                </View>

                {/* Form */}
                <View className="space-y-4">
                    {/* Email Input */}
                    <View>
                        <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                            placeholder="Enter your email"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Password Input */}
                    <View>
                        <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                            placeholder="Enter your password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        className={`bg-blue-500 rounded-lg py-3 mt-6 ${isLoading ? 'opacity-50' : ''}`}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <TouchableOpacity className="mt-8" onPress={() => setLoginPage(false)}>
                    <Text className="text-gray-600 text-center">
                        Don't have an account?{' '}
                        <Text className="text-blue-500 font-semibold">Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

export default Login;