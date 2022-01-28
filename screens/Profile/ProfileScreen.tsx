// Packages Imports
import { useContext, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";

// Local Files Imports
import AppIcon from "../../components/AppIcon";
import AppImage from "../../components/AppImage";
import AppRow from "../../components/AppRow";
import AppText from "../../components/AppText";
import AuthAPI from "./../../api/AuthAPI";
import ColorPallete from "../../utils/ColorPallete";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../contexts/GlobalContext";
import IconNames from "../../constants/IconNames";
import MenuCard from "../../components/MenuCard";
import ScreenNames from "../../navigation/ScreenNames";
import { version } from "../../package.json";
import { useDispatch } from "react-redux";
import GlobalActionCreators from "../../store/global/actions";

// Functional Component for ProfileScreen
function ProfileScreen({ navigation }: any) {
  // Contexts
  const { User, setText, setVisible } = useContext(GlobalContext);

  // Dispathcer
  const dispatch = useDispatch();

  // Logout API
  const Logout_API = async () => {
    try {
      setVisible(true);
      setText("Logging out...");
      setVisible(true);
      await AuthAPI.Logout(User.auth_token);
      dispatch(GlobalActionCreators.Reset());
      setVisible(false);
      navigation.jumpTo(ScreenNames.HomeTabScreen);
    } catch (error) {}
  };

  // memo for the Header Bar
  const HeaderBar = useMemo(
    () => (
      <AppRow justifyContent="space-between" alignItems="center">
        <AppText
          text="Profile"
          family={FontNames.Sofia_Pro_Bold}
          size={30}
          marginLeft={15}
        />
        <AppIcon
          family={IconNames.Feather}
          name="settings"
          size={27}
          marginRight={15}
          onPress={() => navigation.navigate(ScreenNames.SettingsScreen)}
        />
      </AppRow>
    ),
    [navigation]
  );

  // render
  return (
    <View style={styles.container}>
      {HeaderBar}

      {User ? (
        <>
          <Pressable style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <AppImage
                uri={User?.profile_picture}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                showBorder={false}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ marginLeft: 15 }}>
                <AppText
                  text={User?.name}
                  size={20}
                  family={FontNames.Inter_Bold}
                />
                <AppText text={User?.email} size={15} />

                <AppText
                  text="Edit Profile"
                  textProps={{
                    style: styles.editProfileText,
                  }}
                  onPress={() =>
                    navigation.navigate(ScreenNames.EditProfileScreen)
                  }
                />
              </View>
            </View>
          </Pressable>

          <MenuCard
            name="My Buy/Sell Items"
            prefixIconProps={{
              family: IconNames.Entypo,
              name: "shop",
            }}
            onPress={() =>
              navigation.navigate(ScreenNames.MyBuySellItemsScreen)
            }
          />

          <MenuCard
            name="My Lost Items"
            prefixIconProps={{
              family: IconNames.MaterialCommunityIcons,
              name: "briefcase-search",
            }}
            onPress={() =>
              navigation.navigate(ScreenNames.MyLostFoundItemsScreen)
            }
          />

          <MenuCard
            name="My Requirements"
            prefixIconProps={{
              family: IconNames.FontAwesome,
              name: "list",
            }}
            onPress={() =>
              navigation.navigate(ScreenNames.MyRequirementsScreen)
            }
          />

          <MenuCard
            name="Logout"
            prefixIconProps={{
              family: IconNames.AntDesign,
              name: "logout",
            }}
            onPress={Logout_API}
            color={ColorPallete.red}
          />
        </>
      ) : null}
      <View style={styles.versionContainer}>
        <AppText
          text={`v${version}`}
          size={20}
          family={FontNames.Inter_Regular}
        />
      </View>
    </View>
  );
}

// Exports
export default ProfileScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorPallete.grey,
    borderWidth: 2,
    borderRadius: 10,
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: ColorPallete.primary,
    borderWidth: 1,
  },
  editProfileText: {
    textDecorationLine: "underline",
    fontSize: 16,
    color: ColorPallete.primary,
    marginTop: 15,
    fontFamily: FontNames.Mulish_Bold,
  },
  versionContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
