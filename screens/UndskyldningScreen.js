import React from 'react';
import { StyleSheet, Text, View, Button, Image, Clipboard, Alert } from 'react-native';
import UndskyldComp from '../components/UndskyldComp';
import { observer } from "mobx-react";
import undskyldStore from "../stores/UndskyldStore";
import TopComp from '../components/TopComp';


@observer
export default class UndskyldningScreen extends React.Component {

    static navigationOptions = {
      drawerLabel: 'Undskyldninger',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };

    setClipBoard(){
      Clipboard.setString("Jeg kan desværre ikke, jeg skal " + undskyldStore.currentText);
      //Animation
      //Find en ordenlig alert
      Alert.alert("Sat undskyldning i udklipsholder!");
    }
  
    render() {
      return (
        <View style={{flex: 1}}>
          <TopComp />
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={styles.text}>Jeg kan desværre ikke, jeg skal</Text>
            <UndskyldComp style={styles.text}/>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Button
              onPress={() => undskyldStore.incrementButtonPressed()}
              title="Ny Undskyldning"
            />
            <Text>{"\n"}</Text>
            <Button
              onPress={() => this.setClipBoard()}
              color="black" //make white
              title="Kopier til Udklipsholder"
            />
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    positionInBottom: {
        position: 'absolute',
        width: 50,
        height: 50,
        bottom: 0,
        backgroundColor: 'red',
        zIndex: 100,
    },
    icon: {
      width: 24,
      height: 24,
    },
    text: {
      fontSize: 20,
      textAlign: 'center'
    }
});