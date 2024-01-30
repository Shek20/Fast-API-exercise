import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, View, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Details = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const receivedData = route.params?.data || null;
  useEffect(() => {
    const fetchData = async () =>{
    try {
      setLoading(true);
      const response = await fetch('https://api.discogs.com/artists/'+receivedData.id);
      const result = await response.json();
      setData(result);
    } catch(error){
      console.error('Error type that occured:', error);
    } finally{
      setLoading(false);
    }
  };
  fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <View>
        <TouchableOpacity onPress = {() => navigation.navigate('search')}>
          <Icon name = 'arrow-back' color = '#005bb5' size = {30}/>
        </TouchableOpacity>
      </View>
      <View style = {styles.subContainer}>
          <View style = {styles.anotherSubContainer}>
            <Image source = {receivedData.thumb === ''?require('../assets/icon.png'):{ uri: receivedData.thumb }} style = {{ width: 80, height: 80, borderRadius: 9999, borderWidth: 1, borderColor: '#005bb5', }}/>
            <Text style = {styles.nameStyle}>{receivedData.title}</Text>
          </View>
      </View>
      <View>
        {loading && <Text style = {styles.dataStyle}>Loading...</Text>}
          {data && (
            <>
              <Text style = {styles.titleStyle}>Real name</Text>
              <Text style = {styles.dataStyle}>{data.realname}</Text>
              <Text style = {styles.titleStyle}>Profile</Text>
              <Text style = {styles.dataStyle}>{data.profile}</Text>
            </>)}
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  subContainer: {
    paddingVertical: 5,
  },
  anotherSubContainer: {
    padding: 10, 
    alignItems: 'center', 
    flexDirection: 'column'
  },
  nameStyle: {
    marginTop: 10, 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#005bb5',
  },
  titleStyle: {
    marginTop: 5, 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#005bb5',
  },
  dataStyle: {
    fontSize: 12, 
    fontWeight: '400', 
    color: '#00264d',
    textAlign: 'justify',
  },
});

export default Details;