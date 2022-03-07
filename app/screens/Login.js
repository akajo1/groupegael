import React,{useState,useEffect, useContext} from 'react'
import { View, Text,Image,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView, Dimensions,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import GetLoading from '../components/GetLoading';
import Styles from '../styles'
import { getUser } from '../apis/endpoint.api';
import {connect} from 'react-redux';
import Message from '../components/Message';
import CustomAlert from '../components/CustomAlert';
import { AuthContext } from '../apis/AuthProvider';
const {width,height}= Dimensions.get('screen')

function Login(props) {
const theme= props.theme
    const [username, setusername] = useState('');
    const [mdp, setmdp] = useState('');
    const [texte, settexte] = useState("vérifier l'état de votre connexion");
    const [loading, setLoading] = useState(true);
    const [msg,setmsg]= useState('')
    const [msgLoad,setmsgLoad]= useState(false);

    const [alert,setalert]= useState(false);
    const {onGoogleButtonPress,onFacebookButtonPress} = useContext(AuthContext)
    const onAlert = (value)=>{
      setalert(value)
  }
    const myForm = {
        username,
        mdp
    }

 

    useEffect(() => {
        setLoading(false)
    }, [])

if(props.message !=''){
    setTimeout(() => {
      props.dispatch({
        type: 'SUPPRESSION_MESSAGE',
        value: '',
      });
  }, 4000);
}
const onGoogle = ()=>{
  setLoading(true)
  onGoogleButtonPress()

}
const onFacebook = ()=>{
  setLoading(true)
  onFacebookButtonPress()
}
    const requete = ()=>{
        setLoading(true)
        getUser(myForm)
        .then((response)=> response.json())
        .then((response)=>{
          setLoading(false)
          if(response.success==1){
            const action = {
                type: 'CONNEXION_REUSSI',
                value: response.msg,
              };
             
              props.dispatch(action);
            setusername('')
            setmdp('')
           
            props.navigation.navigate('home');
          }else{
            onAlert(true)
            settexte(response.msg)
          }
         
        })
        .catch((error) => {
          setLoading(false)
         onAlert(true)
        });
        props.dispatch({
          type: 'SUPPRESSION_MESSAGE',
          value: '',
        });
      }
    
  
     
   

    return (
        <View style={[Styles.container_fluid,{justifyContent:'center'}]}>
          {
                alert && <CustomAlert title="Avertissement" texte={texte} tbgColor="#F93154" tcolor="#fff" affiche={true} onAlert={(alert)=>onAlert(alert)} alert={alert}/>

            }
             <View style={{...StyleSheet.absoluteFill}}>
                <Image source={theme.bgLogin} />
            </View>
            <TouchableOpacity onPress={()=> props.navigation.navigate('home')} style={{position:'absolute',top: 40, left: 20}}>
            <Icon name="arrow-left" color="orange" size={32} />
            </TouchableOpacity>
            {
                props.message !='' ? <Message animate="bounceIn" message={props.message} bgcolor='#00B74A'/> : null
            }
   {loading ? <GetLoading/>:
   <>
            <Animatable.View  animation="bounceIn" style={{width,justifyContent:'center',alignItems:'center',marginBottom:50}}>
              <Image source={require('../assets/logo_.png')} resizeMode="cover" style={{width:160, height:80}} />
              <Text style={[{fontFamily:'GOTHIC',fontSize:18,color:'#fff',textAlign:'center',marginTop:10,fontWeight:'700'}]}>connexion</Text>
            </Animatable.View>
            
          <KeyboardAvoidingView >
            <TextInput
            placeholder="numero de téléphone"
            style={[Styles.textInput,{}]}
            placeholderTextColor="#b1bace"
            onChangeText={(input)=>setusername(input)}
            value={username}
            />
            <TextInput
            placeholder="Mot de passe"
           
            onChangeText={(input)=>setmdp(input)}
            secureTextEntry={true}
            style={[Styles.textInput,{}]}
            placeholderTextColor="#b1bace"
            value={mdp}
            />
            
          </KeyboardAvoidingView>
         
          <TouchableOpacity onPress={()=> requete()}>
              <Text style={[Styles.btnDefault]}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text style={[Styles.textRight,{fontSize:14,color: theme.PRIMARY_TEXT_COLOR}]}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row', marginTop: 40,justifyContent:'center'}}>
              {/*<TouchableOpacity onPress={()=>{}} style={{backgroundColor:'black', marginLeft: 40, width:width * 0.4}}>
                        <Icon name="apple" size={40} color="white" style={{textAlign:'center',paddingVertical: 10}}/>
    </TouchableOpacity>*/}
              <TouchableOpacity onPress={()=> onGoogle()}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:50, width:width/2.3,backgroundColor:'#d32f2f',padding:10,marginRight:10}}>
                        <Icon name="google" size={22} color="white" style={{textAlign:'center'}}/>
                        <Text style={{color:'white',marginLeft:10}}>Google</Text>
                        </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onFacebook()}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:50, width:width/2.4,backgroundColor:'#0277bd',padding:10}}>
                        <Icon name="facebook" size={22} color="white" style={{textAlign:'center'}}/>
                        <Text style={{color:'white',marginLeft:10}}>Facebook</Text>
                        </View>
              </TouchableOpacity>
        
          </View>
          <TouchableOpacity onPress={()=> props.navigation.navigate('signin')}>
              <Text style={[Styles.btnDefault, {backgroundColor:'#ffa000',marginTop:10}]}>Inscription</Text>
          </TouchableOpacity>
          <Text style={{textAlign:'center',color:theme.second_text_color,marginTop:width/13}}>2021 @groupgael</Text>
   </>}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      message: state.inscriptionReducers.message,
      connexion: state.connexionReducers.connecter,
    isConnect: state.connexionReducers.isConnect,
    theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Login);