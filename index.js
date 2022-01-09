// Packages Imports
import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Local Files/App/Components/Store import
import App from "./App";
import { store, persistor } from "./store/configureStore";

// Headless Check for PushNotifications
function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

// registering the App
AppRegistry.registerComponent("main", () => HeadlessCheck);
