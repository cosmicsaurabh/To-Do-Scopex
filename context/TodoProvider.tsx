import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';
import {useAuth} from './AuthProvider';
import Toast from 'react-native-toast-message';

const TodoContext = createContext();

const TodoProvider = ({children}) => {
  const {user,isLoggedIn} = useAuth();
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [allTodos, setAllTodos] = useState([]);
  const [error, setError] = useState(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    
    if (isLoggedIn && user) {
      fetchInitialTodos();
    } else {
      setTodos([]);
      setPage(1);
      setAllTodos([]);
      setError(null);
    }
  }, [user,isLoggedIn]);
  const showToast = message => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: message,
    });
  };
  const fetchInitialTodos = async () => {
    await wait(200); // Simulate network delay
    if (Math.random() < 0.2) {
      const randomError = 'Random error occurred during initial fetch';
      console.error(randomError);
      showToast(randomError);
      return;
    }
    
      try {
        const storedUsers = JSON.parse(await AsyncStorage.getItem('users'));
        const currentUser = storedUsers?.find(u => u.user_id === user.user_id);
        const userTodos =  currentUser?.user_todos || todos;
        setAllTodos(userTodos);
        setTodos(userTodos.slice(0, ITEMS_PER_PAGE));
        setPage(1);
        console.log("all users ", storedUsers)
        console.log("current users ", currentUser)
        console.log("userTodds ", userTodos)
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos. Please try again.');
        showToast('Failed to load todos. Please try again.');
      }
    
  };

  const loadMoreTodos = async() => {
    await wait(200); // Simulate network delay
    if (Math.random() < 0.001) {
      const randomError = 'Random error occurred during loadmore ';
      console.error(randomError);
      showToast(randomError);
      return;
    }
    try {
      const newPage = page + 1;
      const newTodos = allTodos.slice(0, newPage * ITEMS_PER_PAGE);
      if (newTodos.length >= allTodos.length) {
        setTodos(newTodos);
        return { hasMore:false };
      }
      setTodos(prevTodos => [
        ...prevTodos,
        ...newTodos.slice(prevTodos.length),
      ]);
      setPage(newPage);
      return { hasMore:true };
    } catch (err) {
      console.error('Error loading more todos:', err);
      setError('Failed to load more todos. Please try again.');
      showToast('Failed to load more todos. Please try again.');
      return { hasMore:false };
    }
  };

  const saveTodos = async (updatedTodos) => {
    if (user) {
      try {
        const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) ;
        const currentUserIndex = storedUsers.findIndex(
          u => u.user_id === user.user_id);
        if (currentUserIndex !== -1) {
          storedUsers[currentUserIndex].user_todos = updatedTodos;
          await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
          setAllTodos(updatedTodos);
          setTodos(updatedTodos.slice(0, page * ITEMS_PER_PAGE));
        }
      } catch (err) {
        console.error('Error saving todos:', err);
        setError('Failed to save todos. Please try again.');
        showToast('Failed to save todos. Please try again.');
      }
    }
  };

  const bookmarkTodoItem = async (updatedTodo) => {
    try {
      const updatedTodos = allTodos.map(todo =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo,
      );
      await saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error bookmarking todo:', err);
      setError('Failed to bookmark todo. Please try again.');
      showToast('Failed to bookmark todo. Please try again.');
    }
  };

  const addTodoItem = async (title, bookmarked) => {
    if (title.length < 3) {
      throw new Error('Title must be at least 3 characters long');
    }
    await wait(200); // Simulate network delay
    if (Math.random() < 0.2) {
      const randomError = 'Random error occurred during add To-Do';
      console.error(randomError);
      showToast(randomError);
      return;
    }
    try {
      const newTodo = {
        todo_id: UUID.v4(),
        title:title, 
        done: false,
        bookmarked:bookmarked,
      };
      console.log("alltodos ",allTodos)
      console.log("newtodo ",newTodo)
      const updatedTodos = [...allTodos, newTodo];
      console.log("ipdated todo " ,updatedTodos)
      await saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
      showToast('Failed to add todo. Please try again.');
    }
  };

  const updateTodoItem = async updatedTodo => {
    await wait(200); // Simulate network delay
    if (Math.random() < 0.2) {
      const randomError = 'Random error occurred during updating To-Do';
      console.error(randomError);
      showToast(randomError);
      return;
    }
    try {
      const updatedTodos = allTodos.map(todo =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo,
      );
      await saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
      showToast('Failed to update todo. Please try again.');
    }
  };

  const deleteTodoItem = async todo_id => {
    await wait(200); // Simulate network delay
    if (Math.random() < 0.2) {
      const randomError = 'Random error occurred during Deleting To-Do';
      console.error(randomError);
      showToast(randomError);
      return;
    }
    try {
      const updatedTodos = allTodos.filter(todo => todo.todo_id !== todo_id);
      await saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
      showToast('Failed to delete todo. Please try again.');
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loadMoreTodos,
        addTodoItem,
        updateTodoItem,
        deleteTodoItem,
        bookmarkTodoItem,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const useTodo = () => useContext(TodoContext);

export default TodoProvider;
