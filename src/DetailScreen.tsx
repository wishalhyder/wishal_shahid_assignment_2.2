import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailScreen = ({ route }) => {
    const { profile } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Image source={{ uri: 'https://www.uwsp.edu/wp-content/uploads/2023/09/Young-Zack.jpg'}} style={styles.image} resizeMode="cover" />
        </View>
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text>Phone: {profile.phone}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Company: {profile.company.name}</Text>
          <Text>Website: {profile.website}</Text>
        </View>
      </View>
    </View>
  );

}

export default DetailScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:'#ddd' },
    card:{backgroundColor: '#fff', padding: 20, elevation:10,  flexDirection: 'column'},
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 300, height: 300, borderRadius: 10 },
})