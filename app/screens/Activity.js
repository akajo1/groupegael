import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image,Dimensions,ScrollView, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import GetLoading from '../components/GetLoading';
import {allActivities} from '../apis/endpoint.api'
import Styles from '../styles';
import ImageLoad from '../components/ImageLoad';
const {width,height}= Dimensions.get('screen');

export default function Activity(props) {
    const [activities, setactivities] = useState('');
    const getActivities = ()=>{
        allActivities()
        .then((response)=> response.json())
        .then((response)=>{
            if(response.success == 1){
                setactivities(response.msg)
            }
        })
    }
    useEffect(() => {
        getActivities() 
    }, [])
    
    return (
        <ScrollView style={{backgroundColor:'#000'}} contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}>
        <View style={{...StyleSheet.absoluteFill}}>
            <Image source={require('../assets/backlog.png')} />
        </View>
        <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 40, left: 20,zIndex:10}}>
        <Icon name="chevron-left" color="orange" size={32} />
        </TouchableOpacity>
        <Animatable.View  animation="bounceIn" style={{width,justifyContent:'center',alignItems:'center',marginBottom:50,marginTop:20}}>
          <Image source={require('../assets/logo_.png')} resizeMode="cover" style={{width:160, height:80}} />
        </Animatable.View>
        <View style={{paddingHorizontal:10}}>
        <Title style={{color:'orange',fontSize:26,marginBottom:10}}>Nos activités</Title>

        {
            activities !='' 
            ?
            activities.map((item)=><View key={item.id}>
            <Title style={{color:'#fff',fontSize:20, textTransform:'uppercase'}}>{item.titre}</Title>
            {
                item.slogan != null && <Paragraph style={{color:'#eee'}}>{item.slogan}</Paragraph>
            }
            {
                
                item.picture !=null &&  <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width:width- 20,height: height/3,marginVertical:20}} resizeMethod="auto" resizeMode="cover" />


            }
            <Paragraph style={{color:'#fff',fontSize:16,marginVertical:10}}>{item.content}</Paragraph>
        </View>)
            :
            <Text>Aucune activité prevu pour le moment</Text>
        }
        </View>

        </ScrollView>
    )
}
