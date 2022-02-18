// packages imports
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Keyboard } from "react-native";
import { useFormikContext } from "formik";

//  local imports
import AppDialog from "./AppDialog";
import AppFormField from "./AppFormField";
import AppHelperText from "./AppHelperText";
import { AppPickerProps } from "../types/ComponentTypes";
import AppPickerItem from "./AppPickerItem";
import ColorPallete from "../utils/ColorPallete";
import Layout from "../constants/Layout";

// constans
const HEIGHT = Layout.ScreenHeight / 2;

// keyExtractor
const keyExtractor = item => item._id.toString();

// function component for AppPicker
function AppPicker(props: AppPickerProps) {
  // Destructuring props
  const { items, pickerTitle, formTitle, other_title, initialValue = null } = props;

  // get last item
  const lastItemIndex = items.length - 1;

  // Formik Context
  const { setFieldValue, errors, touched, setFieldTouched } = useFormikContext();

  // Local State
  const [Visible, SetVisible] = useState(false);
  const [CategoryIndex, SetCategoryIndex] = useState(0);

  useEffect(() => {
    if (initialValue !== null) {
      // find the index of item whose value is equal to initialValue
      const index = items.findIndex(item => item.value === initialValue);
      if (index !== -1) {
        setFieldTouched(formTitle);
        SetCategoryIndex(index);
      }
    }
  }, []);

  // render item
  const renderItem = ({ item, index }) => (
    <AppPickerItem {...item} onPress={() => onSelect(item, index)} />
  );

  // on item select
  const onSelect = async (item: any, index: any) => {
    try {
      if (!touched[formTitle]) setFieldTouched(formTitle);
      if (!touched[other_title]) setFieldTouched(other_title);

      SetCategoryIndex(index);

      if (index === 0) {
        update_fields("", formTitle);
        update_fields("", other_title);
      } else {
        if (index === items.length - 1) {
          update_fields("Other", formTitle);
          update_fields("", other_title);
        } else {
          update_fields(items[index].value, formTitle);
          update_fields("", other_title);
        }
      }

      SetVisible(false);
    } catch (error) {}
  };

  // fucntion to update fields
  const update_fields = async (text: any, fieldName: any) => {
    try {
      if (fieldName) setFieldValue(fieldName, text);
    } catch (error) {}
  };

  const OpenModal = async () => {
    try {
      Keyboard.dismiss();
      SetVisible(true);
    } catch (error) {}
  };

  return (
    <>
      <View style={styles.pickerItemContainer}>
        <AppPickerItem
          {...items[CategoryIndex]}
          onPress={OpenModal}
          style={styles.pickerContainer}
        />
      </View>

      {lastItemIndex !== -1 && lastItemIndex === CategoryIndex ? (
        <AppFormField
          placeholder="Other Category"
          onChangeText={text => setFieldValue(other_title, text)}
          title={other_title}
          controlled
          containerStyle={{ marginTop: 10 }}
        />
      ) : (
        <AppHelperText text={touched[formTitle] ? errors[formTitle] : ""} />
      )}

      <AppDialog visible={Visible} hideDialog={() => SetVisible(false)} title={pickerTitle}>
        <View style={{ height: HEIGHT, width: "100%" }}>
          <FlatList
            data={items}
            keyExtractor={keyExtractor}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
      </AppDialog>
    </>
  );
}

// exports
export default AppPicker;

// styles
const styles = StyleSheet.create({
  pickerItemContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: ColorPallete.darkGrey,
    borderRadius: 5,
    marginTop: 8,
  },
  pickerContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    height: 50,
  },
});
