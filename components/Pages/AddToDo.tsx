import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import { useTodo } from '../../context/TodoProvider';
import { useTheme } from '../../context/ThemeProvider';
function AddToDo() {
  const {   addTodoItem } = useTodo();
  const {theme} = useTheme();
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { onUpdate,inbookmarked } = route.params as { onUpdate: () => void ,inbookmarked: boolean};
  const handleAdd = async () => {
    try {
      if (title.trim().length === 0) {
        setError('Title cannot be empty');
        return;
      }
      setError(''); // Clear previous errors
      await addTodoItem(title,inbookmarked);
      onUpdate(title);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding todo item", error);
      setError('An error occurred while adding the todo item. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Todo Title"
          placeholderTextColor="#999999"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.buttonText}>Add new To-Do</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#232533',
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    marginBottom:50,
  },
  input: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#CDCDE0",
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4CAF50', 
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', // Center-align error message
  },
});

export default AddToDo;
