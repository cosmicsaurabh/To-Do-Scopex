import React from 'react';
import { Text, StyleSheet, View,TouchableOpacity } from 'react-native';
import { useAuth } from "../../context/AuthProvider"
const LogoutButton = () =>{
    const {logout} = useAuth();
    const handleLogout = () => {
      console.log("click logout");
      logout(); 

    };
    return (
    <View style={styles.container}>
        <TouchableOpacity  title = "dg" onPress={handleLogout} style={styles.logoutbutton}>
          <Text style={styles.buttontext}>Log out</Text>
        </TouchableOpacity>
    </View>
    );
};
export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  logoutbutton:{
    elevation: 8,
    backgroundColor: "#FF5733",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttontext:{
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});