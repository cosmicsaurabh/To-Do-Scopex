import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTodo } from '../../context/TodoProvider';
import { useTheme } from '../../context/ThemeProvider';
function DeleteToDo() {
  const navigation = useNavigation();
  const {   deleteTodoItem } = useTodo();
  const{theme}  = useTheme();
  const route = useRoute();
  const { item, onUpdate } = route.params as { item: { id: string}, onUpdate: () => void };

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>

      <View style={styles.container}>
        <Text style={styles.confirmationText}>Are you sure you want to delete this To-Do?</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
            <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
              await deleteTodoItem(item.id);
              onUpdate();
              navigation.goBack();
            }} style={styles.deleteButton}>
            <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Delete</Text>
          </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  
  container: {
    flexGrow: 1,
    // height:200,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#232533',
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  confirmationText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default DeleteToDo;
