import React from 'react';
import { View, Image,StyleSheet,ActivityIndicator,Dimensions,StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const SplashScreen = () => (

  <View style={styles.splashcontainer}>
    <StatusBar hidden={true} />
    <Image style={styles.image} source={require('../assets/images/launch_screen.png')} />
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  </View>
);

const styles = StyleSheet.create({
    splashcontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e3ac43',
    },
    image: {
        width: width,  
        height: height, 
        resizeMode: 'cover', 
    },
    spinner: {
        position:'absolute',
      },
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
  });
  

export default SplashScreen;