import React from "react";
import { View, Text, Button, TextInput, ImageBackground } from "react-native";

//         <Text>You wrote: {this.state.text}</Text>

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  render() {
    let { name } = this.props.route.params;
    //thsi is showing an error
    this.props.navigation.setOptions({ title: "Hi " + name + "!"});
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hi {name}</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
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
