import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { updateTodoItem } from '../../helper';
import { useTodo } from '../../context/TodoProvider';
import { useTheme } from '../../context/ThemeProvider';
function EditToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {   updateTodoItem } = useTodo();
  const{theme} = useTheme();

  const { item, onUpdate } = route.params as { item: TodoItem, onUpdate: () => void };
  const [error, setError] = useState('');
  const [title, setTitle] = useState(item.title);

  const handleUpdate = async () => {
    try {
      if (title.trim().length === 0) {
        setError('Content cannot be empty');
        return;
      }
      await updateTodoItem({ ...item, title });
      onUpdate(title);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating todo item", error);
      setError('An error occurred while updating the todo item');
    }
  };
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Update</Text>
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
    elevation:5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#CDCDE0",
    multiline:'true',
  },
  updateButton: {
    backgroundColor: '#fbc02d', 
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

export default EditToDo;
