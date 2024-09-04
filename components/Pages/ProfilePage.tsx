import { View,Image, Text, StyleSheet, ScrollView,SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import LogoutButton from './LogoutButton';
import { useAuth } from '../../context/AuthProvider';
import DeleteUserButton from './DeleteUserButton';
import ToggleSwitch from 'toggle-switch-react-native';
import { useTheme } from '../../context/ThemeProvider';
import GlobalStyle from '../others/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  if (!isLoggedIn || !user) return null;
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const showsuccessToast = (message) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: message,
    });
    
  };
  const hanldetoggleTheme = () =>{
    toggleTheme();
    if(isDarkTheme){
      
      showsuccessToast("It's 🌤️ Now take care !");
    }
    else{
      
      showsuccessToast("It's 🌌 Now Beware !");
    }
  }

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
      <View style={styles.header}>
        <Text style={[styles.tabTitle,GlobalStyle.CustomFont, { color: theme.colors.text }]}>Profile</Text>
        <LogoutButton />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.themeToggle}>
        <Icon
              name={isDarkTheme ? 'sunny' : 'moon'}
              size={40}
              color={theme.colors.text}
              style={styles.themeIcon}
            />
          
          <ToggleSwitch
            isOn={isDarkTheme}
            offColor="#4E4E50"
            onColor="#E5E5E5"
            labelStyle={{ color: theme.colors.text, fontWeight: '600' }}
            size="large"
            onToggle={hanldetoggleTheme}
            />
            </View>
        <View style={styles.userInfo}>
          <Text style={[styles.label,GlobalStyle.CustomFont, { color: theme.colors.text }]}>Username:</Text>
          <Text style={[styles.info,GlobalStyle.CustomFont, { color: theme.colors.text }]}>{user.username}</Text>
          <Text style={[styles.label,GlobalStyle.CustomFont, { color: theme.colors.text }]}>Phone:</Text>
          <Text style={[styles.info,GlobalStyle.CustomFont, { color: theme.colors.text }]}>{user.phone}</Text>
          <Text style={[styles.label,GlobalStyle.CustomFont, { color: theme.colors.text }]}>Email:</Text>
          <Text style={[styles.info,GlobalStyle.CustomFont, { color: theme.colors.text }]}>{user.email}</Text>
          <Image style={{height:100,width:100}} 
        source = {{uri:user.profilePic}} />
        </View>

      </ScrollView>
        <View style={styles.fab}>
         <DeleteUserButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flexGrow: 1,
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
    backgroundColor: '#fbc02d',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  userInfo: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  themeIcon: {
    marginRight: 10,
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});
