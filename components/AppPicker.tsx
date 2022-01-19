import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import ColorPallete from "../utils/ColorPallete";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import AppDialog from "./AppDialog";
import AppHelperText from "./AppHelperText";

function Picker({
  selectedValue,
  onValueChange,
  data,
  disabled,
  style,
  error,
  visible,
  errorVisible,
  notShownKey,
  showModal,
  hideModal,
}) {
  return (
    <>
      <TouchableWithoutFeedback onPress={disabled ? null : showModal}>
        <View
          style={{
            borderColor: errorVisible
              ? ColorPallete.red
              : disabled === false
              ? "black"
              : "grey",
            opacity: disabled ? 0.5 : 1,
            marginBottom: errorVisible === true ? 2 : 0,
            ...styles.container,
            ...style,
          }}
        >
          {selectedValue.Name ? (
            <AppIcon
              name={selectedValue.Name}
              ={selectedValue.IconName}
              color={selectedValue.color}
              marginLeft={15}
            />
          ) : null}
          <AppText
            text={selectedValue.name}
            size={15}
            family="Inter"
            marginLeft={15}
            color={disabled === false ? "black" : "grey"}
          />
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}>
            <AppIcon
              Name="AntDesign"
              IconName="caretdown"
              color={disabled ? "lightgrey" : "grey"}
              size={15}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <AppDialog visible={visible} title={data[0].name} hideDialog={hideModal}>
        <ScrollView indicatorStyle="black">
          {data.map((c) =>
            c.key !== notShownKey ? (
              <TouchableRipple
                onPress={() => onValueChange(c)}
                rippleColor={ColorPallete.grey}
                key={c.key}
              >
                <View style={styles.purposeItem}>
                  {c.Name ? (
                    <AppIcon
                      Name={c.Name}
                      IconName={c.IconName}
                      color={c.color}
                      marginLeft={15}
                    />
                  ) : null}
                  <AppText
                    text={c.name}
                    size={15}
                    family="Inter"
                    marginLeft={15}
                  />
                </View>
              </TouchableRipple>
            ) : null
          )}
        </ScrollView>
      </AppDialog>

      {errorVisible === true ? (
        <AppHelperText text={error} helperTextPadding="none" />
      ) : null}
    </>
  );
}

export default Picker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    height: 55,
    alignItems: "center",
    flexDirection: "row",
  },
  purposeItem: {
    width: "100%",
    padding: 15,
    paddingLeft: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  contentStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: Dimensions.get("window").height - 120,
  },
});
