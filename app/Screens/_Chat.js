import React from "react";
import { Text, View, TextInput } from "react-native";
import { Constants, SQLite } from "expo";
import Template from "../components/template";
import Input from "../components/Input";
import Button from "../components/Button";

const headerTitle = "nativeapp";
const db = SQLite.openDatabase("db.db");

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
      console.log("test");
      console.log([
        this.props.navigation.state.params.id,
        inputValue,
        Date.now()
      ]);
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
    const { inputValue, messages } = this.state;
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
        <Text>test {messages.map(v => JSON.stringify(v)).join("")}</Text>
        <TextInput
          value={inputValue}
          placeholder={"Send a message..."}
          placeholderTextColor="#888"
          multiline={true}
          // autoCapitalize="sentences"
          underlineColorAndroid="transparent"
          selectionColor={"white"}
          returnKeyType="done"
          // autoCorrect={false}
          blurOnSubmit={true}
          onChangeText={this.newInputValue}
          onSubmitEditing={this.onSubmitEditing}
          returnKeyType="done"
        />
        <Button onClick={this.onSubmitEditing}>FF</Button>
      </Template>
    );
  }
}
