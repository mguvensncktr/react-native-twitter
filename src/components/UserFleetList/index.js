import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from './style';
import UserFleetPreview from '../UserFleetPreview';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from './queries';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';



const UserFleetList = () => {

    const navigation = useNavigation();
    const [users, setUsers] = useState();

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
    }, [])

    const renderAddButton = () => {
        return (
            <TouchableOpacity style={styles.plus} onPress={() => navigation.navigate('NewFleetScreen')}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <UserFleetPreview image={item.image} username={item.username} id={item.id} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => renderAddButton()}
            />
        </View>
    )
}

export default UserFleetList;
