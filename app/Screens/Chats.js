import React from "react";
import {
  StyleSheet,
  View,
  ScrollView, // overflow scroll
  Text,
  ActivityIndicator // ???
} from "react-native";
import { Contacts, SQLite } from "expo";
import ListEntry from "../components/ChatListEntry";
import Template from "../components/template";
import { colors } from "../constants/styles";

const headerTitle = "nativeapp";

const db = SQLite.openDatabase("db.db");

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
      fields: [
        Contacts.Fields.Emails,
        Contacts.Fields.Image,
        Contacts.Fields.PhoneNumbers
      ]
    });

    if (data.length > 0) {
      this.setState(
        {
          contacts: data,
          loading: false
        },
        this.getRecentMessages
      );
    }
  };

  getRecentMessages = () => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT msg.*
        FROM msg
        JOIN (SELECT MAX(time) as time, contact, message
              FROM msg
              GROUP BY contact) AS mostrecent
          ON mostrecent.contact = msg.contact
            AND mostrecent.time = msg.time
        ORDER BY time DESC`,
        [],
        (_, { rows: { _array = [] } }) => this.setState({ messages: _array }),
        (e, b) => {
          console.log(e);
          console.log(b);
          this.setState({ messages: [], newChat: true });
        }
      )
    );
  };

  render() {
    const { contacts, messages, loadingItems } = this.state;
    return (
      <Template
        title={headerTitle}
        onSearch={() => {
          /* search contacts */
        }}
        navigate={this.props.navigation.navigate}
      >
        <View style={styles.list}>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {messages &&
                messages.map(
                  item => <Text key={item.id}>{JSON.stringify(item)}</Text>
                  // <ListEntry
                  //   key={item.id}
                  //   navigate={this.props.navigation.navigate}
                  //   {...item}
                  // />
                )}
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
    backgroundColor: colors.secondary
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
