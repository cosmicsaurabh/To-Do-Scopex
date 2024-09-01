import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import {  Text,StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {  useRoute } from '@react-navigation/native';

const DeleteUserButton = ()=>{
    // const route = useRoute();
    const {deleteuser} = useAuth();
    // const { user } = route.params as { user: { email: string} };
    const handleDeleteUser = () => {
        deleteuser();
      };

    return (
        <TouchableOpacity onPress={handleDeleteUser} style={styles.deleteuserButton}>
          <Icon name="warning-outline" size={24} color="white" />
          <Text style={styles.deleteuserText}>Delete User !!!</Text>
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
      // Ensure proper height
      height: '100%', 
      justifyContent: 'center',
    },
    deleteuserText: {
      color: 'white',
      fontSize: 20,
      marginLeft: 10,
    },
  });