import React from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      uid: 0,
      LoggedInText: "Please wait, you are being logged in",
    };

    //connects firebase database
    const firebaseConfig = {
      apiKey: "AIzaSyBnEL8Av2Ge_Jt33CGLAjY7UKrGTGCgBMw",
      authDomain: "chat-app-8d9a9.firebaseapp.com",
      projectId: "chat-app-8d9a9",
      storageBucket: "chat-app-8d9a9.appspot.com",
      messagingSenderId: "511831772136",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      //specifies which collection is being referred to
      this.referenceChatMessages = firebase.firestore().collection("messages");
      firebase.firestore().collection("messages");
      this.referenceMessageUser = null;
    }
  }

  // async function for retrieving the messages in storage
  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.getMessages();

    let { username } = this.props.route.params;
    this.props.navigation.setOptions({ title: "Hi" + `${username}` });

    // Checks whether user is online or offline
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: username,
            },
            messages: [],
          });
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log("offline");
        this.getMessages();
        this.setState({ isConnected: false });
      }
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  // Adds messages to database
  addMessages() {
    const message = this.state.messages[0];
    // add a new messages to the collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  }

  //called when a user sends a message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // Call function to save to local storage
        this.saveMessages();
        this.addMessages();
      }
    );
  }

  // Function to save messages as they're being sent
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // Deletes any stored messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Hides input bar when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  //changes the chat bubble color (right or left)
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2D2526",
          },
        }}
      />
    );
  }
  render() {
    const { username, bgColor } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text>{this.state.loggedInText}</Text>

        <View style={styles.giftedChat}>
          <GiftedChat
            renderInputToolbar={this.renderInputToolbar.bind(this)}
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
