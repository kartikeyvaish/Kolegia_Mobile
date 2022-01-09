// Packages imports
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import DashboardMenuCard from "../components/DashboardMenuCard";
import FontNames from "../constants/FontNames";

// Components/Types/Utils imports
import AppScrollContainer from "./../components/AppScrollContainer";

const Cards = [
  {
    _id: "1",
    uri: "asset:/images/BuySellItem.png",
    heading: "Buy Sell Feed",
    description:
      "Users posts some stuff for other users to buy them. Have a look.",
  },
  {
    _id: "2",
    uri: "asset:/images/LostFoundItem.png",
    heading: "Lost & Found Feed",
    description: "Users posts lost items for other users to find them.",
  },
  {
    _id: "3",
    uri: "asset:/images/MyTicketsItem.png",
    heading: "Tickets",
    description: "Explore your tickets, responses and raised hands etc.",
  },
  {
    _id: "4",
    uri: "asset:/images/MyTicketsItem.png",
    heading: "Tickets",
    description: "Explore your tickets, responses and raised hands etc.",
  },
  {
    _id: "5",
    uri: "asset:/images/MyTicketsItem.png",
    heading: "Tickets",
    description: "Explore your tickets, responses and raised hands etc.",
  },
];

// functional component for Dashboard Screen
function DashBoardScreen(props) {
  return (
    <AppScrollContainer style={styles.container}>
      <AppText
        text="Explore"
        family={FontNames.Inter_Bold}
        size={30}
        marginLeft={15}
        marginTop={10}
      />

      {Cards.map((card) => (
        <DashboardMenuCard key={card._id} {...card} />
      ))}
    </AppScrollContainer>
  );
}

// Exports
export default DashBoardScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
