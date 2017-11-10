import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import React, { Component } from 'react';
import { Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { observer } from "mobx-react";

export default class LoginScreen extends React.Component {

    static navigationOptions = {
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
       <View>
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
  
  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }
  
  const SIGNUP_USER_MUTATION = gql`
  mutation createUserMutation($email: String!, $password: String!, $name: String!) {
    mutation{
      createUser(
        authProvider: { 
          email: { email: $email, password: $password }}
      name: $name
      admin: false
      ){
        id
        token
      }
    }

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

  export default compose(
    graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
    graphql(SIGNIN_USER_MUTATION, { name: 'SigninUserMutation' })
    )(LoginComp);