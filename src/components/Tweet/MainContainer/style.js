import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        flex: 1,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        lineHeight: 18
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 50,
        alignItems: 'center'
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        marginRight: 5,
        fontWeight: 'bold',
    },
    username: {
        marginRight: 5,
        color: 'gray',
    },
    createdTime: {
        marginRight: 5,
        color: 'gray'
    },
})

export default styles;
