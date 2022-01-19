// Packages imports
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

// Local components imports
import ColorPallete from "../utils/ColorPallete";

function TruncatedText({ text, size }: any) {
  // Local States
  const [NumberOfLines, SetNumberOfLines] = useState(5);

  // themes
  const { dark } = useTheme();

  // Render
  return (
    <View style={styles.container}>
      <Text numberOfLines={NumberOfLines} style={{ fontSize: size }}>
        {text}
      </Text>
      <Text
        style={{
          color: dark ? ColorPallete.darkGrey : ColorPallete.black,
        }}
        onPress={() => SetNumberOfLines(NumberOfLines === 5 ? null : 5)}
      >
        {NumberOfLines === 5 ? "Read More" : "Read Less"}
      </Text>
    </View>
  );
}

// Exports
export default TruncatedText;

// Styles
const styles = StyleSheet.create({
  container: {},
});
