import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#152d48',

    },
    text: {
        color: '#eaeaea',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    userHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        padding: 10
    },
    close: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 100
    },
    userContainer: {
        marginLeft: 10
    },
    username: {
        color: '#efefef',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5
    },
    username2: {
        color: '#efefef',
        fontSize: 16,
    },
    time: {
        color: '#efefef',
        fontSize: 12,
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        top: 0,
        flexDirection: 'row',
        position: 'absolute'
    }
})

export default styles;
