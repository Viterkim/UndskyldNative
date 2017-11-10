import React, {Component} from 'react';
import { Text, View, Button, AsyncStorage} from 'react-native';

export default class TopComp extends Component {

    constructor(props){
        super(props);
        this.state = {
          name: " ",
          isLoading: true,
        };
      }

    componentWillMount(){
        //Sets name to user logged in
        AsyncStorage.getItem("name").then((val) => {
            if(!val){
                this.setState({name: " "});
            }
            if(val !== this.state.name){
                this.setState({name: val});
            }
            this.setState({isLoading: false});
        });
    }

    render(){ 
        //Writes the users username at the top of the screen, or nothing if not logged in
        var finName = (this.state.name ? this.state.name : " ");
        return(
            <View style={{flex: 1}}>
                <Button title={finName} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
            </View>
        );
        
    }


}