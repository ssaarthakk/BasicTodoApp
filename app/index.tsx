import Todo from '@/components/Todo';
import { auth, db } from '@/config/firebaseConfig';
import { addTodo, Todo as TodoType } from '@/utils/todoCrud';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
        createdAt: doc.data().createdAt
      }));
      setTodos(todoList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching todos:", error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const renderTodo = ({ item }: { item: TodoType }) => (
    <Todo
      id={item.id}
      title={item.title}
      completed={item.completed}
    />
  );

  const handleAddTodo = async () => {
    if (newTodoTitle.trim().length < 5) {
      Alert.alert('Error', 'Todo title must be at least 5 characters long.');
      return;
    }

    try {
      setIsAdding(true);
      await addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    } finally {
      setIsAdding(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error logging out', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="bg-gray-800 p-6 px-4 border-b border-gray-700">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-4xl font-bold flex-1 text-center">
            My Todo List
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View className="bg-gray-800 px-4 py-4 border-b border-gray-700">
        <View className="flex-row space-x-3 gap-3">
          <TextInput
            value={newTodoTitle}
            onChangeText={setNewTodoTitle}
            placeholder="Add a new todo (min 5 characters)..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600"
            onSubmitEditing={handleAddTodo}
            editable={!isAdding}
          />
          <TouchableOpacity
            onPress={handleAddTodo}
            disabled={isAdding || newTodoTitle.trim().length < 5}
            className={`px-6 py-3 rounded-lg ${
              isAdding || newTodoTitle.trim().length < 5
                ? 'bg-gray-600'
                : 'bg-blue-600'
            }`}
          >
            <Text className={`font-medium ${
              isAdding || newTodoTitle.trim().length < 5
                ? 'text-gray-400'
                : 'text-white'
            }`}>
              {isAdding ? 'Adding...' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-400 mt-4">Loading todos...</Text>
          </View>
        ) : todos.length === 0 ? (
          <View className="flex-1 justify-center items-center px-8">
            <Text className="text-gray-400 text-lg text-center">
              No todos yet!
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Add your first todo above to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}