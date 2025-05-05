import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import Planet from "./Planet";
import Films from "./Films";
import Spaceships from "./Spaceships";
import PlanetDetail from "./PlanetDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainTabsOrDrawer() {
  return Platform.OS === "ios" ? (
    <Tab.Navigator>
      <Tab.Screen name="Planet" component={Planet} />
      <Tab.Screen name="Films" component={Films} />
      <Tab.Screen name="Spaceships" component={Spaceships} />
    </Tab.Navigator>
  ) : (
    <Drawer.Navigator>
      <Drawer.Screen name="Planet" component={Planet} />
      <Drawer.Screen name="Films" component={Films} />
      <Drawer.Screen name="Spaceships" component={Spaceships} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabsOrDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PlanetDetail" component={PlanetDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
