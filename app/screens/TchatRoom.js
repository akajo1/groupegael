import React,{useState,useEffect,useRef, useLayoutEffect} from 'react'
import { Animated,View, Text,Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import TopNavNext from '../components/TopNavNext';
import {connect} from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImageLoad from '../components/ImageLoad';
import now from '../components/moment';
import { getMessaging, imageURI, sendMessaging } from '../apis/endpoint.api';
const {width,height} = Dimensions.get('screen');
function TchatRoom(props) {
    const user = props.connexion;
   const theme = props.theme;
   const [messages, setMessages] = useState('');
   const [texts, settext] = useState('');
   const {tchat} = props.route.params;
   const inputEl = useRef(new Animated.ValueXY()).current;
    const form = {
        user: user.id,
        tchat: tchat.id,
        content: texts
    }

    const getAllMessages = async ()=>{
        await getMessaging(tchat.id)
            .then((response)=>response.json())
            .then((response)=>{
                if(response.success ==1){
                    setMessages(response.msg)
                }else setMessages('')
            })
   }
   const onSend = async ()=>{   
    await sendMessaging(form)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success==1){
                settext('')
            }
            getAllMessages()
        })
   }
  

useEffect(() => {
   getAllMessages()
 
}, [])
  

    return (
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
             <TopNavNext {...props}/>
            <ScrollView ref={inputEl} style={{flex:1,paddingHorizontal:5}} showsVerticalScrollIndicator={false} invertStickyHeaders={true}  >
               
               {
                   messages !='' && messages.map((item,index)=>
                   <View key={index} style={{padding:5,borderRadius:10,marginVertical:5,display:'flex',alignItems:(item.user == user.id ? 'flex-end': 'flex-start')}}>
                   
                   <View style={{backgroundColor:(item.user == user.id ? '#155ce0': '#e09915'),paddingHorizontal:10,paddingVertical:5,borderRadius:10}}>
                   <Text style={{color:'#000000',fontWeight:'700',fontSize:14,textAlign:'left'}}>{ (item.user == user.id ? 'Vous': item.nom_user)}</Text>
                   <Text style={{color:'#fff',fontWeight:'700',fontSize:15,textAlign:'left'}}>{item.content}</Text>
                   <Text style={{color:'#000',fontWeight:'700',fontSize:10,textAlign:'right',marginTop:10}}><Icon name="clock"/> il y a {now(item.date).fromNow(now().locale())} </Text>
                   </View>
                   </View>)
               }
                    <TouchableOpacity onPress={()=> props.navigation.navigate('meditation',{item:tchat.info})} style={{display:'flex',alignItems:(tchat.user == user.id ? 'flex-end': 'flex-start')}}>
                  
                  <View style={{backgroundColor:(tchat.user == user.id ? '#155ce0': '#e09915'),width:width-60,padding:5,borderRadius:10,marginVertical:10}}>
                  <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri: imageURI+tchat.picture}} style={{height:200,width:width-70}} resizeMethod="auto" resizeMode="cover" />

                  <Text style={{color:'#000',fontWeight:'700',fontSize:11}}>Sujet</Text>
                  <Text style={{color:'#000',fontWeight:'700',fontSize:16}}>{tchat.title}</Text>
                  <View style={{backgroundColor:'#291c05b9',width:width-70,paddingHorizontal:10,paddingVertical:5}}>
                  <Text style={{color:'#b1b1b1',fontWeight:'700',fontSize:14,textAlign:'left'}}>{(tchat.user == user.id) ? 'Vous' : tchat.nom_user}</Text>
                  <Text style={{color:'#fff',fontWeight:'700',fontSize:14,textAlign:'left'}}>{tchat.content}</Text>
                  <Text style={{color:'#fff',fontWeight:'700',fontSize:12,textAlign:'right'}}><Icon name="clock"/> il y a {now(tchat.date).fromNow(now().locale())} </Text>
                  </View>
                  </View>
                  
              </TouchableOpacity> 
            </ScrollView>
            <View style={{width:width,padding:10,backgroundColor:'#212121',flexDirection:'row'}}>
                <TextInput style={{borderWidth:2,borderColor:'#e09915',width:width-80,paddingHorizontal:10,color:'#e09915'}} placeholder="laisser un commentaire..." placeholderTextColor="#96670f" onChangeText={(input)=>settext(input)} value={texts}/>
                <TouchableOpacity onPress={()=>onSend()}>
                    <View style={{width:55,height:55,backgroundColor:'#e09915',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="paper-plane" color="#000" size={25}/>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        connexion: state.connexionReducers.connecter,
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(TchatRoom);