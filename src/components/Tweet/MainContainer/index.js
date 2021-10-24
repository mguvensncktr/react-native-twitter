import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './style';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createLike, deleteLike, deleteTweet } from '../../../../mutations';
import { S3Image } from 'aws-amplify-react-native';

const MainContainer = ({ tweet }) => {

    const [user, setUser] = useState(false);
    const [myLike, setMyLike] = useState(null);
    const [likesCount, setLikesCount] = useState(tweet.likes.items.length);

    const newLike = async () => {
        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }
        try {
            const res = await API.graphql(graphqlOperation(createLike, { input: like }))
            setMyLike(res.data.createLike);
            setLikesCount(likesCount + 1)
        } catch (e) {
            console.log(e)
        }
    }


    const disLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id } }))
            setLikesCount(likesCount - 1);
            setMyLike(null);
        } catch (e) {
            console.log(e)
        }

    }

    const onLike = async () => {
        if (!user) {
            return;
        }
        if (!myLike) {
            await newLike();
        } else {
            await disLike();
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
            const searchLikes = tweet.likes.items.find((like) => like.userID === currentUser.attributes.sub)
            setMyLike(searchLikes);
        }
        fetchUser();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.userContainer}>
                    <Text style={styles.name}>{tweet.user.name}</Text>
                    <Text style={styles.username}>@{tweet.user.username}</Text>
                    <Text style={styles.createdTime}>{moment(tweet.createdAt).fromNow()}</Text>
                </View>
                <Entypo style={styles.icon} name="dots-three-horizontal" size={16} color="gray" />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>{tweet.content} </Text>
                {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image} />}
            </View>
            <View style={styles.footer}>
                <EvilIcons name="comment" size={32} color="grey" />
                <Text>{tweet.numberOfComments} </Text>
                <EvilIcons name="retweet" size={32} color="grey" />
                <Text>{tweet.numberOfRetweets} </Text>
                <TouchableOpacity onPress={onLike} >
                    <AntDesign name={!myLike ? "hearto" : "heart"} size={24} color={!myLike ? "grey" : "red"} />
                </TouchableOpacity>
                <Text>{likesCount} </Text>
                <EvilIcons name="share-google" size={32} color="grey" />
            </View>
        </View>
    )
}

export default MainContainer
