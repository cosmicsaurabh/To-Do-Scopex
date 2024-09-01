import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
// import { addTodoItem } from '../../helper';
import { useTodo } from '../../context/TodoProvider';
function AddToDo() {
  const {   addTodoItem } = useTodo();

  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = useState('');
  const { onUpdate } = route.params as { onUpdate: () => void };
  const handleAdd = async () => {
    try {
      if (title.trim().length === 0) {
        Alert.alert('Validation Error', 'Title cannot be empty');
        return;
      }
      await addTodoItem(title);
      onUpdate(title);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding todo item", error);
      Alert.alert('Error', 'An error occurred while adding the todo item');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Todo Title"
          placeholderTextColor="#999999"
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.buttonText}>Add new to-do</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  input: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: '#f4f4f4',
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green color for Add button
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
    
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default AddToDo;
