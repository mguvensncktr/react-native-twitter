import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from "./BottomTabNavigation.routes";
import NewTweetScreen from "../screens/NewTweetScreen";
import FleetScreen from "../screens/FleetScreen";
import NewFleetScreen from "../screens/NewFleetScreen";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeStack"
                component={BottomTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NewTweetScreen"
                component={NewTweetScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name="FleetScreen"
                component={FleetScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name="NewFleetScreen"
                component={NewFleetScreen}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    )

}

export default Router;