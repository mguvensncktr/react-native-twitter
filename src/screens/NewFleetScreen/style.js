import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    tweetButton: {
        backgroundColor: '#1DA1F2',
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    tweetText: {
        fontSize: 16,
        color: 'white'
    },
    image: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    bodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        width: 280,
        maxHeight: 300,
    },
    pickImage: {
        color: "grey",
        fontSize: 18
    },
    imagePick: {
        width: 150,
        height: 150

    },
    imageInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 50
    },
    delImage: {
        position: 'absolute',
        right: -100,
        top: -5
    }

})

export default styles;
