import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AllUsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>Username: {item.username}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Name: {item.name}</Text>
          {item.company ? <Text>Company: {item.company}</Text> : null}
          {item.phone ? <Text>Phone: {item.phone}</Text> : null}
        </View>
      )}
    />
  );
};

export default AllUsersScreen;
