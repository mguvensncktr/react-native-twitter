import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform, Image } from 'react-native'
import styles from './style'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../components/ProfilePicture';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import { createFleet } from '../../../mutations'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const NewFleetScreen = () => {

    const [text, setText] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const navigation = useNavigation();

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Galerinize erişmek için izin verin')
            }
        }
    }

    const deleteImage = () => {
        setImageUrl('');
    }

    const uploadImage = async () => {
        try {
            const response = await fetch(imageUrl);

            const blob = await response.blob();
            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1];
            const key = `${uuidv4()}.${extension}`
            await Storage.put(key, blob)
            return key;
        } catch (e) {
            console.log(e)
        }
        return '';
    }

    useEffect(() => {
        getPermissionAsync();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImageUrl(result.uri);
        }
    };

    const onPostFleet = async () => {
        let image;
        if (!!imageUrl) {
            image = await uploadImage();
        }
        try {
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

            const newFleet = {
                type: image ? 'IMAGE' : 'TEXT',
                text,
                image,
                userID: currentUser.attributes.sub
            }
            await API.graphql(graphqlOperation(createFleet, { input: newFleet }))
            navigation.goBack();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Feather onPress={navigation.goBack} name="x" size={35} color="#1DA1F2" />
                <TouchableOpacity
                    style={styles.tweetButton}
                    activeOpacity={0.5}
                    onPress={onPostFleet}
                >
                    <Text style={styles.tweetText}>Fleet Paylaş</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.image}>
                    <ProfilePicture uri={'https://nobleorderbrewing.com/img/lists/97/boruto-5-ways-sasuke-losing-his-rinnegan-makes-sense.jpg'} />
                </View>
                <View style={styles.input}>
                    <View style={styles.text}>
                        <TextInput
                            value={text}
                            onChangeText={(value) => setText(value)}
                            numberOfLines={3}
                            multiline={true}
                            placeholder={"Fleet Paylaş"} />
                    </View>
                </View>
            </View>
            <View style={styles.imageInput}>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.pickImage}>Fotoğraf Seç</Text>
                </TouchableOpacity>
                <Image source={{ uri: imageUrl }} style={styles.imagePick} />
                <TouchableOpacity style={styles.delImage}>
                    <Feather onPress={deleteImage} name="x" size={35} color="#1DA1F2" />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default NewFleetScreen
