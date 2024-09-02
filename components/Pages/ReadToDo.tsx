import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { updateTodoItem } from '../../helper';
import { useTodo } from '../../context/TodoProvider';

function ReadToDo() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title } = route.params as { title };

const handleRead=() =>{
    navigation.goBack();
}
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

      <View style={styles.description}>
        <ScrollView>
        <Text>{title}</Text>
        </ScrollView>
      </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.okButton}>
          <Text style={styles.buttonText}>ok</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
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
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff', // Consistent form background
    borderRadius: 10,
    elevation: 5,
    marginVertical: 12,
  },
  
  okButton: {
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

export default ReadToDo;
