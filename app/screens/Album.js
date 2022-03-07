import React from 'react'
import { View, Text,Image, Dimensions,TouchableOpacity} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import { ScrollView } from 'react-native-gesture-handler'
import ItemDownload from '../components/ItemDownload'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';

export default function Album(props) {
   const album= props.route.params.item;
   const chansons=album.chants;
    return (
        <View style={[Style.container_fluid]}>
        
                <Image source={{uri:'http://designsbyrachelle.com/portfolio/wp-content/gallery/portfolio-ebook-covers/ggt_ebook_cvrweb1200.jpg'}}  style={{width: width, height: height / 3,borderBottomRightRadius:50,borderBottomLeftRadius:50 }} resizeMode="cover" />
                <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 20, left: 20}}>
            <Icon name="arrow-left" color="white" size={32} />
            </TouchableOpacity>
                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                
                <Title style={{color:'white',marginBottom:0,textAlign:'center'}}>{album.album_title}</Title>
                <Text style={{color:'#ccc',fontSize:10,marginTop:0,textAlign:'center',color:'#ff8f00'}}>{album.author}</Text>
              
                </View>
                 
        <ScrollView style={{marginVertical: 10}}>
        
     <View style={{flex:1}}>
     {
         chansons.length > 0 ? chansons.map((item,index)=>  <ItemDownload key={item.id} item={item} position={index+1}  {...props} album={album}/> ) : null
     }
    
      
        
     </View>
        </ScrollView>
       </View>
    )
}
