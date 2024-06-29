import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "./src/screens/IntroScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AddChecklistScreen from "./src/screens/AddChecklistScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [userName, setUserName] = useState("");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="IntroScreen">
          {(props) => (
            <IntroScreen
              {...props}
              userName={userName}
              setUserName={setUserName}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AddChecklistScreen"
          component={AddChecklistScreen}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
