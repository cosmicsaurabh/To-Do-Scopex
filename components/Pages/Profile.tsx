import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import LogoutButton from './LogoutButton';
import { useAuth } from '../../context/AuthProvider';
import DeleteUserButton from './DeleteUserButton';

export default function Profile() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tabTitle}>Profile</Text>
        <LogoutButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{user.username}</Text>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{user.phone}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>

      </ScrollView>
        <View style={styles.fab}>
      <DeleteUserButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  tabTitle: {
    fontSize: 18, // Adjusted font size
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    paddingTop: 50, // Adjust this based on the height of the header
    paddingHorizontal: 20,
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
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 10,
    borderRadius: 30,
    
    justifyContent: 'center',
    alignItems: 'center',
    elevation:2,
    
  },
  
});
