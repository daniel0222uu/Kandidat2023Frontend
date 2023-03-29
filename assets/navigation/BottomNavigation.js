import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer} from "@react-navigation/native";
import SwipeScreen from "../screens/SwipeScreen";
import LikeScreen from "../screens/LikeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();


const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Swipe" component={SwipeScreen} />
                <Tab.Screen name="Like" component={LikeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;