// packages import
import { View, StyleSheet } from "react-native";

// Components/Types/Utils imports
import AppText from "./../components/AppText";
import AppButton from "./../components/AppButton";
import configurations from "./../config/config";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import ScreenNames from "../navigation/ScreenNames";

// functional component for IntroductionScreen
function IntroductionScreen({ navigation }: any) {
  // Render
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText
          text={configurations.application_name}
          family={FontNames.Mulish_Bold}
          size={50}
        />
        <AppText text={configurations.application_tag_line} size={20} />
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login with Email"
          containerStyle={{ marginBottom: 15 }}
          onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        />
        <AppButton
          title="Login with Google"
          backgroundColor={ColorPallete.googleColor}
          containerStyle={{ marginBottom: 15 }}
        />
        <AppButton
          title="Sign Up"
          backgroundColor={ColorPallete.purple}
          containerStyle={{ marginBottom: 15 }}
          onPress={() => navigation.navigate(ScreenNames.SignUpScreen)}
        />
      </View>
    </View>
  );
}

// Exports
export default IntroductionScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: { paddingLeft: 15, paddingRight: 15 },
});
