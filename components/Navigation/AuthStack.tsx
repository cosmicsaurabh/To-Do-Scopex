import { StyleSheet } from 'react-native'
import React from 'react'
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        // <AuthProvider>
        <Stack.Navigator >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            
        </Stack.Navigator>
        // </AuthProvider>
    )
  
}
export default AuthStack;

const styles = StyleSheet.create({

})