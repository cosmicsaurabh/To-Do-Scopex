// import AsyncStorage from '@react-native-async-storage/async-storage';
// import UUID from 'react-native-uuid';
// import { useAuth } from './context/AuthProvider';
// type TodoItem = {
//   id: string;
//   title: string;
//   done: boolean;
// };

// const useTodo = () => {
//   const { user } = useAuth();

//   if (!user) {
//     throw new Error('No user is currently logged in');
//   }
//   const getCurrentUserTodos = async (): Promise<TodoItem[]> => {
//     const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
//     const currentUser = users.find(u => u.email === user.email);
//     return currentUser ? currentUser.todos || [] : [];
//   };
//   const saveUserTodos = async (todos: TodoItem[]) => {
//     const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
//     const currentUserIndex = users.findIndex(u => u.email === user.email);

//     if (currentUserIndex !== -1) {
//       users[currentUserIndex].todos = todos;
//       await AsyncStorage.setItem('users', JSON.stringify(users));
//     }
//   };


// export async function getTodoItems(
//   page: 1,
//   limit: 100,
// ): Promise<TodoItem[]> {
//   const todos = await getCurrentUserTodos();
//   return todos.slice(page * limit, (page + 1) * limit) as TodoItem[];
// }

// export async function addTodoItem(title: string) {
//   const todos = await getCurrentUserTodos();
//   console.log("in")
  
//   todos.push({
//     id: UUID.v4(),
//     title,
//     done: false,
//   });

//   await saveUserTodos(todos);
// }

// export async function updateTodoItem(todoItem: TodoItem) {
//   const todos = await getCurrentUserTodos();
  
//   const index = todos.findIndex((item: TodoItem) => item.id === todoItem.id);
//   if (index !== -1) {
//     todos[index] = todoItem;
//     await saveUserTodos(todos);
//   }
// }

// export async function deleteTodoItem(id: string) {
//   const todos = await getCurrentUserTodos();
  
//   const index = todos.findIndex((item: TodoItem) => item.id === id);
//   if (index !== -1) {
//     todos.splice(index, 1);
//     await saveUserTodos(todos);
//   }
// }


//
// DO Not modify this file.
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

export async function getTodoItems(
  page: number,
  limit: number,
): Promise<TodoItem[]> {

  
  // await wait(200);
  //   Throw random error to simulate network error or server error
  // if (Math.random() < 0.2) {
  //   throw new Error('Random error');
  // }
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  return todoItems.slice(page * limit, (page + 1) * limit) as TodoItem[];
}

export async function addTodoItem(title: string) {
  
  // if (title.length < 3) {
  //   throw new Error('Title must be at least 3 characters long');
  // }
  // await wait(1000);
  //   Throw random error to simulate network error or server error
  // if (Math.random() < 0.2) {
  //   throw new Error('Random error');
  // }
  // console.log("added")
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  todoItems.push({
    // id: Math.random().toString(36).substr(2, 9),
    id: UUID.v4(),
    title,
    done: false,
  });
  await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export async function updateTodoItem(todoItem: TodoItem) {
  // await wait(500);
  // //   Throw random error to simulate network error or server error
  // if (Math.random() < 0.2) {
  //   throw new Error('Random error');
  // }
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  const index = todoItems.findIndex(
    (item: TodoItem) => item.id === todoItem.id,
  );
  todoItems[index] = todoItem;
  await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export async function deleteTodoItem(id: string) {
  // await wait(500);
  //   Throw random error to simulate network error or server error
  // if (Math.random() < 0.2) {
  //   throw new Error('Random error');
  // }
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  const index = todoItems.findIndex((item: TodoItem) => item.id === id);
  todoItems.splice(index, 1);
  await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
