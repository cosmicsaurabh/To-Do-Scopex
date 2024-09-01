import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="log-out-outline" size={24} color="white" />
        {/* <Text style={styles.logoutText}>Logout</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5733',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
