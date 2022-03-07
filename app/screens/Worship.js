import React,{useState,useEffect, useRef} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity, Dimensions,TextInput,Alert, ActivityIndicator} from 'react-native'
import Style from '../styles'
import YouTube from 'react-native-youtube';
import { ScrollView } from 'react-native-gesture-handler'
const {width,height} = Dimensions.get('screen');
import UserInteraction from '../components/UserInteraction';
import {Title} from 'react-native-paper'
import TopNav from '../components/TopNav';
import ImageLoad from '../components/ImageLoad';
import TopNavNext from '../components/TopNavNext';
import { getComments, getLikesWorship, postComment } from '../apis/endpoint.api';
import {connect} from 'react-redux';
import GetLoading from '../components/GetLoading';
import CustomAlert from '../components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as Animatable from 'react-native-animatable';
function Worship(props) {
    const item = props.route.params.item;
    const theme= props.theme
    const [isReady, setIsReady]= useState(false)
  const [state,setState]=useState('')
  const [quality,setQuality]= useState(360)
  const [error,setError]=useState('');
const [comment,setcomment]= useState('')
const [texte,settexte]= useState('vérifier l\'état de votre connexion')
const [likes,setlikes]= useState('')
const [like,setlike]= useState(false)
const [loading,setLoading]= useState(false)
const [input,setInput]= useState('')
const [alert,setalert]= useState(false)
const [posted,setposted]= useState(false)
const index = useRef(null)
const [com,setcom]= useState(false)

const onAlert = (value)=>{
    setalert(value)
}

const myForm = {
    worship_id : item.id,
    user_id : props.connexion.id,
    comment_content : input
}

const requete = ()=>{
    setposted(true)
   if(myForm.comment_content ==''){
       onAlert(true)
       settexte('vous devez remplir le champs du commentaire')
       setposted(false)
   }else{
    postComment(myForm)
    .then((response)=> response.json())
    .then((response)=>{
        setposted(false)
        if(response.success==1){
            getAllComments();
            setInput('')
        }else{
            Alert.alert(
                'Avertissement',
                response.msg,
                [
                  {
                    text: 'OK',
                    onPress: () => {},
                  },
                ],
                {
                  cancelable: false,
                },
              );
        }
    })
    .catch((error) => {
      
        Alert.alert(
          'Avertissement',
          "vérifier l'état de votre connexion : ",
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {
            cancelable: false,
          },
        );
      });
   }
}

const getAllComments = ()=>{
    getComments(item.id)
    .then((response)=>response.json())
    .then((response)=>{
        if(response.success == 1){
                setcomment(response.msg);
        }else setcomment('');
    })
}

const getAllLikes = ()=>{
   
    getLikesWorship(item.id)
    .then((response)=>response.json())
    .then((response)=>{
        if(response.success == 1){
         
                setlikes(response.msg);
               if(props.isConnect){

                if( response.msg.findIndex((item) => item.id_user === props.connexion.id) !== -1){
                    setlike(true)
                }else{
                    setlike(false)
                }
              
               }
        }else setlikes('');
    })
}

const getCommentsAll = ()=>{
    if(comment !=''){
        return (
            <>
                <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontWeight:'700',fontSize:20}}>{comment.length} commentaire(s)</Text>
                {
                    comment.map((item)=><View style={{flexDirection:'row',width,alignItems:'center',borderBottomColor:'#2e2e2e',borderBottomWidth:1,paddingVertical:10}}>
                        <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: 30,height: 30,borderRadius:15,marginRight:15}} resizeMethod="auto" resizeMode="cover" />
                        <View>
                            <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontWeight:'700',fontSize:18}}>{(item.fullname !='') ? item.fullname : item.lastname+' '+item.firstname}</Text>
                            <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontSize:16,width: width,paddingVertical:5}}>{item.content}</Text>
                            <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontSize:12}}>{item.created_at}</Text>
                        </View>
                    </View>)
                }
            </>
        )
    }
    return <Text style={{color: theme.PRIMARY_TEXT_COLOR,textAlign:'center'}}>Aucun commentaire pour le moment</Text>
}

