// app/components/List.js
import React, { Component } from "react";
import { Text, View } from "react-native";
import Entry from "./entry";

export const getPlaceholder = ({ firstName = "", lastName = "", name }) => {
  if (firstName && lastName) {
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }
  if (name) {
    return lastName[0].toUpperCase();
  }
  return null;
};

class List extends Component {
  render() {
    const {
      id,
      backgroundColor,
      name,
      firstName,
      lastName,
      imageAvailable,
      image,
      phoneNumbers,
      viewContact
    } = this.props;
    return (
      <Entry
        onClick={() =>
          this.props.navigate("Chat", {
            id,
            name,
            firstName,
            lastName,
            image,
            phoneNumbers
          })
        }
        image={imageAvailable && image}
        backgroundColor={backgroundColor}
        heading={name || firstName || lastName}
        context={<Text>Text</Text>}
        placeholder={
          !imageAvailable && getPlaceholder({ firstName, lastName, name })
        }
        bgColor="white"
        useImage
        content="And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest"
      />
    );
  }
}

export default List;
