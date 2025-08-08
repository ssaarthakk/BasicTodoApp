import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './Login';
import SignUp from './SignUp';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <View className="flex-1">
            {isLogin ? (
                <Login onSwitchToSignUp={() => setIsLogin(false)} />
            ) : (
                <SignUp onSwitchToLogin={() => setIsLogin(true)} />
            )}
        </View>
    );
};

export default AuthScreen;