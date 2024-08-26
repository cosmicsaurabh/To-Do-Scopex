//
// DO Not modify this file.
//
import AsyncStorage from '@react-native-async-storage/async-storage';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

export async function getTodoItems(
  page: number,
  limit: number,
): Promise<TodoItem[]> {
  await wait(200);
  //   Throw random error to simulate network error or server error
  if (Math.random() < 0.2) {
    throw new Error('Random error');
  }
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  return todoItems.slice(page * limit, (page + 1) * limit) as TodoItem[];
}

export async function addTodoItem(title: string) {
  if (title.length < 3) {
    throw new Error('Title must be at least 3 characters long');
  }
  await wait(1000);
  //   Throw random error to simulate network error or server error
  if (Math.random() < 0.2) {
    throw new Error('Random error');
  }
  const todoItems = JSON.parse(
    (await AsyncStorage.getItem('todoItems')) || '[]',
  );
  todoItems.push({
    id: Math.random().toString(36).substr(2, 9),
    title,
    done: false,
  });
  await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export async function updateTodoItem(todoItem: TodoItem) {
  await wait(500);
  //   Throw random error to simulate network error or server error
  if (Math.random() < 0.2) {
    throw new Error('Random error');
  }
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
  await wait(500);
  //   Throw random error to simulate network error or server error
  if (Math.random() < 0.2) {
    throw new Error('Random error');
  }
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
