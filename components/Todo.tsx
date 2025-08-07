import { deleteTodo, toggleTodoComplete, updateTodo } from '@/utils/todoCrud';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TodoProps {
  id: string;
  title: string;
  completed?: boolean;
  onUpdate?: () => void;
}

export default function Todo({ id, title, completed = false, onUpdate }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      await toggleTodoComplete(id, completed);
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteTodo(id);
              onUpdate?.();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSaveEdit = async () => {
    if (editedTitle.trim().length < 5) {
      Alert.alert('Error', 'Title must be at least 5 characters long.');
      return;
    }

    try {
      setIsLoading(true);
      await updateTodo(id, editedTitle.trim());
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  return (
    <View className="flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-2 mx-4">
      <View className="flex-1">
        {isEditing ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            className="border border-gray-300 rounded px-3 py-2 text-gray-800"
            autoFocus
          />
        ) : (
          <Text 
            className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
          >
            {title}
          </Text>
        )}
      </View>

      <View className="flex-row ml-3 space-x-2">
        {isEditing ? (
          <>
            <TouchableOpacity
              onPress={handleSaveEdit}
              disabled={isLoading}
              className="bg-green-500 px-3 py-2 rounded"
            >
              <Text className="text-white font-medium">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelEdit}
              disabled={isLoading}
              className="bg-gray-500 px-3 py-2 rounded"
            >
              <Text className="text-white font-medium">Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleComplete}
              disabled={isLoading}
              className={`px-3 py-2 rounded ${
                completed ? 'bg-orange-500' : 'bg-green-500'
              } ${isLoading ? 'opacity-50' : ''}`}
            >
              <Text className="text-white font-medium text-sm">
                {completed ? 'Undo' : 'Complete'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEdit}
              disabled={isLoading}
              className={`bg-blue-500 px-3 py-2 rounded ${isLoading ? 'opacity-50' : ''}`}
            >
              <Text className="text-white font-medium text-sm">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              disabled={isLoading}
              className={`bg-red-500 px-3 py-2 rounded ${isLoading ? 'opacity-50' : ''}`}
            >
              <Text className="text-white font-medium text-sm">Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
