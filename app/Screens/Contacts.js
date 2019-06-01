import React from "react";
import {
  StyleSheet,
  View,
  ScrollView, // overflow scroll
  ActivityIndicator // ???
} from "react-native";
import { Contacts } from "expo";
import ListEntry from "../components/ChatListEntry";
import Template from "../components/template";
import { colors } from "../constants/styles";

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
      fields: [
        Contacts.Fields.Emails,
        Contacts.Fields.Image,
        Contacts.Fields.PhoneNumbers
      ]
    });
    if (data.length > 0) {
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
  list: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: colors.secondary
  },
  scrollableList: {
    marginTop: 15
  }
});
