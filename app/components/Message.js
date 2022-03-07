import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
const {width,height} = Dimensions.get('screen');
export default function Message({message,animate,bgcolor='#ffa000',color='#fff'}) {
    return (
        <Animatable.View animation={animate} style={{width: width-40, marginHorizontal:20,position:'absolute',top:30,backgroundColor:bgcolor,borderRadius:30,padding:10}}>
            <Text style={{color,fontWeight:'700',textAlign:'center'}}>{message}</Text>
        </Animatable.View>
    )
}
