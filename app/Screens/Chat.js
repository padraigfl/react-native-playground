import React from "react";
import { Text, TextInput } from "react-native";
import { SQLite } from "expo";
import styled from "styled-components";
import Template from "../components/template";
import ChatBubble from "../components/ChatBubble";
import { colors } from "../constants/styles";
import { getPlaceholder } from "../components/ChatListEntry";

const headerTitle = "nativeapp";
const db = SQLite.openDatabase("db.db");

const MessageArea = styled.ScrollView`
  flex-grow: 1;
  height: 5px;
`;

const InputArea = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${colors.brand};
  padding: 8px 16px 16px;
  flex-shrink: 0;
`;

const MessageInput = styled.TextInput`
  background-color: white;
  padding: 4px;
  flex-grow: 1;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const SendButton = styled.TouchableOpacity`
  color: white;
  background-color: ${colors.light};
  flex-shrink: 0;
  padding: 4px 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export default class Chat extends React.Component {
  state = {
    inputValue: "",
    messages: []
  };
  componentDidMount() {
    db.transaction(
      tx => {
        tx.executeSql(
          `create table if not exists msg (
          id integer primary key not null,
          contact text,
          message text,
          time int
        );`,
          null,
          e => {},
          (e, t) => {
            console.log(t);
          }
        );
      },
      null,
      this.update
    );
  }

  update = () => {
    db.transaction(tx =>
      tx.executeSql(
        `select * from msg where contact = ?;`,
        [this.props.navigation.state.params.id],
        (_, { rows: { _array = [] } }) => this.setState({ messages: _array }),
        () => this.setState({ messages: [], newChat: true })
      )
    );
  };

  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  onSubmitEditing = e => {
    const { inputValue } = this.state;

    if (inputValue) {
      db.transaction(tx =>
        tx.executeSql(
          `insert into msg (
            contact,
            message,
            time
          ) VALUES (?, ?, ?);`,
          [this.props.navigation.state.params.id, inputValue, Date.now()],
          e => {
            this.setState({ inputValue: "" });
            this.update();
          },
          (e, t) => {
            console.log(t);
            this.setState({ inputValue: "zz" });
          }
        )
      );
    }
  };

  render() {
    const contactInfo = this.props.navigation.state.params;
    const { inputValue, messages } = this.state;
    return (
      <Template
        title={
          contactInfo.name || contactInfo.phoneNumbers[0].number || headerTitle
        }
        image={contactInfo.image}
        placeholder={getPlaceholder(contactInfo)}
      >
        {/* 
          Contact header, link to profile
        */}
        {/* 
          Message area, sticky bottom
        */}
        {/* 
          Textbox
        */}
        <MessageArea
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {messages.map(v => (
            <ChatBubble key={v.id} message={v.message} time={v.time} />
          ))}
        </MessageArea>
        <InputArea>
          <MessageInput
            value={inputValue}
            placeholder={"Send a message..."}
            placeholderTextColor="#888"
            multiline={true}
            underlineColorAndroid="transparent"
            selectionColor={"white"}
            returnKeyType="done"
            onChangeText={this.newInputValue}
            onSubmitEditing={this.onSubmitEditing}
            returnKeyType="done"
          />
          <SendButton onPressOut={this.onSubmitEditing}>
            <Text>Send</Text>
          </SendButton>
        </InputArea>
      </Template>
    );
  }
}
