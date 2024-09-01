import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import LogoutButton from './LogoutButton';
import { useAuth } from '../../context/AuthProvider';

export default function Profile() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) return ;

  return (
    <View style={styles.container}>
      <LogoutButton />
      <ScrollView>
        
      <View style={styles.userInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.info}>{user.username}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
        
        
      </View>
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  userInfo: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
