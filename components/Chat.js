import React from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      messages: [],
      bgColor: this.props.route.params.bgColor
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Welcome Developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "You have enterted the chat room",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  //called when a user sends a message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  //changes the chat bubble color (right or left)
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }
  render() {
    let { username } = this.props.route.params;
    //this is showing an error
    // this.props.navigation.setOptions({ title: username });
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hi {username}</Text>

        <Button
          title="Start Screen"
          onPress={() => this.props.navigation.navigate("Start")}
          accessible={true}
          accessibilityLabel="Back to Start screen"
          accessibilityRole="button"
          accessibilityHint="Navigates back to the Start screen"
        />
        <View style={styles.giftedChat}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          {/* to properly position keyboard on Android devices */}
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  giftedChat: {
    flex: 1,
    width: "100%",
  },
});
