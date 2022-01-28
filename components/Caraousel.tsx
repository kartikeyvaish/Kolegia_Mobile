// Packages imports
import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LayoutConstants from "../constants/Layout";

// Local components imports
import ColorPallete from "../utils/ColorPallete";
import CaraouselItem from "./CaraouselItem";

// types/interface imports
interface CaraouselProps {
  files: any;
}

// function component for Caraousel
function Caraousel({ files = [] }: CaraouselProps) {
  const [ActiveSlide, SetActiveSlide] = useState(0);

  // OnPress handler for each item
  const onItemPress = useCallback(
    (item) => () => {
      // handle item press
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Carousel
          data={files}
          renderItem={({ item }) => (
            <CaraouselItem uri={item.uri} onPress={onItemPress(item)} />
          )}
          autoplay={false}
          autoplayInterval={3000}
          sliderWidth={LayoutConstants.ScreenWidth}
          itemWidth={LayoutConstants.ScreenWidth}
          loop={false}
          onSnapToItem={(index) => SetActiveSlide(index)}
        />
      </View>
      <Pagination
        dotsLength={files.length}
        activeDotIndex={ActiveSlide}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.9}
        inactiveDotScale={0.5}
      />
    </View>
  );
}

// Exports
export default Caraousel;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotStyle: {
    backgroundColor: ColorPallete.orange,
  },
  inactiveDotStyle: { backgroundColor: ColorPallete.darkGrey },
  image: { width: "100%", height: "100%" },
  videoContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: ColorPallete.dodgerblue,
    justifyContent: "center",
    alignItems: "center",
  },
});
