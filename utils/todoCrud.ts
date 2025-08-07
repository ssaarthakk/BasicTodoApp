import { db } from '@/config/firebaseConfig';
import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    getDocs,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import { z } from 'zod';

const TodoSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    completed: z.boolean(),
    createdAt: z.any(),
});

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Timestamp;
};

const todosCollectionRef = collection(db, 'todos');

export const addTodo = async (title: string): Promise<string> => {
    try {
        const newTodo = {
            title: title,
            completed: false,
            createdAt: serverTimestamp()
        };

        TodoSchema.parse(newTodo);

        const docRef = await addDoc(todosCollectionRef, newTodo);
        console.log("Todo added successfully with ID: ", docRef.id);
        return docRef.id;

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation failed: ", error.message);
            throw new Error(`Validation error: ${error.message}`);
        } else {
            console.error("Error adding todo: ", error);
            throw new Error("Failed to add todo.");
        }
    }
};

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const q = query(todosCollectionRef, orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);

        const todos: Todo[] = [];
        querySnapshot.forEach((doc) => {
            todos.push({
                id: doc.id,
                title: doc.data().title,
                completed: doc.data().completed,
                createdAt: doc.data().createdAt,
            });
        });

        console.log("Todos fetched successfully.");
        return todos;
    } catch (error) {
        console.error("Error fetching todos: ", error);
        throw new Error("Failed to fetch todos.");
    }
};

export const toggleTodoComplete = async (id: string, currentStatus: boolean) => {
  try {
    const todoDocRef = doc(db, 'todos', id);
    
    await updateDoc(todoDocRef, {
      completed: !currentStatus
    });
    
    console.log(`Todo with ID ${id} updated successfully.`);
  } catch (error) {
    console.error("Error updating todo: ", error);
    throw new Error("Failed to update todo.");
  }
};

export const deleteTodo = async (id: string) => {
    try {
        const todoDocRef = doc(db, 'todos', id);
        await deleteDoc(todoDocRef);
        console.log(`Todo with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting todo: ", error);
        throw new Error("Failed to delete todo.");
    }
};

export const updateTodo = async (id: string, title: string) => {
    try {
        const todoDocRef = doc(db, 'todos', id);

        await updateDoc(todoDocRef, {
            title: title
        });

        console.log(`Todo with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating todo: ", error);
        throw new Error("Failed to update todo.");
    }
}