useEffect(() => {
    getAllLikes()
    return () => {
        getAllLikes()
    }
}, [])

useEffect(() => {
    getAllComments()
    return () => {
        getAllComments()
    }
}, []);

const onReady = ()=>{
    console.log('en cours de lecture')
    setIsReady(true)
}

const onblure = ()=>{
    index.current.blur()
}
    return (
        loading ? <GetLoading/>
        :
        <>
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
            {
                alert && <CustomAlert title="Avertissement" texte={texte} tbgColor="#F93154" tcolor={theme.PRIMARY_TEXT_COLOR} affiche={true} onAlert={(alert)=>onAlert(alert)} alert={alert} {...props}/>

            }
            <TopNavNext {...props} texte="Adorations"/>
               {
                   item.url != null &&  <>
                   <YouTube
                   apiKey="AIzaSyDfOOvPY7H1Hes5DW90KlrIQG73-nG_XXY"   
                   videoId={item.url} // The YouTube video ID
                   play={false} // control playback of video with true/false
                   showFullscreenButton
                   loop // control whether the video should loop when ended
                   onReady={e => onReady()}
                   onChangeState={e => setState(e.state)}
                   onChangeQuality={e => setQuality(e.quality)}
                   onError={e => setError(e.error)}
                   modestbranding={false}
                   style={{ alignSelf: 'stretch', height: height* 0.4,backgroundColor: theme.gb_global }}
                   showinfo={false}
                   
                 />
                <Text style={{color: theme.PRIMARY_TEXT_COLOR,marginHorizontal:20,marginTop:10,fontSize:18,marginBottom:10}}>{item.titre}</Text>

                 <View style={{flexDirection:'row'}}>
                 <UserInteraction like={like} likes={likes} type="worship" {...props} item={item} onActu={()=>getAllLikes()}/>
                 <TouchableOpacity onPress={()=> setcom(!com)}>
                 <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontSize:14}}> <Icon name="comments" size={16} color={theme.PRIMARY_TEXT_COLOR} /> {comment !='' ? comment.length : '0'} commentaire(s)</Text>
                 </TouchableOpacity>
                 </View>
                   </>
               }

        <ScrollView>
            {
                item.url == null && <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width,height: height/2,borderRadius:5}} resizeMethod="auto" resizeMode="cover" />

            }
            
       <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: 'orange', fontSize:16,marginTop: 10}}>Detail Adoration</Title>
       <Text style={{color: theme.PRIMARY_TEXT_COLOR, fontSize:16,paddingVertical:10, textAlign:'justify'}}>{item.content} </Text>
       </View>
      
        
        </ScrollView>
        {
            com ? <Animatable.View  animation="fadeInUp"  style={{position:'absolute',height: height - height/2.7,width,backgroundColor:theme.borderColor,zIndex:99,top:height/2.5,borderTopRightRadius:30,borderTopLeftRadius:30}}>
             <View style={{paddingVertical:10}}> 
             <TouchableOpacity onPress={()=> setcom(!com)}>
             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
             <Text style={{color: theme.PRIMARY_TEXT_COLOR,borderWidth:1,borderColor: theme.second_text_color,paddingVertical:5,paddingHorizontal:15,borderRadius:20,marginRight:15}}>Terminer</Text>
             </View>
             </TouchableOpacity>
               
             <Title style={{fontWeight:'bold',color: theme.PRIMARY_TEXT_COLOR, marginHorizontal:20}}>Laisser un commentaire</Title>
             
              <View style={{flexDirection:'row',alignItems:'center'}}>
           <TextInput
             onChangeText={(input)=>setInput(input)}
             style={{marginHorizontal:20,borderWidth:1,borderColor: theme.second_text_color,borderRadius:30,padding:10,color: theme.PRIMARY_TEXT_COLOR,width:width-100}}
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
        {getCommentsAll()}
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
  export default connect(mapStateToProps)(Worship);

  