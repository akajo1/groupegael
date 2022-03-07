import React,{useState,useEffect,useRef} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity, Dimensions,TextInput,Alert, ActivityIndicator} from 'react-native'
import Style from '../styles'
import YouTube from 'react-native-youtube';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler'
const {width,height} = Dimensions.get('screen');
import TrackPlayer,{Capability, Event} from 'react-native-track-player';
import UserInteraction from '../components/UserInteraction';
import {Title} from 'react-native-paper'
import ImageLoad from '../components/ImageLoad';
import * as Animatable from 'react-native-animatable';

import TopNavNext from '../components/TopNavNext';
import { getLikesMeditation, getPrayers, postPrayer } from '../apis/endpoint.api';
import {connect} from 'react-redux';
import GetLoading from '../components/GetLoading';
import CustomAlert from '../components/CustomAlert';
function Meditation(props) {
  const theme= props.theme;
    const item = props.route.params.item;
    const [isReady, setIsReady]= useState(false)
  const [state,setState]=useState('')
  const [quality,setQuality]= useState(360)
  const [error,setError]=useState('');
  const [texte,settexte]= useState('vérifier l\'état de votre connexion')
  const [alert,setalert]= useState(false)
  const [comment,setcomment]= useState('')
  const [likes,setlikes]= useState('')
  const [like,setlike]= useState(false)
  const [loading,setLoading]= useState(false)
  const [input,setInput]= useState('')
  const [posted,setposted]= useState(false)
  const [com,setcom]= useState(false)
const index = useRef(null)

const myForm = {
    meditation_id : item.id,
    user_id : props.connexion.id,
    prayer_intention : input
}

const requete = ()=>{
  setposted(true)
   if(myForm.prayer_intention ==''){
     setposted(false)
      onAlert(true)
      settexte('vous devez remplir le champs de la prière')
   }else{

    postPrayer(myForm)
    .then((response)=> response.json())
    .then((response)=>{
      setposted(false)
        if(response.success==1){
            getAllPrayers();
            setInput('')
        }else{
          onAlert(true)
          settexte(response.msg)
        }
    })
    .catch((error) => {
      onAlert(true)
      });
   }
}
const onAlert = (value)=>{
  setalert(value)
}

  const getAllPrayers = ()=>{
      getPrayers(item.id)
      .then((response)=>response.json())
      .then((response)=>{
          if(response.success == 1){
                  setcomment(response.msg);
          }else setcomment('');
      })
  }
  
  const getAllLikes = ()=>{
    
      getLikesMeditation(item.id)
      .then((response)=>response.json())
      .then((response)=>{
          if(response.success == 1){
            
                  setlikes(response.msg);
                  if( response.msg.findIndex((item) => item.id_user === props.connexion.id) !== -1){
                    setlike(true)
                }else{
                    setlike(false)
                }
          }else setlikes('');
      })
  }

  const getPayersAll = ()=>{
    if(comment !=''){
        return (
            <>
                <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontWeight:'700',fontSize:22}}>{comment.length} Priere(s)</Text>
                {
                    comment.map((item)=><View style={{flexDirection:'row',width,alignItems:'center',borderBottomColor: theme.secondBorderColor,borderBottomWidth:1,paddingVertical:10}}>
                        <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: 30,height: 30,borderRadius:15,marginRight:15}} resizeMethod="auto" resizeMode="cover" />
                        <View>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontWeight:'700',fontSize:18}}>{(item.fullname !='') ? item.fullname : item.lastname+' '+item.firstname}</Text>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:16,width: width/ 1.2,paddingVertical:5}}>{item.content}</Text>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:12}}>{item.created_at}</Text>
                        </View>
                    </View>)
                }
            </>
        )
    }
    return <Text style={{color:theme.PRIMARY_TEXT_COLOR,textAlign:'center'}}>Aucune prière ajouter pour le moment</Text>
}
const onblure = ()=>{
    index.current.blur()
}
  useEffect(() => {
    getAllLikes()
    return () => {
        getAllLikes()
    }
}, [])

