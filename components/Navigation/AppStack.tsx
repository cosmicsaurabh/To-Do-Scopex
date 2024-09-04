import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeProvider';

import HomePage from '../Pages/HomePage';
import AddToDo from '../Pages/AddToDo';
import ReadToDo from '../Pages/ReadToDo';
import EditToDo from '../Pages/EditToDo';
import DeleteToDo from '../Pages/DeleteToDo';
import ProfilePage from '../Pages/ProfilePage';
import BookmarkPage from '../Pages/BookmarkPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="EditToDo" component={EditToDo} />
    <Stack.Screen name="DeleteToDo" component={DeleteToDo} />
    <Stack.Screen name="AddToDo" component={AddToDo} />
    <Stack.Screen name="ReadToDo" component={ReadToDo} />
  </Stack.Navigator>
);
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile-Stack" component={ProfilePage} />
  </Stack.Navigator>
);
const BookmarkStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Bookmark-Stack" component={BookmarkPage} />
    
  </Stack.Navigator>
);

const AppStack = () => {
  const { theme } = useTheme(); 
  return(
  <Tab.Navigator  
  screenOptions={{ 
    headerShown: false ,
    tabBarHideOnKeyboard: true,
    //  tabBarActiveTintColor: '#fbc02d',
    tabBarActiveTintColor:'#fbc02d',
    tabBarInactiveTintColor: theme.colors.text,
     tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
    },
  }}>
    <Tab.Screen name="To-Do" component={HomeStack} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={size} />
        ),
      }}  />
    <Tab.Screen name="Bookmark" component={BookmarkStack}   options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bookmark-outline" color={color} size={size} />
        ),
      }}  />
    <Tab.Screen name= "Profile" component={ProfileStack}  options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
      }}  /> 
  </Tab.Navigator>
);
}

export default AppStack;
