import React from "react";
import { View, Text, Button, TextInput } from "react-native";


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  render() {
    let { username } = this.props.route.params;
    //this is showing an error
    this.props.navigation.setOptions({ title: username });
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <Text>Hi {username}</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          placeholder="Type here ..."
        />

        <Button
          title="Go to Start Screen"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}
