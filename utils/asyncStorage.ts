import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user: any) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.error("Error storing user data: ", e);
    throw new Error("Failed to store user data.");
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading user data: ", e);
    throw new Error("Failed to read user data.");
  }
};