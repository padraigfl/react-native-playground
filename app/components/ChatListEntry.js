// app/components/List.js
import React, { Component } from "react";
import { Text, View } from "react-native";
import Entry from "./entry";

class List extends Component {
  render() {
    const {
      id,
      name,
      firstName,
      lastName,
      imageAvailable,
      image,
      viewContact
    } = this.props;
    return (
      <Entry
        onClick={() => this.props.navigate("Chat", { id })}
        image={imageAvailable && image}
        heading={name || firstName || lastName}
        context={<Text>Text</Text>}
        placeholder={!imageAvailable && "AB"}
        useImage
        content="And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest"
      />
    );
  }
}

export default List;
