import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';

const months = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const days = Array.from({ length: 30 }, (_, i) => {
  const day = (i + 1).toString();
  return { label: day, value: day };
});

const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => {
  const year = (2000 + i).toString();
  return { label: year, value: year };
});

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(null);
  const handleSignup = async () => {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigation.navigate('Login');
  } catch (e: any) {
    setError(e.message);
  }
};

  

  return (
    <SafeAreaView>
      <View style={{justifyContent: 'center', alignItems:'center'}}>
        <View style={styles.imgContainer}></View>
      </View>
      <View style={styles.container}>
        <TextInput placeholder="Name" value={email} onChangeText={setEmail} style={styles.emailText} />
        <TextInput placeholder="Email" value={password} onChangeText={setPassword} style={styles.passwordText} />
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Text style={{color:'#000000', marginTop:20}}>Birth Date</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={months}
              search={false}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Month"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={days}
              search={false}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Day"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={years}
              search={false}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Year"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
            {/* <TextInput style={[styles.emailText, styles.inputWidth]} /> */}
            {/* <TextInput style={[styles.emailText, styles.inputWidth]} /> */}
            {/* <TextInput style={[styles.emailText, styles.inputWidth]} /> */}
          </View>
        </View>
        {/* <View style={{width: '100%', paddingHorizontal: 20}}>
          <Text style={{color:'#000000', marginTop:20}}>Birth Date</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width:100, height:100, backgroundColor: '#fff'}}>

            </View>
           
          </View>
        </View> */}
        {/* {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
                <Text style={styles.btnText}>Signup</Text>
              </TouchableOpacity> */}
        {/* <Button title="Signup" onPress={handleSignup} /> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                <Text style={styles.signText}>Go to Login</Text>
              </TouchableOpacity> */}
        {/* <Button title="Go to Login" onPress={() => navigation.navigate('Login')} /> */}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // justifyContent: 'center',
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
  inputWidth:{
    width: 100
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
    width: 100,
    height: 100,
    backgroundColor: '#F9E6E6',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: '#fff',
    width: 100,
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10,
      borderColor: '#B10808',
      borderWidth: 1,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
}); 