import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Chats from "./app/Screens/Chats";
import Contacts from "./app/Screens/_Contacts";
import Chat from "./app/Screens/_Chat";

const AppNavigator = createStackNavigator(
  {
    Chats,
    Contacts,
    Chat
  },
  {
    initialRouteName: "Contacts"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
