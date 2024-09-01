import React  from 'react'
import HomePage from '../Pages/HomePage';
import EditToDo from '../Pages/EditToDo';
import DeleteToDo from '../Pages/DeleteToDo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddToDo from '../Pages/AddToDo';


const Stack = createNativeStackNavigator();
const AppStack = () => {

 
    return (
        <Stack.Navigator initialRouteName="HomePage"  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="HomePage" component={HomePage}  screenOptions={{
    headerShown: false
  }}/>
            <Stack.Screen name="EditToDo" component={EditToDo} />
            <Stack.Screen name="DeleteToDo" component={DeleteToDo} />
            <Stack.Screen name="AddToDo" component={AddToDo} />
        </Stack.Navigator>
    )
  
}
export default AppStack;
