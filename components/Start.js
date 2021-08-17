import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { onChange } from "react-native-reanimated";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome!</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Type name here ..."
        />
        <Text>Your Name: {this.state.name}</Text>
        <Button
          title="Go to Screen 2"
          onPress={() =>
            this.props.navigation.navigate("Chat", { name: this.state.name })
          }
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#757083",
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     fontSize: 16,
//     justifyContent: "space-evenly",
//   },
// });
