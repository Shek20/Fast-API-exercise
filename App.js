import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './components/Search';
import Details from './components/Details';

const App = () => {
  const Stack = createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'search' screenOptions = {{headerShown: false}}>
        <Stack.Screen name = 'search' component = {Search}/>
        <Stack.Screen name = 'details' component = {Details}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;