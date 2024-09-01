import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { updateTodoItem } from '../../helper';
import { useTodo } from '../../context/TodoProvider';
type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

function EditToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {   updateTodoItem } = useTodo();

  const { item, onUpdate } = route.params as { item: TodoItem, onUpdate: () => void };

  const [title, setTitle] = useState(item.title);

  const handleUpdate = async () => {
    try {
      if (title.trim().length === 0) {
        Alert.alert('Validation Error', 'Title cannot be empty');
        return;
      }
    //   console.log(title);
      await updateTodoItem({ ...item, title });
      onUpdate(title);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating todo item", error);
      Alert.alert('Error', 'An error occurred while updating the todo item');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={title}
          multiline
          onChangeText={setTitle}
          placeholder="Update Todo Title"
          placeholderTextColor="#999999"
          numberOfLines={5}
        />
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Consistent background
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // Consistent form background
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
    multiline:'true',
  },
  updateButton: {
    backgroundColor: '#fbc02d', // Consistent button color
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

export default EditToDo;
