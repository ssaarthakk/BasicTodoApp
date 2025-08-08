import { auth } from '@/config/firebaseConfig';
import { storeUser } from '@/utils/asyncStorage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface SignUpProps {
    onSwitchToLogin?: () => void;
}

const SignUp = ({ onSwitchToLogin }: SignUpProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            return;
        }

        if (password !== confirmPassword) {
            ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
            return;
        }

        if (password.length < 6) {
            ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.SHORT);
            return;
        }

        setIsLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await storeUser(user);
            ToastAndroid.show('Sign Up successful!', ToastAndroid.SHORT);
        } catch (error: any) {
            let errorMessage = 'Sign Up failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email is already in use';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak';
            }
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
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
                        Create Account
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Sign up to get started with your Todo app
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

                    {/* Confirm Password Input */}
                    <View>
                        <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                            placeholder="Confirm your password"
                            placeholderTextColor="#9CA3AF"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        className={`bg-green-500 rounded-lg py-3 mt-6 ${isLoading ? 'opacity-50' : ''}`}
                        onPress={handleSignUp}
                        disabled={isLoading}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="mt-8">
                    <Text className="text-gray-600 text-center">
                        Already have an account?{' '}
                        <Text 
                            className="text-green-500 font-semibold"
                            onPress={onSwitchToLogin}
                        >
                            Sign In
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default SignUp;