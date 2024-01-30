import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, View, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Search = ({navigation}) => {
  const [text, textChange] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const redering = ({item}) => (
    <TouchableOpacity onPress = {() => navigation.navigate('details', {data: item})}>
      <View style = {{padding: 20, borderBottomWidth: 1, borderBlockColor: '#005bb5', flexDirection: 'row', alignItems: 'center' }}>
      <Image source = {item.thumb === ''?require('../assets/icon.png'):{ uri: item.thumb }} style = {{ width: 50, height: 50, borderRadius: 9999, marginRight: 25 }}/>
      <Text style = {styles.textStyle}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  )
  const fetchData = async () =>{
    try {
      setLoading(true);
      const response = await fetch('https://api.discogs.com/database/search?q='+text+'&type=artist&token=TmpQmSyXpbhjZNTrTyXtziUqgFYMvXNBHGMCKFll&per_page=50&page=1');
      const result = await response.json();
      setData(result.results);
    } catch(error){
      console.error('Error type that occured:', error);
    } finally{
      setLoading(false);
    }
  }
  const clearText = () => {
    textChange('');
  }
  return (
    <View style = {styles.container}> 
      <SafeAreaView>
        <View>
          <View style = {styles.searchBarContainer}>
          <TextInput style = {styles.searchBar} placeholder = 'Search your artist' onChangeText = {textChange} value = {text}/>
          <TouchableOpacity onPress = {fetchData}>
            <Icon name = 'search' color = '#005bb5' size = {30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {clearText}>
            <Icon name = 'cancel' color = '#005bb5' size = {30}/>
          </TouchableOpacity>
        </View>
        </View> 
        <View style = {styles.theFlatList}>
          <FlatList data = {data} keyExtractor = {(item) => item.id.toString()} renderItem = {redering}/>
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
  searchBarContainer: {
    height: 50,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a5d7ff',
  },
  searchBar: {
    height: 40,
    width: 250,
    borderRadius: 15,
    marginHorizontal: 10,
    color: '#005bb5',
    borderColor: '#005bb5',
  },
  textStyle: {
    color: '#005bb5',
    fontWeight: 'bold',
  },
});

export default Search;