import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Clipboard, Alert, TextInput } from 'react-native';
import { observer } from "mobx-react";
import undskyldStore from "../stores/UndskyldStore";
import TopComp from '../components/TopComp';


@observer
export default class AllUndskyldningScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
    };
  }

    static navigationOptions = {
      drawerLabel: 'Alle Undskyldninger',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };

    render() {
      var filteredArr = undskyldStore.undList.filter((e) => {
        return e.content.includes(this.state.text);
      });

      return (
        <View style={{flex: 1}}>
          <TopComp/>
          <View style={{flex: 20}}>
          <TextInput placeholder="Søg Efter Undskyldning" onChangeText={(text) => this.setState({text})}/>
            <ScrollView>
              {filteredArr.map((e) => {
                return (<Text key={e.id}>{e.content}</Text>);
              })}
            </ScrollView>
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