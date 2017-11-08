import React from 'react';
import { StyleSheet, Text, View, Button, Platform, Image } from 'react-native';
import { Constants } from "expo";
import { DrawerNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import UndskyldningScreen from './screens/UndskyldningScreen';
import LoginScreen from './screens/LoginScreen';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9o65e6d0no00192mmyy0i9c' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


export default App = () => (<ApolloProvider client={client}>
<DrawerNavi style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }}/>
</ApolloProvider>);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const DrawerNavi = DrawerNavigator({
  Home: {
    screen: UndskyldningScreen,
  },
  Login: {
    screen: LoginScreen,
  }},
  {
    navigationOptions: { headerStyle: { marginTop: Expo.Constants.statusBarHeight } }
  }
);

