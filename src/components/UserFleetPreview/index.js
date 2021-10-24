import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './style';
import ProfilePicture from '../ProfilePicture';


const UserFleetPreview = (props) => {

    const navigation = useNavigation();
    const { username, image, id } = props;

    const onPress = () => {
        navigation.navigate('FleetScreen', { userId: id })
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.image}>
                    <ProfilePicture uri={image} size={70} />
                </View>
                <Text style={styles.username}>{username}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default UserFleetPreview;
