import { deleteTodo, toggleTodoComplete, updateTodo } from '@/utils/todoCrud';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckMark from './svg/CheckMark';
import Edit from './svg/Edit';
import Delete from './svg/Delete';

interface TodoProps {
  id: string;
  title: string;
  completed?: boolean;
}

export default function Todo({ id, title, completed = false }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      await toggleTodoComplete(id, completed);
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
    <View className="flex-row items-center p-4 bg-gray-800 rounded-lg shadow-sm mb-2 mx-4 border border-gray-700">
      <TouchableOpacity
        onPress={handleComplete}
        disabled={isLoading}
        className="mr-3"
      >
        <View className={`w-6 h-6 rounded border-2 ${
          completed 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-400 bg-transparent'
        } ${isLoading ? 'opacity-50' : ''} flex items-center justify-center`}>
          {completed && (
            <CheckMark width={12} height={12} />
          )}
        </View>
      </TouchableOpacity>

      {/* Todo Content */}
      <View className="flex-1">
        {isEditing ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            className="border border-gray-600 bg-gray-700 text-white rounded px-3 py-2"
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
        ) : (
          <Text 
            className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-white'}`}
          >
            {title}
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row ml-3 space-x-2 gap-2">
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
              className="bg-gray-600 px-3 py-2 rounded"
            >
              <Text className="text-white font-medium">Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Edit Button */}
            <TouchableOpacity
              onPress={handleEdit}
              disabled={isLoading}
              className={`bg-blue-500 px-3 py-2 rounded ${isLoading ? 'opacity-50' : ''}`}
            >
              <Edit width={16} height={16} />
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={handleDelete}
              disabled={isLoading}
              className={`bg-red-500 px-3 py-2 rounded ${isLoading ? 'opacity-50' : ''}`}
            >
              <Delete width={16} height={16} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
