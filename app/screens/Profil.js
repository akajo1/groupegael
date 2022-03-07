import React,{useState,useEffect, useContext} from 'react'
import { View, Text,TouchableOpacity, Dimensions,ImageBackground,Alert, ActivityIndicator } from 'react-native'
import Style from '../styles'
import {Title} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux';
import GetLoading from '../components/GetLoading';
import { AuthContext } from '../apis/AuthProvider'
import RNFetchBlob from 'rn-fetch-blob';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width,height} = Dimensions.get('screen')
function Profil(props) {
   const [loading, setLoading] = useState(true);
   const user = props.connexion;
   const [image,setImage]= (props.profil== '')? useState(user.profile_photo_path) : useState(props.profil)
   const [datas,setdatas]= useState('');
   const [attente,setattente]= useState(false);
   const {logout}= useContext(AuthContext)
   const theme = props.theme

   useEffect(() => {
       setLoading(false)
       
   }, [])
   const logouts = ()=>{
    const action = {
        type: 'DECONNEXION',
      };
      const action_two ={
        type:'VIDE'
      }
  
      Alert.alert(
        'Deconnexion',
        'Voulez-vous vraiment vous deconnectez',
        [
         
          {text: 'Oui', onPress: () => {
            props.dispatch(action);
            props.dispatch(action_two);
            props.dispatch({
              type: 'VIDES',
              value: '',
            });
            logout()
        props.navigation.navigate('home');
       
          }},
          {text: 'Non', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        ]
      );
   }
   const selectImage =()=> {
     const options ={
      quality:1.0,
      maxWidth: 500,
      maxHeight:500,
      storageOptions:{
      skipBackup: true
    }
     }
     launchImageLibrary(options,(response)=>{
       console.log(response)
       if(response.didCancel){
         console.log('vous avez annuler')
       }
       else {
         setImage(response.uri)
         setdatas(response.uri)
         const action = { type: "ADD_PROFIL", value: response.uri }
         props.dispatch(action)

       }
     })
   }
   const uploadImage = ()=>{
     setattente(true)
     RNFetchBlob.fetch('POST','https://app.api.groupegael.com/post_profil.php',{
       Authorization:'Bearer access-token',
       otherHeader:'foo',
       "content-Type": 'multipart/form-data'
     },
     [
       {name:'image', filename:'image.png', type: 'image/png' ,data: RNFetchBlob.wrap(datas)},
       {name:'user',data: user.id}
    ])
  
    .then((resp)=>{
      setattente(false)
      setdatas('')

        })
   }

    return (
        loading ? <GetLoading/>
        :
        <>
        <View style={[Style.container_fluid,{flexDirection:'row', backgroundColor: theme.bg_global}]}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 40, left: 20,zIndex:3}}>
            <Icon name="chevron-left" color="orange" size={32} />
            </TouchableOpacity>
           <View style={[Style.leftBar, {backgroundColor: theme.bg_global}]}>
           <Text style={[Style.textRotate,{width: 400,color: theme.borderColor, transform:[{ rotate: '-90deg'},{translateY:-165},{translateX:100}]}]}>PROFIL</Text>

           </View>
           
           <View style={[Style.rightPart,{paddingTop:0}]}>
            <TouchableOpacity onPress={()=> selectImage()}>
            {
              image !=''
              ? 
              <ImageBackground  imageStyle={{resizeMode:'cover'}} source={{uri: image}} style={{width: width -60, height : height/ 2.3,justifyContent:'center',alignItems:'center'}}>
                {
                  attente  ? <ActivityIndicator size={42} color="orange" /> : <Text style={{color:theme.PRIMARY_TEXT_COLOR}}>changer de profil</Text>
                }
              </ImageBackground>

              :
              user.profile_photo_path !=='' ?
              user.type_connection !='' ?
              <ImageBackground  imageStyle={{resizeMode:'cover'}} source={{uri:user.profile_photo_path}} style={{width: width -60, height : height/ 2.3}} />
              :
              <ImageBackground  imageStyle={{resizeMode:'cover'}} source={{uri: user.profile_photo_path}} style={{width: width -60, height : height/ 2.3}} />

             :
             <ImageBackground  imageStyle={{resizeMode:'cover'}} source={{uri: user.profile_photo_path}} style={{width: width -60, height : height/ 2.3}} />

             }
              
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            <TouchableOpacity onPress={()=>{}}>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:'#fff',borderWidth:1,width:120,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:20,marginRight:10}}>
              <Icon name="user-friends" size={18} color="#fff"/>
              <Text style={{fontWeight:'700',fontSize:14,color:'#fff',marginLeft:10}}>Mes amis</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>logouts()}>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:'#b32a2a',backgroundColor:'#b32a2a',borderWidth:1,width:170,justifyContent:'center',paddingVertical:10,paddingHorizontal:15,borderRadius:20,marginTop:20}}>
              <Icon name="sign-out-alt" size={18} color="#fff"/>
              <Text style={{fontWeight:'700',fontSize:14,color:'#fff',marginLeft:10}}>Se deconnecter</Text>
              </View>
            </TouchableOpacity>
            </View>
            {
              datas !='' && <TouchableOpacity onPress={()=>uploadImage()}>
              <Text style={{color: theme.PRIMARY_TEXT_COLOR, borderColor:'orange', borderWidth:1, paddingHorizontal:15, paddingVertical:10,borderRadius:20,marginTop:10, width:180}}>Mettre à jour le profil</Text>
              </TouchableOpacity>
            }
                <Title style={{fontSize:36, color:'orange',paddingTop: 30}}>{user.full_name !=null ? user.full_name : user.lastname+' '+ user.firstname}</Title>
                <View>
                <Text style={{color: theme.second_text_color,  marginTop: 10}}>E-mail</Text>
                <Title style={{fontSize:20, color: theme.PRIMARY_TEXT_COLOR}}>{user.email}</Title>
                </View>
                <View>
                <Text style={{color: theme.second_text_color,  marginTop: 10}}>Téléphone</Text>
                <Title style={{fontSize:20, color: theme.PRIMARY_TEXT_COLOR}}>{user.phone}</Title>
                </View>
               

           </View>
        </View>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
      download: state.toggleFavorite.favoritesPrestataire,
      profil: state.profilReducers.avatar,
      theme: state.themeReducers.theme,
      currentDownload: state.CurrentDownload.downloads
    };
  };
  export default connect(mapStateToProps)(Profil);