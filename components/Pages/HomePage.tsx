import React, { useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTodo} from '../../context/TodoProvider';
import ToggleSwitch from 'toggle-switch-react-native';
type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  bookmarked: boolean;
};

function HomePage({navigation}: any): JSX.Element {
  const {todos, bookmarkTodoItem, loadMoreTodos} =
    useTodo();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const handleDeleteToDo = async item => {
    try {
      navigation.navigate('DeleteToDo', {
        item,
        onUpdate: () => {
          Toast.show({
            type: 'success',
            text1: 'Todo Deleted',
            text2: `${truncateText(item.title, 20)} has been deleted.`,
          });
        },
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
        onUpdate: (newlyaddedtitle: newtitle) => {
          Toast.show({
            type: 'success',
            text1: 'Todo Added',
            text2: `${truncateText(newlyaddedtitle, 20)} has been added.`,
          });
        },
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

  const handleEditToDo = async item => {
    try {
      const previousTitle = item.title;
      navigation.navigate('EditToDo', {
        item,
        onUpdate: (updatedTitle: Todoitem) => {
          Toast.show({
            type: 'success',
            text1: 'Todo Updated',
            text2: `${truncateText(
              previousTitle,
              20,
            )} has been updated to ${truncateText(updatedTitle, 20)}.`,
          });
        },
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
  const handleReadToDo = async title => {
    try {
      navigation.navigate('ReadToDo', {
        title,
      });
    } catch (error) {
      console.error('Error reading todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error reading the todo item.',
      });
    }
  };
  const handleBookmarkToDo = async item => {
    try {
      let updatedbookmarkstatus = item.bookmarked;
      {
        item.bookmarked
          ? (updatedbookmarkstatus = 'removed from bookmark')
          : (updatedbookmarkstatus = 'added to bookmark');
      }
      item.bookmarked = !item.bookmarked;
      const newstate = item.bookmarked;
      await bookmarkTodoItem({...item, bookmarked: newstate});
      Toast.show({
        type: 'success',
        text1: 'Todo Bookmarked',
        text2: `${truncateText(
          item.title,
          20,
        )} has been ${updatedbookmarkstatus}`,
      });
    } catch (error) {
      console.error('Error bookmarking todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error bookmakring the todo item.',
      });
    }
  };
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const s = await loadMoreTodos();
    console.log(s);
    setLoading(false);
  };

  const renderTodoItem = ({item}) => (
    <TouchableOpacity key={item.id} onPress={() => handleReadToDo(item.title)}>
      <View style={styles.todoItem}>
        <View style={styles.todoContent}>
          <Text style={styles.sectionDescription}>
            {truncateText(item.title, 40)}
          </Text>
          <Text style={styles.sectionDescription}>
            {item.bookmarked ? 'true' : 'false'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleBookmarkToDo(item)}
            style={styles.bookmarkButton}>
            <Icon
              name={
                item.bookmarked
                  ? 'heart-dislike-circle-outline'
                  : 'heart-circle-outline'
              }
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteToDo(item)}
            style={styles.deleteButton}>
            <Icon name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEditToDo(item)}
            style={styles.editButton}>
            <Icon name="create-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={styles.tabTitle}>Home</Text>
      </View>
      <View style={styles.sectionContainer}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={item => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <Text style={styles.loadingText}>Loading...</Text> : null
          }
        />
      </View>

      <View style={styles.fab}>
        <TouchableOpacity onPress={handleAddToDo}>
          <Icon name="add-outline" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
  safearea: {
    flexGrow: 1,
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
  loadingText: {
    textAlign: 'center',
    padding: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  tabTitle: {
    fontSize: 18, // Adjusted font size
    fontWeight: '600',
    color: '#333',
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
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 10,
    backgroundColor: '#fbc02e',
    borderRadius: 28,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 18,
  },
});

export default HomePage;
