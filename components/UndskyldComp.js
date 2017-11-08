import React, { Component } from 'react';
import { Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { observer } from "mobx-react";
import undskyldStore from "../stores/UndskyldStore";

const endpoint = 'https://api.graph.cool/simple/v1/cj9o65e6d0no00192mmyy0i9c';

//For testing
const SAMMEUNDSKYLDNING = gql`
query sameUndQuery{
    Undskyldning(id: "cj9ocbkqn7krd0143wtim20hm"){
      content
    }
}`

const allUndskyldningsQuery = gql`
query {
  allUndskyldnings {
    id
    content
    createdAt
    isAccepted
  }
}
`

@observer
class UndskyldComp extends Component {

    componentWillMount(){
      if(!undskyldStore.undList){
        undskyldStore.setUndList(this.props.allUndskyldningsQuery.allUndskyldnings);
      }
    }

    getRandomUndIndex(){
      return Math.floor(Math.random() * this.props.allUndskyldningsQuery.allUndskyldnings.length);
    }

    render() {
      var query = this.props.allUndskyldningsQuery;

      if (query && query.loading) {
        return (<Text style={this.props.style}>{undskyldStore.lastText}</Text>);
      }
      if (query && query.error) {
          return (<Text style={this.props.style}>fixe server fejlene</Text>);
      }    

      //Force a refresh from other component
      if(undskyldStore.buttonPressedCounter > 0){
      }

      var randomIndex = this.getRandomUndIndex();
      var showText = (this.props.allUndskyldningsQuery.allUndskyldnings[randomIndex].content);
      undskyldStore.setCurrentText(showText);

      return (
        <Text style={this.props.style}>{showText}</Text>
      )
    }
}

export default graphql(allUndskyldningsQuery, { name: 'allUndskyldningsQuery' }) (UndskyldComp);