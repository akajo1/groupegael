import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import ImageLoad from './ImageLoad'
import * as Animatable from 'react-native-animatable';

const {width,height}=Dimensions.get('screen')
export default function CoverList({image='http://i.huffpost.com/gen/975495/thumbs/o-LL-COOL-J-ESSENCE-MAGAZINE-COVER-facebook.jpg'}) {
    return (
        <View style={{width, alignItems:'center'}}>
            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri: image}} style={{width: width/1.2,height: height/2.4,shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5, borderRadius:20,marginTop:20}} resizeMode='cover' />

        </View>
    )
}
