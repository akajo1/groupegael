import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import TopNavNext from '../components/TopNavNext';
import * as api from '../apis/endpoint.api';
import Style from '../styles'
import { worshipShimmer } from '../apis/matrix';
import ImageLoad from '../components/ImageLoad';
import * as Animatable from 'react-native-animatable'

const {width,height}= Dimensions.get('screen')
const Worships = (props) => {
   const theme=props.theme
    const [worship, setworship] = useState('');
    const [loadingM, setLoadingM] = useState(true);
    const getAllWorship = ()=>{
        setLoadingM(true)
       api.Worships()
        .then((response)=> response.json())
        .then((response)=>{
         setLoadingM(false)
            if(response.success==1){
                setworship(response.msg)
            }else{
                setworship('')
            }
        })
    }
    useEffect(() => {
        getAllWorship()
       
    }, [])

    return (
        <SafeAreaView style={[Style.container_fluid,{backgroundColor: theme.bg_global,width}]}>
            <TopNavNext {...props} texte="Adorations"/>
            {
                loadingM ? <>
                {worshipShimmer(theme)}
                {worshipShimmer(theme)}
                {worshipShimmer(theme)}
                </> :
            <ScrollView contentContainerStyle={{flex:1,width,alignItems:'center',paddingVertical:20}}>
            {worship!='' && worship.map((item)=> <TouchableOpacity key={item.id} onPress={()=>props.navigation.navigate('worship',{item: item})}>
            <Animatable.View animation="fadeInRight" style={{width:width-20,marginBottom:20}}>
            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width-20,height: height/4.2,borderRadius:5}} resizeMethod="auto" resizeMode="cover" />
            <Text style={{color: theme.second_text_color,fontFamily:'GOTHIC', fontWeight:'bold', fontSize:16, marginTop: 5}}>{item.titre}</Text>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}  >
            <Text style={{color: theme.second_text_color}}>Du {item.spreading_time}</Text>
        </View>
            </Animatable.View>
            </TouchableOpacity>)}
            </ScrollView>
            }
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
  export default connect(mapStateToProps)(Worships);

