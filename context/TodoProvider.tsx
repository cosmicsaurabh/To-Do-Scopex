import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';
import { useAuth } from './AuthProvider';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [allTodos, setAllTodos] = useState([]);
  // const [isChangedSomething,setIsChangedSomething] =useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchInitialTodos();
  }, [user]);

  const fetchInitialTodos = async () => {
    if (user) {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const currentUser = storedUsers.find(u => u.email === user.email);
      const userTodos = currentUser ? currentUser.todos || [] : [];
      setAllTodos(userTodos);
      setTodos(userTodos.slice(0, ITEMS_PER_PAGE));
      setPage(1);  
    }
  };

  const loadMoreTodos = () => {
    const newPage = page + 1;
    const newTodos = allTodos.slice(0, newPage * ITEMS_PER_PAGE);
    setTodos(prevTodos => [...prevTodos, ...newTodos.slice(prevTodos.length)]);
    setPage(newPage);
  };

  const saveTodos = async (updatedTodos) => {
    if (user) {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const currentUserIndex = storedUsers.findIndex(u => u.email === user.email);
      if (currentUserIndex !== -1) {
        storedUsers[currentUserIndex].todos = updatedTodos;
        await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
        setAllTodos(updatedTodos);
        setTodos(updatedTodos.slice(0, page * ITEMS_PER_PAGE));
      }
    }
  };

  const bookmarkTodoItem = async (updatedTodo) => {
    const updatedTodos = allTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    await saveTodos(updatedTodos);
    // setIsChangedSomething(!isChangedSomething);
  };
  
  const addTodoItem = async (title,bookmarked) => {
   // console.log("insinde tofo provifer", title,bookmarked);
    const newTodo = { id: UUID.v4(), title, done: false, bookmarked };
    //console.log("insinde tofo provifer",newTodo);
    const updatedTodos = [...allTodos, newTodo];
    //console.log("insinde tofo provifer",updatedTodos);
    await saveTodos(updatedTodos);
    // setIsChangedSomething(!isChangedSomething);
  };
  
  const updateTodoItem = async (updatedTodo) => {
    const updatedTodos = allTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    await saveTodos(updatedTodos);
    // setIsChangedSomething(!isChangedSomething);
  };
  
  const deleteTodoItem = async (id) => {
    const updatedTodos = allTodos.filter(todo => todo.id !== id);
    await saveTodos(updatedTodos);
    // setIsChangedSomething(!isChangedSomething);
  };

  return (
    <TodoContext.Provider value={{ todos, loadMoreTodos, addTodoItem, updateTodoItem, deleteTodoItem, bookmarkTodoItem}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);

export default TodoProvider;

