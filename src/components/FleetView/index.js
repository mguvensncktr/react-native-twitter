import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './style';
import ProfilePicture from '../ProfilePicture'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const FleetView = (props) => {

    const onPress = () => {
        navigation.goBack();
    }
    const navigation = useNavigation();
    const { user, fleet, goNextFleet, goPrevFleet } = props;

    return (
        <View style={styles.container}>
            {fleet.image && <Image source={{ uri: fleet.image }} style={styles.image} />}
            <Text style={styles.text}>{fleet.text}</Text>
            <View style={styles.userHeaderContainer}>
                <ProfilePicture uri={user.image} size={60} />
                <View style={styles.userContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.username2}>@{user.username}<Text style={styles.time}> {moment(fleet.createdAt).fromNow()}</Text></Text>
                </View>
                <TouchableOpacity style={styles.close} onPress={onPress} >
                    <AntDesign name="close" size={26} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => goPrevFleet()} />
                <TouchableOpacity style={{ flex: 1 }} onPress={() => goNextFleet()} />

            </View>
        </View>
    )
}

export default FleetView
