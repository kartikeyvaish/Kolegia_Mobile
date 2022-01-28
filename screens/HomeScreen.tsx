// Packages imports
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FadeInLeft } from "react-native-reanimated";

// Components/Types/Utils imports
import AnimatedView from "../components/AnimatedView";
import AppBadge from "../components/AppBadge";
import AppIcon from "../components/AppIcon";
import AppRow from "../components/AppRow";
import AppScrollContainer from "./../components/AppScrollContainer";
import AppText from "../components/AppText";
import ColorPallete from "../utils/ColorPallete";
import DashboardMenuCard from "../components/DashboardMenuCard";
import { ExploreCards } from "./../schema/HomeScreenData";
import IconNames from "../constants/IconNames";
import FontNames from "../constants/FontNames";
import GlobalContext from "./../contexts/GlobalContext";
import ScreenNames from "../navigation/ScreenNames";

// functional component for Dashboard Screen
function HomeScreen({ navigation }) {
  // Get the user
  const { User, UnreadMessagesCount } = useContext(GlobalContext);

  // Render
  return (
    <AppScrollContainer style={styles.container}>
      <AppRow style={styles.HeaderContainer}>
        <AppText text="Explore" family={FontNames.Inter_Bold} size={30} />

        <View style={styles.HeaderIcons}>
          <View>
            <AppIcon
              family={IconNames.MaterialIcons}
              name={"message"}
              size={30}
              onPress={() =>
                navigation.navigate(
                  User
                    ? ScreenNames.ChatsScreen
                    : ScreenNames.IntroductionScreen
                )
              }
            />

            <AppBadge
              badgeCount={UnreadMessagesCount}
              style={styles.Badge}
              badgeContainerStyle={styles.badgeContainerStyle}
              onPress={() =>
                navigation.navigate(
                  User
                    ? ScreenNames.ChatsScreen
                    : ScreenNames.IntroductionScreen
                )
              }
            />
          </View>

          {User ? null : (
            <AppIcon
              family={IconNames.Feather}
              name="settings"
              size={27}
              marginLeft={25}
              onPress={() => navigation.navigate(ScreenNames.SettingsScreen)}
            />
          )}
        </View>
      </AppRow>

      {ExploreCards.map((card) => (
        <AnimatedView entering={FadeInLeft} key={card._id}>
          <DashboardMenuCard
            {...card}
            onPress={() =>
              navigation.navigate(
                !User ? ScreenNames.IntroductionScreen : card.navigate
              )
            }
          />
        </AnimatedView>
      ))}
    </AppScrollContainer>
  );
}

// Exports
export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  HeaderIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Badge: {
    fontFamily: FontNames.Inter_Bold,
    color: ColorPallete.white,
    backgroundColor: ColorPallete.red,
  },
  badgeContainerStyle: {
    position: "absolute",
    top: -10,
    right: -10,
  },
});
