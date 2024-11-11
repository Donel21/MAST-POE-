import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon (requires expo/vector-icons)

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Back Button to navigate to SignIn */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignIn')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput style={styles.input} placeholder="Enter your Name" />
      <TextInput style={styles.input} placeholder="Enter your Surname" />
      <TextInput style={styles.input} placeholder="Enter your Email" />
      <TextInput style={styles.input} placeholder="Enter your Phone" />
      <TextInput style={styles.input} placeholder="Enter your Password" secureTextEntry />

      {/* When user presses this button, they are navigated to HomeScreen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 20,
  },
});

export default SignUpScreen;
