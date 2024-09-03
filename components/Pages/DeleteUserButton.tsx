import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import {  Text,StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeProvider';

const DeleteUserButton = ()=>{
    const {deleteuser} = useAuth();
    const {theme} = useTheme();
    const handleDeleteUser = () => {
      Alert.alert(
        'Delete User',
        'This action is Irreversible !!!.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteuser(),
          },
        ],
        { cancelable: false }
      );
      };

    return (
        <TouchableOpacity onPress={handleDeleteUser} style={styles.deleteuserButton}>
          <Icon name="warning-outline" size={24} color={theme.dark? "black" : "white"} />
          <Text style={[styles.deleteuserText ,{ color: theme.colors.text }]}>Delete User !!!</Text>
        </TouchableOpacity>
      );
    };
    

export default DeleteUserButton;


const styles = StyleSheet.create({
    deleteuserButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fbc02d',
      borderRadius: 10,
      borderWidth:2,
      borderStyle:'dashed',
      padding: 10,
      height: '100%', 
      justifyContent: 'center',
    },
    deleteuserText: {
      color: 'white',
      fontSize: 20,
      marginLeft: 10,
    },
  });