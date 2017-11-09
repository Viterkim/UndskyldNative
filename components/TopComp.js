import React, {Component} from 'react';
import { Text, View, Button, AsyncStorage} from 'react-native';

export default class TopComp extends Component {
render(){
    var name;
    //Sets name to user logged in
    AsyncStorage.getItem("name").then((val) => {return val});
    if(!name){
        name = "";
    }

    return(
        <View style={{flex: 1}}>
            <Button title={name} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
        </View>
    );
    
}


}