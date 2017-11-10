import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import {graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TopComp from '../components/TopComp';

class CreateAccountScreen extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  static navigationOptions = {
    drawerLabel: 'Create Account',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  _confirm = async () => {
    const { email, password, name } = this.state;
    //Create Account

    var result;
    try{
        result = await this.props.createUserMutation({
        variables: {
            name,
            email,
            password
        }});
        Alert.alert("Velkommen "+ name + ", du kan nu logge ind!");
        this.props.navigation.navigate('Login');
    }
    catch(error){
        Alert.alert("Email eksisterer allerede!");
    }
  };

  
  render() {
    return (
      <View style={{flex: 1}}>
      <TopComp />
      <Text style={styles.headline}>Create New Account{"\n\n"}</Text>
      <View style={{flex: 7, alignItems: 'center'}}>
        <Text>Email:</Text>
        <TextInput 
          autoCorrect={false}
          style={{height: 40, width: 200}}
          placeholder="Email"
          onChangeText={(text) => this.setState({email: text})}
        />
        <Text>Password:</Text>
        <TextInput 
          secureTextEntry={true}
          style={{height: 40, width: 200}}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <Text>Name:</Text>
        <TextInput 
          style={{height: 40, width: 200}}
          placeholder="Name"
          onChangeText={(text) => this.setState({name: text})}
        />
        <Text>{"\n"}</Text>
        <Button
        onPress={() => this._confirm()}
        title="Create New Account"
        color="black"
      />
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

const SIGNUP_USER_MUTATION = gql`
mutation createUserMutation($email: String!, $password: String!, $name: String!) {
      createUser(
        authProvider: {
          email: { email: $email, password: $password }}
      name: $name
      admin: false
      ){
        id
      }
}
`

export default compose(graphql(SIGNUP_USER_MUTATION, { name: 'createUserMutation' }))(CreateAccountScreen);