import React from 'react'
import { View, Text,Image, Dimensions,TouchableOpacity} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import { ScrollView } from 'react-native-gesture-handler'
import ItemDownload from '../components/ItemDownload'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ceil } from 'react-native-reanimated'
const {width,height} = Dimensions.get('screen');


export default function Livre(props) {
  
    return (
        <View style={[Style.container_fluid]}>
        
        <Image source={{uri:'http://designsbyrachelle.com/portfolio/wp-content/gallery/portfolio-ebook-covers/ggt_ebook_cvrweb1200.jpg'}}  style={{width: width/2, height: height / 3,borderRadius:10,marginTop:'10%',marginLeft:width/4}} resizeMode="cover" />

                <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 20, left: 20}}>
            <Icon name="arrow-left" color="white" size={32} />
            </TouchableOpacity>
                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                
                <Title style={{color:'white',marginBottom:0,textAlign:'center'}}>Mon titre</Title>
                <Text style={{color:'#ccc',fontSize:10,marginTop:0,textAlign:'center',color:'#ff8f00'}}>Auteur}</Text>
              
                </View>
                 
        <ScrollView style={{marginVertical: 10}}>
        
        <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: 'orange', fontSize:16,marginTop: 10}}>Description</Title>
       <Text style={{color:'white', fontSize:16, paddingHorizontal: 5,paddingVertical:5, textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
       <TouchableOpacity onPress={()=>{}}>
               <Title style={{backgroundColor:'orange',paddingVertical:10, textAlign:'center', fontSize:16, marginVertical:10, color:'white'}}>Lire</Title>
           </TouchableOpacity>
       </View>
       
        </ScrollView>
       </View>
    )
}
