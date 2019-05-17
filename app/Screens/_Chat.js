import React from "react";
import { Text, View } from "react-native";
import Template from "../components/template";

const headerTitle = "nativeapp";

export default class Chat extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Template title={headerTitle}>
        {/* 
          Contact header, link to profile
        */}
        {/* 
          Message area, sticky bottom
        */}
        {/* 
          Textbox
        */}
        <Text>OOOOh</Text>
      </Template>
    );
  }
}
