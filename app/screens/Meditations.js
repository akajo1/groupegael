import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import TopNavNext from '../components/TopNavNext';
import * as api from '../apis/endpoint.api';
import Style from '../styles'
import ImageLoad from '../components/ImageLoad';
import * as Animatable from 'react-native-animatable'
import now from '../components/moment'
const {width,height}= Dimensions.get('screen')
const Meditations = (props) => {
   const theme=props.theme
   const [medit, setmedit] = useState('');
   const [loadingM, setLoadingM] = useState(true);
   
   const getAllMeditation = ()=>{
  
   api.Meditations()
    .then((response)=> response.json())
    .then((response)=>{
        setLoadingM(false)
        if(response.success==1){
            setmedit(response.msg)
        }else{
            setmedit('')
        }
    })
}
useEffect(() => {
    getAllMeditation()
   
}, [])

    return (
        <SafeAreaView style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
            <TopNavNext {...props} texte="Meditations"/>
            <ScrollView contentContainerStyle={{flex:1,width,alignItems:'center',paddingVertical:20}}>
            {medit !='' && medit.map((item)=>  <TouchableOpacity onPress={()=> props.navigation.navigate('meditation',{item:item})}>
            <Animatable.View animation="fadeInRight" style={{width:width-20,marginBottom:30}}>
            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width-20,height: height/4.2,borderRadius:5}} resizeMode='cover' />

        <Text style={{color:theme.second_text_color,fontFamily:'GOTHIC', fontWeight:'bold', fontSize:16, marginTop: 10 ,width: width-20}}>{item.titre.substr(0,40)}</Text>
        <Text style={{color:theme.second_text_color}}>il y a {now(item.updated_at).fromNow(now.locale())}</Text>
        </Animatable.View>
       </TouchableOpacity>)}
            </ScrollView>
        </SafeAreaView>
    )
}



const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Meditations);

