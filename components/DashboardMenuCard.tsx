import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppRow from "./AppRow";
import FontNames from "../constants/FontNames";
import AppText from "./AppText";
import AppButton from "./AppButton";
import ColorPallete from "../utils/ColorPallete";
import { useTheme } from "@react-navigation/native";

function DashboardMenuCard({ uri, heading, description }: any) {
  const { colors } = useTheme();

  return (
    <AppRow style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: uri }} style={{ width: 100, height: 100 }} />
      <View style={{ flex: 1, padding: 10, paddingLeft: 30 }}>
        <AppText text={heading} family={FontNames.Mulish_Bold} size={25} />
        <AppText
          text={description}
          family={FontNames.Inter_Regular}
          size={15}
        />
      </View>
    </AppRow>
  );
}

export default DashboardMenuCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: ColorPallete.grey,
  },
});
