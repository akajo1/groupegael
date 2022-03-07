import React,{useState,useEffect} from 'react'
import { View,Image,  Dimensions,StyleSheet } from 'react-native'
import Style from '../styles'
import {Title} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
const {width,height} = Dimensions.get('screen');
const usersCollection = firestore().collection('communaute');
const messages = await firestore().collection('communaute').get();
export default function Community(props) {
    
    return (
        <View style={[Style.container_fluid,{alignItems:'center',justifyContent:'center'}]}>
            <View style={{...StyleSheet.absoluteFill}}>
                <Image source={require('../assets/bg.png')} />
            </View>
           
        </View>
    )
}
