import ScreenNames from "../navigation/ScreenNames";

export const ExploreCards = [
    {
        _id: "1",
        uri: "asset:/images/BuySellItem.png",
        heading: "Sell Items",
        description:
            "Users posts some stuff for other users to buy them. Have a look.",
        navigate: ScreenNames.BuySellFeedScreen
    },
    {
        _id: "2",
        uri: "asset:/images/LostFoundItem.png",
        heading: "Lost Items",
        description: "Users posts lost items for other users to find them.",
        navigate: ScreenNames.LostItemsFeedScreen
    },
    {
        _id: "3",
        uri: "asset:/images/RequirementsFeed.png",
        heading: "Requirements",
        description:
            "See and explore what other people need. You might have that item and you can help them.",
        navigate: ScreenNames.RequirementsFeedScreen
    },
];