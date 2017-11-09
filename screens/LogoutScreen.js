import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import {graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TopComp from '../components/TopComp';

export default class LogoutScreen extends Component {
    
  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  _logout = (id, name, token) => {
    AsyncStorage.removeItem(GC_USER_ID)
    AsyncStorage.removeItem("name")
    AsyncStorage.removeItem(GC_AUTH_TOKEN)
    Alert.alert("Loggede ud!");
    this.props.navigation.navigate('Home');
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
      <TopComp />
      <Text style={styles.headline}>Logout{"\n\n"}</Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Button
          onPress={() => this._logout()}
          title="Logout"
        />
        <Text>{"\n"}</Text>
      </View>
    </View>
    );
  }
} 

  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    headline: {
      textAlign: 'center',
      fontSize: 32
    }
});
