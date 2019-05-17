import React from "react";
import {
  StatusBar, // color of status bar on top of screen
  Text
} from "react-native";
import styled from "styled-components";
const Container = styled.View`
  flex: 1;
  background-color: #eee;
  color: #222;
`;
const Search = styled.TextInput`
  padding-left: 15px;
  color: black;
  font-size: 24px;
  box-shadow: 0px 0px 3px #ccc;
  height: 60px;
  border: 3px solid black;
`;

const Header = styled.View`
  flex: 1;
  flex-direction: row;
  margin-right: auto;
  align-items: center;
  max-height: 60px;
  background-color: red;
  padding: 0px 10px;
`;

const Title = styled.Text`
  margin-right: auto;
  flex-grow: 1;
`;

const IconButton = styled.Button`
  height: 60px;
  width: 60px;
  background-color: ${props => props.bgColor};
`;

export default class Main extends React.Component {
  state = {
    inputValue: "",
    search: false,
    add: false
  };

  toggleAdd = val =>
    this.setState(state => ({ add: typeof val !== "undefined" && !state.add }));
  toggleSearch = val =>
    this.setState(state => ({
      search: typeof val !== "undefined" && !state.search
    }));

  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  onSubmitEditing = func => e => {
    const { inputValue } = this.state;
    // on search
    this.props.onSearch(e);
  };

  render() {
    const { inputValue } = this.state;
    const { children, onAdd, onSearch, title } = this.props;

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Header>
          <Title>{title}</Title>
          {onSearch && (
            <IconButton
              onPress={this.toggleSearch}
              isActive={this.state.search}
              bgColor={this.state.search ? "rgba(0,0,0,0.3)" : "white"}
              title="S"
            />
          )}
          {onAdd && (
            <IconButton
              onPress={this.toggleAdd}
              isActive={this.state.add}
              title="+"
            >
              +
            </IconButton>
          )}
        </Header>
        {this.state.search && (
          <Search
            value={inputValue}
            placeholder={this.props.searchPlaceholder || "Search..."}
            placeholderTextColor="#888"
            multiline={false}
            autoCapitalize="sentences"
            underlineColorAndroid="transparent"
            selectionColor={"white"}
            maxLength={30}
            returnKeyType="done"
            autoCorrect={false}
            blurOnSubmit={true}
            onChangeText={this.newInputValue}
            onSubmitEditing={this.onSubmitEditing}
          />
        )}
        {children}
      </Container>
    );
  }
}
