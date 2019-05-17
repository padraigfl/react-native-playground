// app/components/List.js
import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions, // gets width and height
  StyleSheet,
  TouchableOpacity, // like a button, onPress
  Platform // checks platform app is running on
} from "react-native";
import styled from "styled-components";
import {
  itemListText,
  itemListTextStrike,
  circleInactive,
  circleActive
} from "../utils/Colors";

const Entry = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const style = `
  width: 40;
  height: 40;
  border-radius: 15;
  border-width: 3;
  overflow: hidden;
  margin: 4px 12px;
`;

const Image = styled.Image`
  ${style}
`;
const ImagePlacholder = styled.Text`
  ${style}
  display: flex;
  align-items: center;
  align-self: center;
  align-content: center;
  text-align: center;
`;
const imageStyle = {
  width: 40,
  height: 40,
  alignSelf: "center"
};

const { height, width } = Dimensions.get("window");
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
      <TouchableOpacity
        onPress={() => this.props.navigate("Chat", { id: "potato" })}
      >
        <Entry>
          {imageAvailable ? (
            <Image
              source={{
                uri: image.uri,
                ...imageStyle
              }}
            />
          ) : (
            <ImagePlacholder style={imageStyle}>AB</ImagePlacholder>
          )}
          <Text style={[styles.text]}>{name || firstName || lastName}</Text>
        </Entry>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 15,
    width: width / 1.5
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10
  },
  button: {
    marginRight: 10
  }
});
export default List;
