import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
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
  
    render() {
      return (
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Button title="H" onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
        </View>
        <Text style={styles.headline}>Login{"\n\n"}</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
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
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Button
            onPress={() => console.warn("Kode: " + this.state.password)}
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