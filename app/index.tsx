import Todo from '@/components/Todo';
import { db } from '@/config/firebaseConfig';
import { Todo as TodoType } from '@/utils/todoCrud';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function HomeScreen() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-2xl font-bold text-center">
          My Todo List
        </Text>
        <Text className="text-blue-100 text-center mt-1">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </Text>
      </View>

      <View className="flex-1 pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="text-gray-600 mt-4">Loading todos...</Text>
          </View>
        ) : todos.length === 0 ? (
          <View className="flex-1 justify-center items-center px-8">
            <Text className="text-gray-500 text-lg text-center">
              No todos yet!
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Add your first todo to get started
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