// app/components/List.js
import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions, // gets width and height
  TouchableOpacity // like a button, onPress
} from "react-native";
import styled from "styled-components";
import { format } from "date-fns";

const bubbleDefaults = `
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin: 1px 0px;
  border-radius: 20px;
  margin: 4px 8px 4px 24px;
`;

const Outgoing = styled.View`
  ${bubbleDefaults}
  border-bottom-right-radius: 0px;
`;

const Incoming = styled.View`
  ${bubbleDefaults}
  border-top-left-radius: 0px;
`;

const Message = styled.Text`
  padding: 8px 12px 12px;
`;

const TimeStamp = styled.Text`
  position: absolute;
  bottom: 2px;
  right: 6px;
  font-size: 12px;
`;

class ChatBubble extends Component {
  render() {
    const { isIncoming, message, time, onClick, style } = this.props;

    const Comp = onClick ? TouchableOpacity : View;
    const Bubble = isIncoming ? Incoming : Outgoing;
    return (
      <Comp onPress={onClick} style={style}>
        <Bubble>
          <Message>{message}</Message>
          <TimeStamp>{format(time, "hh:mmA")}</TimeStamp>
        </Bubble>
      </Comp>
    );
  }
}

export default ChatBubble;
