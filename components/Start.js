import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      bgColor: "#757083",
    };
  }
  render() {
    return (
      <View style={styles.mainView}>
        <ImageBackground
          style={styles.bgImg}
          source={require("../assets/Background-Image.png")}
        >
          <View style={styles.mainTitle}>
            <Text style={styles.title}>Chat App</Text>
          </View>
          <View style={styles.startBox}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              placeholder="Your name"
            />
            <Text style={styles.colorText}>Choose Background Color:</Text>
            <View style={styles.bgColorOptions}>
              <TouchableOpacity
                style={styles.colorSelection1}
                onPress={() => this.setState({ bgColor: "#090C08" })}
                // accessible={true}
                // accessibilityLabel="background color"
                // accessibilityRole="background color option 1"
                // accessibilityHint="Changes chat screen color"
              />
              <TouchableOpacity
                style={styles.colorSelection2}
                onPress={() => this.setState({ bgColor: "#474056" })}
                // accessible={true}
                // accessibilityLabel="background color"
                // accessibilityRole="background color option 2"
                // accessibilityHint="Changes chat screen color"
              />
              <TouchableOpacity
                style={styles.colorSelection3}
                onPress={() => this.setState({ bgColor: "#8A95A5" })}
                // accessible={true}
                // accessibilityLabel="background color"
                // accessibilityRole="background color option 3"
                // accessibilityHint="Changes chat screen color"
              />
              <TouchableOpacity
                style={styles.colorSelection4}
                onPress={() => this.setState({ bgColor: "#B9C6AE" })}
                // accessible={true}
                // accessibilityLabel="background color"
                // accessibilityRole="background color option 4"
                // accessibilityHint="Changes chat screen color"
              />
            </View>
            <TouchableOpacity
              //navigates to Chat.js
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  username: this.state.username,
                  bgColor: this.state.bgColor,
                })
              }
              accessible={true}
              accessibilityLabel="Start Chat"
              accessibilityRole="button"
              accessibilityHint="Navigates to the chat screen"
            >
              <Text style={styles.startButton}>Start chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bgImg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  mainTitle: {
    flex: 0.5,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    top: 25,
  },

  startBox: {
    minHeight: 260,
    height: "44%",
    backgroundColor: "#fff",
    width: "88%",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: "6%",
    paddingRight: "6%",
  },

  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    opacity: 100,
    height: 55,
    color: "#757083",
    borderColor: "#8a8697",
    borderWidth: 1.5,
    borderRadius: 2,
    paddingLeft: 18,
  },

  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },

  bgColorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  colorSelection1: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorSelection2: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorSelection3: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorSelection4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  startButton: {
    height: 60,
    color: "#FFFFFF",
    backgroundColor: "#757083",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
