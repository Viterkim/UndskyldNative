import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import {graphql, compose } from 'react-apollo';
import TopComp from '../components/TopComp';
import gql from 'graphql-tag';

class SubmissionScreen extends React.Component {
 
  constructor(props){
      super(props);
      this.state = {
          content: "",
      };
    }

    static navigationOptions = {
      drawerLabel: 'Submit Ny Undskyldning',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };

    _submit = async (createdById) => {
      const { content } = this.state;
      //Create Excuse
  
      var result;
      try{
          result = await this.props.createExcuse({
          variables: {
              content,
              createdById
          }});
          Alert.alert("Submitted ny Undskyldning");
          this.props.navigation.navigate('Home');
      }
      catch(error){
        Alert.alert("Fejl! Du er ikke logget ind, eller undskyldningen eksisterer allerede!");
      }
    };

  render() {
    var createdById;
    AsyncStorage.getItem(GC_USER_ID).then((val) => createdById = val);
    
    return (
      <View style={{flex: 1}}>
        <TopComp />
        <View style={{flex: 5, alignItems: 'center'}}>
          <Text style={styles.text}>Indtast en ny undskyldning så det giver mening efter{"\n\n"}
          "Jeg kan desværre ikke jeg skal..."{"\n\n"}</Text>
          <TextInput 
            autoCorrect={false}
            style={{height: 60, width: 300}}
            placeholder="Ny Undskyldning"
            onChangeText={(text) => this.setState({content: text})}
          />
          <Text>{"\n"}</Text>
          <Button
            onPress={() => this._submit(createdById)}
            color="black"
            title="Submit Ny Undskyldning"
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
    },
    text: {
      fontSize: 16,
      textAlign: 'center'
    }
});

const CREATE_EXCUSE_MUTATION = gql`
mutation createExcuse($content: String!, $createdById: ID!){
  createUndskyldning(
    content: $content
    createdById: $createdById
  ) {
    id
        content
  } 
}`

export default compose(graphql(CREATE_EXCUSE_MUTATION, { name: 'createExcuse' }))(SubmissionScreen);