import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity, Dimensions} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import { ScrollView } from 'react-native-gesture-handler'
const {width,height} = Dimensions.get('screen');

export default function TRain(props) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const _onReady= (event)=> {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    return (
        <View style={[Style.container_fluid]}>
                <Image source={require('../assets/bg-8.jpg')} style={{width: width, height: height / 3 }} />
                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                <Text style={{color:'#ccc',textAlign:'center'}}>Sujet</Text>
                <Title style={{color:'white',textAlign:'center'}}>Adorons l'Eternel</Title>
                </View>
                
        <ScrollView>
        
       <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: 'orange', fontSize:16,marginTop: 10}}>Texte training module 1</Title>
       <Text style={{color:'white', fontSize:16, paddingHorizontal: 5,paddingVertical:5, textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
       <Text style={{color:'white', fontSize:16, paddingHorizontal: 5,paddingVertical:10, textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
       </View>
        
        </ScrollView>
       </View>
    )
}
