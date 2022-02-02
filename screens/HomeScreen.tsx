// Packages imports
import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FadeInLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";

// Components/Types/Utils imports
import AnimatedView from "../components/AnimatedView";
import AppBadge from "../components/AppBadge";
import AppIcon from "../components/AppIcon";
import AppRow from "../components/AppRow";
import AppScrollContainer from "./../components/AppScrollContainer";
import AppText from "../components/AppText";
import AuthAPI from "../api/AuthAPI";
import ColorPallete from "../utils/ColorPallete";
import DashboardMenuCard from "../components/DashboardMenuCard";
import { ExploreCards } from "./../schema/HomeScreenData";
import GlobalActionCreators from "../store/global/actions";
import GlobalContext from "./../contexts/GlobalContext";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import ScreenNames from "../navigation/ScreenNames";
import StatsCard from "../components/StatsCard";

// functional component for Dashboard Screen
function HomeScreen({ navigation }) {
  // Get the constants
  const {
    User,
    UnreadMessagesCount,
    LostItemsCount,
    FoundItemsCount,
    UsersCount,
  } = useContext(GlobalContext);

  const dispatch = useDispatch();

  useEffect(() => {
    GetStats();
  }, [User]);

  const GetStats = async () => {
    try {
      if (User) {
        const apiResponse = await AuthAPI.GetDashboardStats(User?.auth_token);

        if (apiResponse.ok) {
          const statsData = apiResponse.data?.stats;

          if (statsData) {
            let payload = {
              LostItemsCount: statsData.lost_items_count,
              FoundItemsCount: statsData.found_items_count,
              UsersCount: statsData.users_count,
              RaisedHandsCount: statsData.raised_hands_count,
              UnreadMessagesCount: statsData.unread_messages_count,
            };

            dispatch(GlobalActionCreators.UpdateCounts(payload));
          }
        }
      }
    } catch (error) {}
  };

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

      {User ? (
        <View style={styles.statsContainer}>
          <StatsCard
            count={LostItemsCount}
            title={"Lost Items"}
            color={ColorPallete.red}
          />

          <StatsCard
            count={FoundItemsCount}
            title={"Found Items"}
            color={ColorPallete.green}
          />

          <StatsCard
            count={UsersCount}
            title={"Users Count"}
            color={ColorPallete.primary}
          />
        </View>
      ) : null}

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
  statsContainer: {
    width: "100%",
    flexDirection: "row",
  },
});
