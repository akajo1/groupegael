import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


const Style = StyleSheet.create({
    container_fluid: {
        flex: 1,
        width: Dimensions.get('screen').width,
        backgroundColor: 'black',

        color: 'white'
    },
    titre: {
        marginBottom: 80,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: '#212121a2',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        fontSize: 16,
        width: Dimensions.get('screen').width - 40,
        fontFamily: 'GOTHIC',
        borderRadius: 30,
        borderColor: '#aaa',
        borderWidth: 1
    },
    btnDefault: {
        width: Dimensions.get('screen').width - 40,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        color: 'white',
        backgroundColor: '#929fba',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
    },
    textRight: {
        color: 'white',
        textAlign: 'right',
        fontSize: 20,
        marginHorizontal: 40,
        marginTop: 10
    },
    leftBar: {
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative'
    },
    textRotate: {

        transform: [{ rotate: '-90deg' }, { translateY: -135 }, { translateX: 80 }],
        fontSize: 80,
        width: 350,
        color: 'rgba(252,252,255,0.18)',
        fontWeight: 'bold',
        fontFamily: 'GOTHIC'


    },
    rightPart: {
        flex: 1,
        paddingTop: 50,
        color: 'white',


    },
    menu: {
        flexDirection: 'row',
    },
    menuActive: {
        color: '#ff8f00',
        fontSize: 24,
        marginLeft: 30,
        fontWeight: 'bold',


    },
    menuItem: {
        color: 'rgba(252,252,255,0.18)',
        fontSize: 24,
        marginLeft: 30,
        fontWeight: 'bold',


    },
    albumCover: {
        width: Dimensions.get('screen').width / 2,
        backgroundColor: 'orange',
        marginRight: 10,
        height: Dimensions.get('screen').height / 4
    }
});
export default Style