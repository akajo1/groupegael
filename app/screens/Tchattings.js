import React,{useState,useEffect} from 'react'
import { View, Text,Dimensions,Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { askFriend, cancFriend, confirmFriend, messaging, myAskFriend, myFriend, searchFriend, waitFriend } from '../apis/endpoint.api';
const {width,height}= Dimensions.get('screen')
import ImageLoad from '../components/ImageLoad';
import now from '../components/moment'
import { communauteShimmer, friendShimmer, meditationShimmer } from '../apis/matrix';
function Tchattings(props) {
    const user = props.connexion;
    const theme = props.theme
    const [onglet, setonglet] = useState('communaute')
    const [search, setsearch] = useState('')
    const [friends, setfriends] = useState('')
    const [results, setresults] = useState('')
    const [myAsk, setmyAsk] = useState('')
    const [myWait, setmyWait] = useState('')
    const [msg, setmsg] = useState('')
    const [alerty, setalerty] = useState('')
    const [loadingc, setloadingc] = useState(true)
    const [loadingF, setloadingF] = useState(true)
    const [loadingS, setloadingS] = useState(false)
    const myForm = {
        search,
        id: user.id
    }
    if(!props.isConnect) props.navigation.navigate('login')
    const change = (page)=>{
        setonglet(page)
        if(page=='communaute'){
            waited();
            messages();
        }
        if(page=='ami'){
            asked()  
            friend()
        }
        if(page=='search'){
            setsearch('')
            setresults('')
        }
    }
    const confirmedFriend=(ask)=>{
        confirmFriend(user.id,ask)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success==1){
                friend()
            }
        })
    }
    const askedFriend = (ask)=>{
        askFriend(user.id,ask)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success==1){
                find()
            }
        })
    }
    const cancelFriend = (ask)=>{
        cancFriend(user.id,ask)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success==1){
                asked()
            }
        })
    }
    const find = ()=>{
        setmsg('')
        setresults('')
        setloadingS(true)
       if(myForm.search !=''){
        searchFriend(myForm)
        .then((response)=>response.json())
        .then((response)=>{
           setloadingS(false)
            if(response.success==1){
                setresults(response.msg)
            }else{
                setmsg('aucun résultat trouvé :(')
            }
        })
       }else{
        setmsg('vous devez d\'abord remplir le champ de la recherche');
       }
    }
    const friend = ()=>{
        setloadingF(true)
        myFriend(user.id)
        .then((response)=>response.json())
        .then((response)=>{
            setloadingF(false)
            if(response.success==1){
                setfriends(response.msg)
            }else setfriends('')
        })
    }

    const messages = ()=>{
        setloadingc(true)
        messaging(user.id)
        .then((response)=>response.json())
        .then((response)=>{
            setloadingc(false)
            if(response.success==1){
                setalerty(response.msg)
            }else setalerty('')
        })
    }
    const waited = ()=>{
        waitFriend(user.id)
        .then((response)=>response.json())
        .then((response)=>{
             if(response.success==1){
                 setmyWait(response.msg)
             }else setmyWait('')
        })
    }
    const asked = ()=>{
        myAskFriend(user.id)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success==1){
                setmyAsk(response.msg)
            }else setmyAsk('')
        })
 
    }
    useEffect(() => {
      waited()
    }, [])
    useEffect(() => {
       asked()
     }, [])

     useEffect(() => {
      friend() 
     }, [])
     useEffect(() => {
        messages() 
       }, [])
    

    return (
        <View style={{width,marginBottom:height/14.5,backgroundColor : theme.bg_global}}>
            <View style={{display:'flex',flexDirection:'row',paddingHorizontal:10}}>
               
                <TouchableOpacity onPress={()=>change('communaute')}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:(onglet == 'communaute' ? '#e09915': theme.PRIMARY_TEXT_COLOR),borderWidth:1,width:150,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:10,marginRight:10}}>
                <Icon name="users" size={18} color={(onglet == 'communaute' ? '#e09915': theme.PRIMARY_TEXT_COLOR)}/>
                <Text style={{fontWeight:'700',fontSize:14,color:(onglet == 'communaute' ? '#e09915': theme.PRIMARY_TEXT_COLOR),marginLeft:10}}>Communautés</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>change('amis')}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:(onglet == 'amis' ? '#e09915': theme.PRIMARY_TEXT_COLOR),borderWidth:1,width:120,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:10,marginRight:10}}>
                <Icon name="user-friends" size={18} color={(onglet == 'amis' ? '#e09915': theme.PRIMARY_TEXT_COLOR)}/>
                <Text style={{fontWeight:'700',fontSize:14,color:(onglet == 'amis' ? '#e09915': theme.PRIMARY_TEXT_COLOR),marginLeft:10}}>Mes amis</Text>
                </View>
                </TouchableOpacity>
                {
                    onglet =='amis' && <TouchableOpacity onPress={()=>change('search')}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:theme.PRIMARY_TEXT_COLOR,borderWidth:1,width:70,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:10,marginRight:10}}>
                    <Icon name="user-friends" size={18} color={theme.PRIMARY_TEXT_COLOR}/>
                    <Text style={{fontWeight:'700',fontSize:14,color:theme.PRIMARY_TEXT_COLOR,marginLeft:10}}>+</Text>
                    </View>
                    </TouchableOpacity>
                }
            </View>
            {
                onglet == 'communaute' && <ScrollView style={{width,height:height-270, marginTop:20}} showsVerticalScrollIndicator={false}>
                 {
                            myWait !='' &&
                            <>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:3,marginVertical:15,fontSize:24}}>Mes invitations</Text>
                            {
                                 myWait.map((item)=><View key={item.id} style={{width,backgroundColor:theme.borderColor,marginBottom:10,padding:20,display:'flex',flexDirection:'row',position:'relative',alignItems:'center'}}>
                                                 <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://app.api.groupegael.com/profil'+item.profil}} style={{width: 30,height: 30,borderRadius:15,marginRight:10}} resizeMethod="auto" resizeMode="cover" />

                                 <View style={{width:width-180}}>
                                     <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18}}>{item.nom_complet} </Text>
                                 </View>
                                 <TouchableOpacity onPress={()=>confirmedFriend(item.id)}>
                                 <View style={{flexDirection:'row',backgroundColor:'#ff8f00',borderWidth:1,alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:10,borderRadius:15,textAlign:'center'}}>
                                     <Text style={{color:(item.status == 1 ? theme.PRIMARY_TEXT_COLOR:'#000'),fontSize:16,marginRight:10,fontWeight:'700'}}>Accepter</Text>
                                 </View>  
                                 </TouchableOpacity> 
                             </View>)
                            }
                            </>
                         }
                         <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:3,marginVertical:15,fontSize:18}}>Communauté</Text>

            {
               loadingc ? communauteShimmer(theme) :  
                
                    alerty !='' ? alerty.map((item)=> <TouchableOpacity key={item.id} onPress={()=> (item.nom_type !='meditation') ? {} : props.navigation.navigate('tchat',{tchat: item})}>
                         <View  style={{width,backgroundColor:theme.borderColor,marginBottom:10,paddingVertical:30, paddingHorizontal:20,display:'flex',flexDirection:'row',position:'relative',paddingBottom:50}}>
                  
                            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri: item.profil}} style={{width:60,height:60,borderRadius:30,marginRight:15}} resizeMethod="auto" resizeMode="cover" />

                            <View style={{width:width-100}}>
                                <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18}}>
                                    {(item.user == user.id) ? 'Vous venez de ': item.nom_user+' vient de '}  {(item.om_type=='adoration') ? 'commenter' :''}  {(item.om_type=='telechargement') ? 'telecharger une musique' :''} {(item.om_type=='meditation') ? 'partager' :''} un(e) {(item.nom_type == 'adoration') && item.nom_type} {(item.nom_type == 'meditation') && 'prière'}</Text>
                                <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18,fontWeight:'700',textAlign:'justify',marginTop:10}}>{(item.content.lenght > 40) ? item.content.substr(0,40)+'...' : item.content}</Text>   
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Icon name="clock" size={12} color={theme.borderColor}/>
                            <Text style={{color: theme.borderColor,fontWeight:'700',marginLeft:5,fontSize:12}}>{now(item.date).fromNow(now.locale())} </Text>
                            </View>
                            </View>
                            <View style={{position:'absolute',bottom:15,left:20,flexDirection:'row',alignItems:'center'}}>
                            <Icon name="comment" size={19} color={theme.borderColor}/>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontWeight:'700',marginLeft:5}}>{item.count} </Text>
                        </View>
                 
              </View>
                    </TouchableOpacity>)
                : <View style={{alignItems:'center'}}>
                    <Icon name="info" color={theme.PRIMARY_TEXT_COLOR} size={32}/>
                <Text style={{color: theme.borderColor,textAlign:'center'}}>Aucune notification pour le moment</Text>
                
                </View>
                }
            
            </ScrollView>
            }
            {
                onglet == 'amis' &&<ScrollView style={{width, marginTop:20}} showsVerticalScrollIndicator={false}>
                    
                          {
                            myAsk !='' &&
                            <>
                            <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:3,marginVertical:15,fontSize:20}}>Mes Demandes</Text>
                            {
                                 myAsk.map((item)=><View key={item.id} style={{width,backgroundColor:theme.borderColor,marginBottom:10,padding:20,display:'flex',flexDirection:'row',position:'relative',alignItems:'center'}}>
                                                 <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://app.api.groupegael.com/profil'+item.profil}} style={{width: 30,height: 30,borderRadius:15,marginRight:10}} resizeMethod="auto" resizeMode="cover" />

                                 
                                 <View style={{width:width-180}}>
                                     <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18}}>{item.nom_complet} </Text>
                                 </View>
                                 <TouchableOpacity onPress={()=>cancelFriend(item.id)}>
                                 <View style={{flexDirection:'row',backgroundColor:'#ff8f00',borderWidth:1,alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:10,borderRadius:15,textAlign:'center'}}>
                                     <Text style={{color:(item.status == 1 ? theme.PRIMARY_TEXT_COLOR:'#000'),fontSize:16,marginRight:10,fontWeight:'700'}}>annuler</Text>
                                 </View>  
                                 </TouchableOpacity> 
                             </View>)
                            }
                            </>
                         }
                          <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:3,marginVertical:15,fontSize:24}}>Mes Amis</Text>
               {
                 loadingF ? friendShimmer() :   friends !='' ? friends.map((item)=>
                 <View style={{width,backgroundColor:theme.borderColor,marginBottom:10,padding:20,display:'flex',flexDirection:'row',position:'relative'}}>
                                         <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri: item.profil}} style={{width: 30,height: 30,borderRadius:15,marginRight:10}} resizeMethod="auto" resizeMode="cover" />

                         <View style={{width:width-100}}>
                             <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18}}>{item.nom_complet} </Text>
                         </View>
                         {/*<Icon name="chevron-right" color={theme.PRIMARY_TEXT_COLOR} size={22}/>*/}
                         
                     </View>
                )
                  : <View style={{alignItems:'center'}}>
                  <Text style={{color: theme.borderColor,textAlign:'center'}}>Aucun ami pour le moment</Text>
                  <TouchableOpacity onPress={()=>change('search')}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:'#356de6',borderWidth:1,width:120,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:10,marginRight:10}}>
                <Icon name="user-friends" size={18} color='#356de6'/>
                <Text style={{fontWeight:'700',fontSize:14,color:'#356de6',marginLeft:10}}>Ajouter</Text>
                </View>
                </TouchableOpacity>
                  </View>
               }
             
            </ScrollView>
            }
             {
                onglet == 'search' &&<>
                <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:3,marginTop:15,fontSize:24}}>Ajouter des amis</Text>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:10,paddingHorizontal:3}}>
                    <TextInput style={[{borderColor: theme.borderColor,borderWidth:1,borderRadius:30,width:width/1.2,marginRight:10,paddingHorizontal:15,color:theme.PRIMARY_TEXT_COLOR}]} placeholder="Recherche..." placeholderTextColor="#c7c7c7" value={search} onChangeText={(input)=> setsearch(input)}/>
                    <TouchableOpacity onPress={()=>find()}>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:50,height:50,borderRadius:25,backgroundColor:theme.borderColor}}>
                        <Icon name="search" size={20} color={theme.PRIMARY_TEXT_COLOR}/>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    msg !='' && <Text style={{color: theme.borderColor,textAlign:'center',fontSize:16,marginTop:15,paddingHorizontal:10}}>{msg}</Text>
                }
                {
                   loadingS ? friendShimmer() :  results !='' &&<ScrollView style={{width,height:height/1.8, marginTop:20,paddingBottom:15}} showsVerticalScrollIndicator={false}>
               
                   {
                       results.map((item)=><View key={item.id} style={{width,backgroundColor:theme.borderColor,marginBottom:10,padding:20,display:'flex',flexDirection:'row',position:'relative',alignItems:'center'}}>
                                       <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://app.api.groupegael.com/profil'+item.profil}} style={{width: 30,height: 30,borderRadius:15,marginRight:10}} resizeMethod="auto" resizeMode="cover" />

                       <View style={{width:width-180}}>
                           <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:18}}>{item.nom_complet} </Text>
                       </View>
                       <TouchableOpacity onPress={()=>askedFriend(item.id)}>
                       <View style={{flexDirection:'row',backgroundColor:(item.status == 1 ? '#ff8f00': theme.borderColor),borderWidth:1,alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:10,borderRadius:15,textAlign:'center'}}>
                           <Text style={{color:(item.status == 1 ? theme.PRIMARY_TEXT_COLOR:'#000'),fontSize:16,marginRight:10,fontWeight:'700'}}>{item.status == 1 ? 'en attente':'ajouter'}</Text>
                       </View>  
                       </TouchableOpacity> 
                   </View>)
                   }
           
            
            </ScrollView>
                }
                </>
            }
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
    theme: state.themeReducers.theme,
    isConnect: state.connexionReducers.isConnect,
    };
  };
  export default connect(mapStateToProps)(Tchattings);