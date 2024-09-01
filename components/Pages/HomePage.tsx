import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Alert,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getTodoItems } from '../../helper';
import LogoutButton from "./LogoutButton";
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

function HomePage({ navigation }: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [somethingUpdated, setSomethingUpdated] = useState(true);

  useEffect(() => {
    fetchTodoItems();
  }, [somethingUpdated]);

  const fetchTodoItems = async () => {
    const items = await getTodoItems(0, 100);
    setTodoItems(items);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleDeleteToDo = async (item: TodoItem) => {
    try {
      navigation.navigate('DeleteToDo', { 
        item, 
        onUpdate: () => {
          setSomethingUpdated(prev => !prev);
          Toast.show({
            type: 'success',
            text1: 'Todo Deleted',
            text2: `${truncateText(item.title, 20)} has been deleted.`, 
          });
        }
      });
    } catch (error) {
      console.error('Error deleting todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error deleting the todo item.',
      });
    }
  };
  
  const handleAddToDo = async () => {
    try {
      navigation.navigate('AddToDo', { 
        onUpdate: (newlyaddedtitle:newtitle) => {
          setSomethingUpdated(prev => !prev);
          Toast.show({
            type: 'success',
            text1: 'Todo Added',
            text2: `${truncateText(newlyaddedtitle, 20)} has been added.`, 
          });
        }
      });
    } catch (error) {
      console.error('Error add todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error adding the todo item.',
      });
    }
  };

  const handleEditToDo = async (item: TodoItem) => {
    try {
      const previousTitle = item.title;
      navigation.navigate('EditToDo', { 
        item, 
        onUpdate: (updatedTitle: Todoitem) => {
          setSomethingUpdated(prev => !prev);
          Toast.show({
            type: 'success',
            text1: 'Todo Updated',
            text2: `${truncateText(previousTitle, 20)} has been updated to ${truncateText(updatedTitle, 20)}.`, 
          });
        }
      });
    } catch (error) {
      console.error('Error updating todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error updating the todo item.',
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <LogoutButton />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TODO</Text>
        </View>
        <View style={styles.sectionContainer}>
          {todoItems.map((item: TodoItem) => (
            <View key={item.id} style={styles.todoItem}>
              <View style={styles.todoContent}>
                <Text style={styles.sectionDescription}>
                  {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                </Text>
                {/* <Text style={styles.sectionDescription}>{item.id}</Text> */}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleDeleteToDo(item)} style={styles.deleteButton}>
                  <Icon name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditToDo(item)} style={styles.editButton}>
                  <Icon name="create-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddToDo}
      >
        <Icon name="add-circle-outline" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoContent: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  editButton: {
    backgroundColor: 'green',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fbc02e',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
