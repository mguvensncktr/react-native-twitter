import React from 'react'
import { View, Text } from 'react-native'
import ProfilePicture from '../../ProfilePicture';

const LeftContainer = ({ user }) => {
    return (
        <View>
            <ProfilePicture uri={user.image} />
        </View>
    )
}

export default LeftContainer;
