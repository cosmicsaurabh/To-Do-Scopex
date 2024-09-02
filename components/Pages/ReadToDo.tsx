import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { updateTodoItem } from '../../helper';
import { useTheme } from '../../context/ThemeProvider';
function ReadToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {theme} = useTheme();

  const { title } = route.params as { title };
const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };
const handleRead=() =>{
    navigation.goBack();
}
  

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

      <View style={styles.description}>
        <ScrollView>
        <Text style = {styles.titlecontainer}>{title}</Text>
        </ScrollView>
      </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.okButton}>
          <Text style={[styles.buttonText,{ color: theme.colors.text }]}>ok</Text>
        </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#232533', // Consistent form background
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    marginBottom:50,
  },

  description: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 12,
  },
  titlecontainer:{
    color: "#CDCDE0",

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
