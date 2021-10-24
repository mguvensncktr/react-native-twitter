import React from 'react'
import { View, Text } from 'react-native'
import styles from './style'
import Feed from '../../components/Feed'
import NewTweetButton from '../../components/NewTweetButton'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Feed />
            <NewTweetButton />
        </View>

    )
}

export default HomeScreen
