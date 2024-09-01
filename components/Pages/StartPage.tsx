import { useEffect,useState } from "react";
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    useColorScheme,
  } from 'react-native';
  import {Colors} from 'react-native/Libraries/NewAppScreen';
  import {addTodoItem, getTodoItems} from '../../helper';
  import LogoutButton from "./LogoutButton";

  type TodoItem = {
    id: string;
    title: string;
    done: boolean;
  };

function StartPage(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = useState('');

  useEffect(() => {
    getTodoItems(0, 100).then(items => setTodoItems(items));
  }, []);
    return(
        <SafeAreaView>
            <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
          <LogoutButton/>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TODO</Text>
        </View>
        <View style={styles.sectionContainer}>
          {todoItems.map((item: any) => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.sectionDescription}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            style={styles.sectionDescription}
            placeholder="Add your todo item"
            onChange={e => setNewTodoItem(e.nativeEvent.text)}
          />
          <Button
            title="Add"
            onPress={() => {
              addTodoItem(newTodoItem).then(() => {
                getTodoItems(0, 100).then(items => {
                  setTodoItems(items);
                });
              });
            }}
          />
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
    highlight: {
      fontWeight: '700',
    },
    todoItem: {
      fontSize: 18,
      fontWeight: '400',
      borderBottomWidth: 1,
      padding: 8,
      borderBottomColor: 'gray',
    },
  });
  
  export default StartPage;