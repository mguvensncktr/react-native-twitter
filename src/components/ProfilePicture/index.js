import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style'


const ProfilePicture = ({ uri, size = 60 }) => {
    return (
        <View>
            <Image
                source={{ uri: uri }}
                style={[styles.image, { width: size, height: size }]}
            />
        </View>
    )
}

export default ProfilePicture
