import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const FormField = ({ value, placeholder, handleChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.formArea,
          isFocused && styles.formAreaFocused, 
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={placeholder.toLowerCase() === 'password'}
          style={styles.input}
          onFocus={() => setIsFocused(true)
          }
          onBlur={() => setIsFocused(false)}
          selectionColor="#7b7b8b"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  formArea: {
    // elevation: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // backgroundColor: '#abc3fd',
    borderWidth: 1,
    borderColor: '#abc3fd', 
  },
  formAreaFocused: {
    borderColor: '#608efb', 
  },
  input: {
    fontSize: 18,
    color: '#7b7b8b',
  },
});

export default FormField;
