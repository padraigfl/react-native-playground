// app/components/List.js
import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions, // gets width and height
  TouchableOpacity // like a button, onPress
} from "react-native";
import styled from "styled-components";

const Row = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin: 1px 0px;
`;

const Grow = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
  align-self: center;
  justify-content: space-between;
  padding: 0px 4px;
`;

const imgStyle = `
  display: flex;
  overflow: hidden;
  padding: 4px 8px 4px 0px;
  width: 100%;
  height: 100%;
  background-color: pink;
`;

const Image = styled.ImageBackground`
  ${imgStyle}
  resize-mode: stretch;
`;
const ImagePlacholder = styled.View`
  ${imgStyle}
  display: flex;
  padding: 0;
`;
const CenteredText = styled.Text`
  align-self: center;
  font-size: 24px;
  margin: auto;
`;
const Right = styled.View`
  margin-left: auto;
  text-align: right;
`;

const Heading = styled.Text`
  font-weight: 500;
  font-size: 16px;
  flex-grow: 1;
`;

const TwoLineText = styled.Text`
  max-height: 48px;
  overflow: hidden;
`;

const imageStyle = {
  alignSelf: "center",
  resizeMode: "cover"
};

const { height, width } = Dimensions.get("window");
class Entry extends Component {
  render() {
    const {
      image,
      isLarge,
      useImage,
      onClick,
      context,
      content,
      heading,
      placeholder,
      style
    } = this.props;
    const fullSize = content || isLarge;

    const Comp = onClick ? TouchableOpacity : View;
    const imageSize = fullSize
      ? { height: 60, width: 60 }
      : { height: 40, width: 40 };
    return (
      <Comp onPress={onClick} style={style}>
        <Row>
          {useImage && image && (
            <View style={imageSize}>
              <Image
                source={{
                  uri: image.uri
                }}
                style={imageSize}
              />
            </View>
          )}
          {useImage && !image && (
            <View style={imageSize}>
              <ImagePlacholder style={{ ...imageStyle, imageSize }}>
                <CenteredText>{placeholder}</CenteredText>
              </ImagePlacholder>
            </View>
          )}
          <Grow>
            <Row>
              <Heading style={!content && { fontSize: 24 }}>{heading}</Heading>
              {context && <Right>{context}</Right>}
            </Row>
            {content && (
              <TwoLineText
                numberOfLines={2}
                ellipsis="..."
                trimRight
                basedOn="letters"
              >
                {content}
              </TwoLineText>
            )}
          </Grow>
        </Row>
      </Comp>
    );
  }
}

export default Entry;
