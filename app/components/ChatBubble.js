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

const Bubble = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin: 1px 0px;
  border-radius: 20px;
  border-bottom-right-radius: 0px;
  margin: 4px 8px 4px 24px;
`;

const Message = styled.Text`
  padding: 8px 12px 12px;
`;

const TimeStamp = styled.Text`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
`;

class ChatBubble extends Component {
  render() {
    const { message, time, isLarge, onClick, content, style } = this.props;
    const fullSize = content || isLarge;

    const Comp = onClick ? TouchableOpacity : View;
    const imageSize = fullSize
      ? { height: 60, width: 60 }
      : { height: 40, width: 40 };
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
