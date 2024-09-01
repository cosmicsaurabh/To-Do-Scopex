import React  from 'react'
import StartPage from '../Pages/StartPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AppStack = () => {

 
    return (
        <Stack.Navigator >
            <Stack.Screen name="StartPage" component={StartPage} />
        </Stack.Navigator>
    )
  
}
export default AppStack;
