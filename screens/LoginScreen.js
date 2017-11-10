import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import {graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TopComp from '../components/TopComp';

class LoginScreen extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  _confirm = async () => {
    const { email, password } = this.state;
    //Login

    var result;
    try{
      result = await this.props.signinUserMutation({
        variables: {
          email,
          password,
        }
      });
      const id = result.data.signinUser.user.id;
      const name = result.data.signinUser.user.name;
      const token = result.data.signinUser.token;
      this._saveUserData(id, name, token);
      
      //Velkomst navn
      AsyncStorage.getItem("name").then((val) => Alert.alert("Velkommen " + val));
      this.props.navigation.navigate('Home');
    }
    catch(error){
      Alert.alert("Fejl i login! Check dine konto oplysninger")
    }
  };

  _saveUserData = (id, name, token) => {
    AsyncStorage.setItem(GC_USER_ID, id)
    AsyncStorage.setItem("name", name)
    AsyncStorage.setItem(GC_AUTH_TOKEN, token)
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
      <TopComp />
      <Text style={styles.headline}>Login{"\n\n"}</Text>
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
        <Text>{"\n"}</Text>
        <Button
          onPress={() => this._confirm()}
          title="Login"
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

const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
  signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
      name
      createdAt
      excuses {
        id
      }
    }
  }
}
`

export default compose(graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' }))(LoginScreen);