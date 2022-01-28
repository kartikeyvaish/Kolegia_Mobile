import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import { useTheme } from "@react-navigation/native";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

function Digit({ digit }: { digit?: string }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.digit,
        { borderColor: colors.text, borderWidth: 1, borderRadius: 5 },
      ]}
    >
      <Animated.Text
        key={digit}
        entering={SlideInDown}
        exiting={SlideInUp}
        style={{
          color: colors.text,
          fontFamily: FontNames.Sofia_Pro_Bold,
          fontSize: 25,
        }}
      >
        {digit}
      </Animated.Text>
    </View>
  );
}

interface OTPFieldsProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
  OTP?: string;
}

function OTPFields({ count = 6, containerStyle, OTP = "" }: OTPFieldsProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from(Array(count).keys()).map((i) => (
        <Digit key={i} digit={OTP[i]} />
      ))}
    </View>
  );
}

export default OTPFields;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  digit: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
