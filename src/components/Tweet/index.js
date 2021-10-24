import React from 'react'
import { View, Text } from 'react-native'
import LeftContainer from './LeftContainer'
import MainContainer from './MainContainer'
import styles from './style'

const Tweet = ({ tweet }) => {
    return (
        <View style={styles.container}>
            <LeftContainer user={tweet.user} />
            <MainContainer tweet={tweet} />
        </View>
    )
}

export default Tweet;
