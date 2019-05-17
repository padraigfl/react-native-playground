import React from "react";
import {
  StyleSheet,
  View,
  ScrollView, // overflow scroll
  ActivityIndicator, // ???
  AsyncStorage // stores to db
} from "react-native";
import { Contacts } from "expo";
import uuid from "uuid/v1";
import ListEntry from "../components/ListEntry";

import Template from "../components/template";

const headerTitle = "nativeapp";

export default class Main extends React.Component {
  state = {
    inputValue: "",
    loadingItems: false,
    allItems: {},
    contacts: [],
    isCompleted: false
  };

  componentDidMount = () => {
    this.loadingItems();
  };
  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  loadingItems = async () => {
    try {
      const allItems = await AsyncStorage.getItem("ToDos");
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(allItems) || {}
      });
    } catch (err) {
      console.log(err);
    }
  };

  onDoneAddItem = () => {
    const { inputValue } = this.state;
    if (inputValue !== "") {
      this.setState(prevState => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          inputValue: "",
          allItems: {
            ...prevState.allItems,
            ...newItemObject
          }
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    }
  };
  deleteItem = id => {
    this.setState(prevState => {
      const allItems = prevState.allItems;
      delete allItems[id];
      const newState = {
        ...prevState,
        ...allItems
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  completeItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: true
          }
        }
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  incompleteItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: false
          }
        }
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  deleteAllItems = async () => {
    try {
      await AsyncStorage.removeItem("ToDos");
      this.setState({ allItems: {} });
    } catch (err) {
      console.log(err);
    }
  };
  displayContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.Image]
    });

    if (data.length > 0) {
      const contact = data[0];
      this.setState({ contacts: data });
      console.log(contact);
    }
  };
  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem("To Dos", JSON.stringify(newItem));
  };
  render() {
    const { allItems, contacts, loadingItems } = this.state;
    return (
      <Template title={headerTitle} onSearch={this.displayContacts}>
        <View style={styles.list}>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(contacts)
                .reverse()
                .map(item => (
                  <ListEntry key={item.id} {...item} />
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
    marginTop: 70,
    paddingLeft: 15,
    marginBottom: 10
  },
  scrollableList: {
    marginTop: 15
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
