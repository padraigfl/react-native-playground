// app/components/List.js
import React, { Component } from "react";
import { Text } from "react-native";
import Entry from "./entry";
import { getPlaceholder } from "../utils/text";

class List extends Component {
  render() {
    const {
      content,
      context,
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
        context={<Text>{context || "Text"}</Text>}
        placeholder={
          !imageAvailable && getPlaceholder({ firstName, lastName, name })
        }
        bgColor="white"
        useImage
        content={
          content ||
          "And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest And the rest"
        }
      />
    );
  }
}

export default List;