useEffect(() => {
    getAllPrayers()
    return () => {
        getAllPrayers()
    }
}, []);

    return (
      loading ? <GetLoading/>
      :
      <>
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
        {
                alert && <CustomAlert title="Avertissement" texte={texte} tbgColor="#F93154" tcolor={theme.PRIMARY_TEXT_COLOR} affiche={true} onAlert={(alert)=>onAlert(alert)} alert={alert}/>

            }
            <TopNavNext {...props} texte="Meditations"/>
               {
                   item.url != null && 
                   <>
                    <YouTube
                   apiKey="AIzaSyDfOOvPY7H1Hes5DW90KlrIQG73-nG_XXY"   
                   videoId={item.url} // The YouTube video ID
                   play={false} // control playback of video with true/false
                   showFullscreenButton
                   loop // control whether the video should loop when ended
                   onReady={e => setIsReady(true)}
                   onChangeState={e => setState(e.state)}
                   onChangeQuality={e => setQuality(e.quality)}
                   onError={e => setError(e.error)}
                   modestbranding={true}
                   style={{ alignSelf: 'stretch', height: height* 0.4 }}
                   onProgress={()=> console.log('en joue')}
                 />
                 <Text style={{color:theme.PRIMARY_TEXT_COLOR,marginHorizontal:20,fontSize:18,marginBottom:10, marginTop:10}}>{item.titre}</Text>
                 <View style={{flexDirection:'row'}}>
                 <UserInteraction like={like} likes={likes} type="meditation" {...props} item={item} onActu={()=>getAllLikes()}/>
                 <TouchableOpacity onPress={()=> setcom(!com)}>
                 <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:14}}> <Icon name="praying-hands" size={16} color={theme.PRIMARY_TEXT_COLOR} /> {comment !='' ? comment.length : '0'} prières(s)</Text>
                 </TouchableOpacity>
                 </View>

                   </>

               }

        <ScrollView>
            {
                item.url == null && 
                <>
                <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width,height: height/2,borderRadius:5}} resizeMethod="auto" resizeMode="cover" />
                <UserInteraction like={like} likes={likes} type="meditation" {...props} item={item} onActu={()=>getAllLikes()}/>
                <Text style={{color:theme.PRIMARY_TEXT_COLOR}}><Icon name="comments" size={16} color={theme.PRIMARY_TEXT_COLOR} /> Commentaires {comment !='' ? comment.length : '0'}</Text>
                </>

            }
            
       <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: 'orange', fontSize:16,marginTop: 10}}>Meditation</Title>
       <Text style={{color: theme.PRIMARY_TEXT_COLOR, fontSize:16,paddingVertical:10, textAlign:'justify'}}>{item.content} </Text>
       </View>
       
        </ScrollView>
        {
            com ? <Animatable.View  animation="fadeInUp"  style={{position:'absolute',height: height - height/2.7,width,backgroundColor: theme.borderColor,zIndex:99,top:height/2.5,borderTopRightRadius:30,borderTopLeftRadius:30}}>
             <View style={{paddingVertical:10}}> 
             <TouchableOpacity onPress={()=> setcom(!com)}>
             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
             <Text style={{color:theme.PRIMARY_TEXT_COLOR,borderWidth:1,borderColor: theme.second_text_color,paddingVertical:5,paddingHorizontal:15,borderRadius:20,marginRight:15}}>Terminer</Text>
             </View>
             </TouchableOpacity>
               
               <Title style={{fontWeight:'bold',color: theme.PRIMARY_TEXT_COLOR, marginHorizontal:20,fontSize:15}}>Laisser une prière</Title>
             
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <TextInput
                 onChangeText={(input)=>setInput(input)}
                  style={{marginHorizontal:20,borderWidth:1,borderColor: theme.second_text_color,borderRadius:30,padding:10,color:theme.PRIMARY_TEXT_COLOR,width:width-100}}
                  value={input}
                  onSubmitEditing={() => onblure()}
                  ref={index}
                  />
               <TouchableOpacity onPress={()=> props.isConnect ? requete() : props.navigation.navigate('login')}>
               <Image source={theme.paper_plane} resizeMethod='auto' resizeMode="cover" style={{width:35,height:35}}/>
               </TouchableOpacity>
              </View>
               
               {
                   posted ? <ActivityIndicator color={theme.PRIMARY_TEXT_COLOR} size={22}/> : null
               }
           </View>
            <ScrollView >
           
           <View style={{width,paddingHorizontal:20}}>
            {getPayersAll()}
            </View>
              </ScrollView>
            </Animatable.View>
            : null
        }
       </View>
      </>
    )
}

const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Meditation);