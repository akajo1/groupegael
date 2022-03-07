import React,{useState,useRef} from 'react'
import { View,Text,TouchableOpacity,Platform,Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import RNFetchBlob from 'rn-fetch-blob'
import {connect} from 'react-redux';
const {width,height}= Dimensions.get('screen')
export default function Downloaded(props) {
  const item=props.item;
  const songs = props.songs;
  const theme = props.theme;
    return (
        <View style={{flex:1,marginVertical:2, flexDirection:'row',alignItems:'center',marginHorizontal:20,paddingVertical: 15,borderBottomColor:theme.BorderColor,borderBottomWidth:1}}>
           
            <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontWeight:'bold',paddingHorizontal:5}}>{props.position}.</Text>
            <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('reader',{id: item.id,songs: songs, index: props.index})}>
                <Text style={{fontWeight:'500',color: theme.second_text_color,fontSize:18,width: width/2,paddingHorizontal:10}}>{item.title}</Text>
                
                </TouchableOpacity>
            </View> 
        </View>
    )
}

