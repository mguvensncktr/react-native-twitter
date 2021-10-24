import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessageScreen from '../screens/MessageScreen';
import HomeScreen from '../screens/HomeScreen'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfilePicture from '../components/ProfilePicture';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../../queries';

const Tab = createBottomTabNavigator();


function BottomTab() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })
            if (!userInfo) {
                return;
            }
            try {
                const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
                if (userData) {
                    setUser(userData.data.getUser);
                }
            } catch (e) {
                console.log(e)
            }

        }
        fetchUser();

    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerTitle: () => <Ionicons name="logo-twitter" size={32} color={"#1DA1F2"} />,
                headerRight: () => <MaterialCommunityIcons name="star-four-points-outline" size={32} color={"#1DA1F2"} />,
                headerLeft: () => <ProfilePicture size={32} uri={user?.image} />,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Ionicons name="md-home" size={32} color={"black"} /> }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: () => <Ionicons name="ios-search" size={32} color="black" /> }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{ tabBarIcon: () => <Ionicons name="ios-notifications-outline" size={32} color="black" /> }} />
            <Tab.Screen name="Message" component={MessageScreen} options={{ tabBarIcon: () => <Ionicons name="ios-mail" size={32} color="black" /> }} />
        </Tab.Navigator>

    );
}

export default BottomTab;
