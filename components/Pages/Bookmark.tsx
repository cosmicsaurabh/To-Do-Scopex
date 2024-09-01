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
// import { getTodoItems } from '../../helper';
import { useTodo } from '../../context/TodoProvider';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  bookmarked:boolean;
};

function Bookmark({ navigation }: any): JSX.Element {
  const {  todos,bookmarkTodoItem,isChangedSomething } = useTodo();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetchTodoItems();
  }, [isChangedSomething]);

  const fetchTodoItems = async () => {
    const items =  todos.filter(that => that.bookmarked);
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
  
  

  const handleEditToDo = async (item: TodoItem) => {
    try {
      const previousTitle = item.title;
      navigation.navigate('EditToDo', { 
        item, 
        onUpdate: (updatedTitle: Todoitem) => {
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
  const handleBookmarkToDo = async(item) =>{
    try{
      let updatedbookmarkstatus = item.bookmarked;
      {item.bookmarked?
      updatedbookmarkstatus = "removed from bookmark"
      :
      updatedbookmarkstatus = "added to bookmark"
      }
      item.bookmarked =! item.bookmarked;
      const newstate = item.bookmarked;
      await bookmarkTodoItem({...item,bookmarked:newstate})
      Toast.show({
        type: 'success',
        text1: 'Todo Bookmarked',
        text2: `${truncateText(item.title, 20)} has been ${updatedbookmarkstatus}`, 
      });
    }catch (error) {
      console.error('Error bookmarking todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error bookmakring the todo item.',
      });
    }
  }


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
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bookmarks</Text>
        </View>
        <View style={styles.sectionContainer}>
          {todoItems.map((item: TodoItem) => (
            <View key={item.id} style={styles.todoItem}>
              <View style={styles.todoContent}>
                <Text style={styles.sectionDescription}>
                  {truncateText(item.title, 40)}
                  
                </Text>
                {/* <Text style={styles.sectionDescription}>{item.id}</Text> */}
              </View>
              <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleBookmarkToDo(item)} style={styles.bookmarkButton}>
                  <Icon name={item.bookmarked?"heart-dislike-circle-outline": "heart-circle-outline"} size={24} color="white" />
                </TouchableOpacity>
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
  bookmarkButton: {
    backgroundColor: '#f774d7',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    elevation: 2,
  },
  
});

export default Bookmark;
