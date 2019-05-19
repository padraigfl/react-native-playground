import React from "react";
import {
  StyleSheet,
  View,
  StatusBar, // color of status bar on top of screen
  ScrollView, // overflow scroll
  ActivityIndicator // ???
} from "react-native";
import { Contacts } from "expo";
import ListEntry from "../components/ChatListEntry";
import Button from "../components/Button";
import Template from "../components/template";

const headerTitle = "nativeapp";

export default class Main extends React.Component {
  state = {
    inputValue: "",
    loadingItems: true,
    contacts: []
  };

  componentDidMount() {
    this.getContacts();
  }

  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  getContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.Image]
    });

    if (data.length > 0) {
      console.log(data[0]);

      this.setState({
        contacts: data,
        loading: false
      });
    }
  };

  render() {
    const { contacts, loadingItems } = this.state;
    return (
      <Template
        title={headerTitle}
        onSearch={() => {
          /* search contacts */
        }}
        navigate={this.props.navigation.navigate}
      >
        <View style={styles.column}>
          <View style={styles.deleteAllButton}>
            <Button onClick={this.displayContacts}>Get Contacts</Button>
            <Button onClick={() => this.props.navigation.navigate("Chats")}>
              Test
            </Button>
          </View>
        </View>
        <View style={styles.list}>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {contacts.map(item => (
                <ListEntry
                  key={item.id}
                  navigate={this.props.navigation.navigate}
                  {...item}
                />
              ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
      </Template>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    alignItems: "center"
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15
  },
  list: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "blue"
  },
  scrollableList: {
    marginTop: 15
  },
  column: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  deleteAllButton: {
    marginRight: 10
  }
});
