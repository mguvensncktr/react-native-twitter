import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './style'
import { Entypo } from '@expo/vector-icons';

const NewTweetButton = () => {

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('NewTweetScreen')
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Entypo name="feather" size={40} color="white" />
        </TouchableOpacity>
    )
}

export default NewTweetButton;
