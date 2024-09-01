import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../Pages/HomePage';
import EditToDo from '../Pages/EditToDo';
import DeleteToDo from '../Pages/DeleteToDo';
import AddToDo from '../Pages/AddToDo';
import Profile from '../Pages/Profile';
import Bookmark from '../Pages/Bookmark';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="EditToDo" component={EditToDo} />
    <Stack.Screen name="DeleteToDo" component={DeleteToDo} />
    <Stack.Screen name="AddToDo" component={AddToDo} />
  </Stack.Navigator>
);
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);
// const BookmarkStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Bookmark" component={Bookmark} />
//     <Stack.Screen name="EditToDo" component={EditToDo} />
//     <Stack.Screen name="DeleteToDo" component={DeleteToDo} />
//     <Stack.Screen name="AddToDo" component={AddToDo} />
//   </Stack.Navigator>
// );

const AppStack = () => (
  <Tab.Navigator  screenOptions={{ headerShown: false ,
    tabBarHideOnKeyboard: true, tabBarActiveTintColor: '#fbc02d'
  }}>
    <Tab.Screen name="To-Do" component={HomeStack} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={size} />
        ),
      }}  />
    {/* <Tab.Screen name="Bookmark" component={BookmarkStack}   options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bookmark-outline" color={color} size={size} />
        ),
      }}  /> */}
    <Tab.Screen name="Profile" component={ProfileStack}  options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
      }}  /> 
  </Tab.Navigator>
);

export default AppStack;
