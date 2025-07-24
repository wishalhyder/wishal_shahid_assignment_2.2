import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const profiles = [
  { id: '1', name: 'Alice Johnson', age: 28, image: 'https://www.uwsp.edu/wp-content/uploads/2023/09/Young-Zack.jpg', email: 'alice@gmail.com', occupation: 'Engineer' },
  { id: '2', name: 'Bob Smith', age: 34, image: 'https://mcb-seattle.edu/wp-content/uploads/2024/01/Snyder_Andrew_resized-scaled.jpg', email: 'bob@gmail.com', occupation: 'Designer' },
  { id: '3', name: 'Carol Davis', age: 22, image: 'https://mcb-seattle.edu/wp-content/uploads/2024/01/Snyder_Andrew_resized-scaled.jpg', email: 'carol@gmail.com', occupation: 'Student' },
  // add more profiles as you want
];

const HomeScreen = () => {
  const navigation: any = useNavigation();

  const [profilesData, setProfileData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log('response => ', response);
        return response.json();
      })
      .then((data) => {
        console.log('data => ', data);
        setProfileData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', { profile: item })}
    >
      <Image
        source={{ uri: 'https://www.uwsp.edu/wp-content/uploads/2023/09/Young-Zack.jpg' }}
        style={styles.image}
        resizeMode="cover" // optional: 'contain', 'stretch', etc.
      />
      <View style={styles.profileData}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Company: {item.company.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profilesData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  item: {
    flex: 3,
    flexDirection: 'row',
    padding: 15,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    backgroundColor: '#ddd',
    marginBottom: 7,
    borderRadius: 8,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  image: { width: 100, height: 100, borderRadius: 10 },
  profileData: {
    marginLeft: 20
  }
})