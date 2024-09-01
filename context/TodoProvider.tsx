import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';
import { useAuth } from './AuthProvider';
type TodoItem = {
    id: string;
    title: string;
    done: boolean;
  };
const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [isChangedSomething, setIsChangedSomething] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const currentUser = storedUsers.find(u => u.email === user.email);
        setTodos(currentUser ? currentUser.todos || [] : []);
      }
    };
    fetchTodos();
  }, [user]);

  const saveTodos = async (updatedTodos) => {
    if (user) {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const currentUserIndex = storedUsers.findIndex(u => u.email === user.email);
      if (currentUserIndex !== -1) {
        storedUsers[currentUserIndex].todos = updatedTodos;
        await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
        setTodos(updatedTodos);
      }
    }
  };


  const bookmarkTodoItem = async (updatedTodo) => {
    const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    await saveTodos(updatedTodos);
    setIsChangedSomething(!isChangedSomething);
};
  const addTodoItem = async (title) => {
    const newTodo = { id: UUID.v4(), title, done: false,bookmarked:false };
    const updatedTodos = [...todos, newTodo];
    await saveTodos(updatedTodos);
    setIsChangedSomething(!isChangedSomething);
};

const updateTodoItem = async (updatedTodo) => {
    const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    await saveTodos(updatedTodos);
    setIsChangedSomething(!isChangedSomething);
};

const deleteTodoItem = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    await saveTodos(updatedTodos);
    setIsChangedSomething(!isChangedSomething);
  };

  return (
    <TodoContext.Provider value={{ isChangedSomething,todos, addTodoItem, updateTodoItem, deleteTodoItem ,bookmarkTodoItem}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);

export default TodoProvider;