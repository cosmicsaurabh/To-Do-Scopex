import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';

const LogoutButton = () => {
  const { logout } = useAuth();
  const {theme} = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Icon name="log-out-outline" size={24} color={theme.dark? "black" : "white"} />
      {/* <Text style={styles.logoutText}>L</Text> */}
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5733',
    borderRadius: 10,
    padding: 10,
    // Ensure proper height
    height: '100%', // Makes sure it takes the full height of the header
    justifyContent: 'center',
    borderWidth:1,
    borderStyle:'dashed',
    borderColor: "black",
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
