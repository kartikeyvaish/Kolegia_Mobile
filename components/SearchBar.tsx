// Packges Imports
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

// Component Props
import ColorPallete from "../utils/ColorPallete";

interface SearchBarProps {
  placeholder?: string;
  onComplete?: () => void;
  onClear?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

// function component for SearchBar
function SearchBar(props: SearchBarProps) {
  // destructuring props
  const { placeholder, onComplete, value, onChangeText } = props;

  // Search query Updation Search
  useEffect(() => {
    // This useEffect makes sure that whenever the user types for something,
    // the search takes place only when the user has stopped typing for a second
    const typeDelayFunction = setTimeout(() => {
      if (typeof onComplete === "function") if (value.length) onComplete();
    }, 1000);

    return () => clearTimeout(typeDelayFunction);
  }, [value]);

  // Render
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        selectionColor={ColorPallete.primary}
        style={styles.SearchBar}
      />
    </View>
  );
}

// Exports
export default SearchBar;

// Styles
const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  SearchBar: {
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    height: 60,
  },
});
