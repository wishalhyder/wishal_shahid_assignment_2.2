import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    console.log('Attempt login with:', email, password);
    if (!email || !password) {
      setError('Email and password are required!');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.uid);
      setError('');
      // Navigate or other logic here
      navigation.navigate('AddUser');
    } catch (e: any) {
      console.log('Login failed:', e);
      setError(e.message);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <Text style={style.heading}>Welcome to infinity</Text>
        <Text style={style.subHeaing}>Save And Grow</Text>
        <Text style={style.subHeaing}>Smart Money, Smart Life</Text>
      </View>

      <TextInput style={style.emailText}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        style={style.passwordText}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={login} style={style.loginBtn}>
        <Text style={style.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
        <Text style={style.signText}>Sign-Up</Text>
      </TouchableOpacity>

      <View style={style.imgContainer}></View>

    </View>
  );
}


const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer:{
    
  },
  heading:{
    fontSize: 28,
    fontWeight: '700',
    color: '#B10808',
    textAlign: 'center'
  },
  subHeaing:{
    fontSize: 20,
    fontWeight: '700',
    color: '#B10808',
    textAlign: 'center'
  },
  emailText: {
    backgroundColor: '#fff',
    width:'90%',
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10
  },
  passwordText: {
    backgroundColor: '#fff',
    width:'90%',
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10
  },
  loginBtn:{
    width:'90%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 14
  },
  signText:{
    fontWeight: '400',
    fontSize: 13,
    color: '#B10808'
  },
  imgContainer: {
    marginVertical: 20,
    width: 150,
    height: 150,
    backgroundColor: '#F9E6E6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 