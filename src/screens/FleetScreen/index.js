import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import FleetView from '../../components/FleetView';
import { API, graphqlOperation } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { listUsers } from './queries';


const FleetScreen = () => {

    const route = useRoute();
    const { userId } = route.params;
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [fleetIndex, setFleetIndex] = useState(0);
    const [fleet, setFleet] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await API.graphql(graphqlOperation(listUsers));
                setUsers(data.data.listUsers.items)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (!users || users.length === 0) {
            return;
        }
        setUser(users.find(u => u.id === userId))
        setFleetIndex(0);
    }, [users])


    useEffect(() => {
        if (!user) {
            return;
        }
        let userIndex = -1;
        for (let i = 0; i < users?.length; i++) {
            if (users[i].id === user.id) {
                userIndex = i;
                break;
            }
        }
        if (fleetIndex >= user?.fleets.items.length) {
            if (users.length > userIndex + 1) {
                setUser(users[userIndex + 1]);
                setFleetIndex(0);
            } else {
                setFleetIndex(user?.fleets.items.length);
            }
        }
        else if (fleetIndex < 0) {
            if (userIndex > 0) {
                setUser(users[userIndex - 1]);
                setFleetIndex(users[userIndex - 1].fleets.items.length - 1);
            } else {
                setFleetIndex(0);
            }
        }
        else {
            setFleet(user?.fleets?.items[fleetIndex]);
        }
    }, [fleetIndex])

    const goNextFleet = () => {
        setFleetIndex(fleetIndex + 1);
    }
    const goPrevFleet = () => {
        setFleetIndex(fleetIndex - 1);
    }

    if (fleet === null) {
        return <ActivityIndicator />
    }

    return (
        <FleetView user={user}
            fleet={fleet}
            goNextFleet={goNextFleet}
            goPrevFleet={goPrevFleet}
        />
    )
}

export default FleetScreen
