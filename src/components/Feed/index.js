import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Tweet from '../Tweet';
import { API, graphqlOperation } from 'aws-amplify';
import { listTweets } from '../../../queries';
import UserFleetList from '../UserFleetList'

const Feed = () => {

    const [tweets, setTweets] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTweets = async () => {
        setLoading(true);
        try {
            const tweetsData = await API.graphql(graphqlOperation(listTweets))
            setTweets(tweetsData.data.listTweets.items)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        fetchTweets();
    }, [])

    return (
        <View>
            <FlatList
                data={tweets}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={UserFleetList}
                renderItem={({ item }) => <Tweet tweet={item} />}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={fetchTweets}
            />
        </View>
    )
}

export default Feed;
