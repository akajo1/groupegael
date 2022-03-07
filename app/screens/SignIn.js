import React,{useState,useEffect} from 'react'
import { View, Text,Image,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView, Dimensions, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import GetLoading from '../components/GetLoading';
import Styles from '../styles'
import { postUser } from '../apis/endpoint.api';
import {connect} from 'react-redux';
import CustomAlert from '../components/CustomAlert';
const {width,height}= Dimensions.get('screen');
 function SignIn(props) {
   const theme = props.theme
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [mdp, setmdp] = useState('');
  const [cmdp, setcmdp] = useState('');
  const [texte, settexte] = useState("vérifier l'état de votre connexion");
  const [loading, setLoading] = useState(true);
  const [alert,setalert]= useState(false);
  const onAlert = (value)=>{
    setalert(value)
}
  const myForm = {
    name,
    phone,
    email,
    mdp,
    cmdp
  }

  const requete = ()=>{
    setLoading(true)
    postUser(myForm)
    .then((response)=> response.json())
    .then((response)=>{
      setLoading(false)
      if(response.success==1){
        const action = {
          type: 'INSCRIPTION_REUSSI',
          value: 'Inscription réussi, vous pouvez vous connectez',
        };
        props.dispatch(action);
        setname('')
        setphone('')
        setmdp('')
        setemail('')
        setcmdp('')
        props.navigation.navigate('login');
      }else{
        onAlert(true)
        settexte(response.msg)
      }
     
    })
    .catch((error) => {
      setLoading(false)
      onAlert(true)
    });
  }

  useEffect(() => {
    setLoading(false)
    
  }, [])
    return (
        <View style={[Styles.container_fluid,{flex:1,justifyContent:'center'}]}>
             <View style={{...StyleSheet.absoluteFill}}>
                <Image source={theme.bgSignIn} />
            </View>
           {
             loading ? <GetLoading/> 
             :
             <>
              <Animatable.View  animation="bounceIn" style={{width,justifyContent:'center',alignItems:'center',marginBottom:50}}>
              <Image source={require('../assets/logo_.png')} resizeMode="cover" style={{width:160, height:80}} />
              <Text style={[{fontFamily:'GOTHIC',fontSize:18,color:'#ffa000',textAlign:'center',marginTop:10,fontWeight:'700'}]}>inscription</Text>
            </Animatable.View>
            {
                alert && <CustomAlert title="Avertissement" texte={texte} tbgColor="#F93154" tcolor="#fff" affiche={true} onAlert={(alert)=>onAlert(alert)} alert={alert}/>

            }
          <KeyboardAvoidingView >
            <TextInput
            placeholder="Nom complet"
            style={[Styles.textInput,{fontFamily:'GOTHIC'}]}
            placeholderTextColor="#b1bace"
            onChangeText={(input)=> setname(input)}
            value={name}
            />
            <TextInput
            placeholder="Téléphone"
            style={[Styles.textInput,{fontFamily:'GOTHIC'}]}
            placeholderTextColor="#b1bace"
            onChangeText={(input)=> setphone(input)}
            value={phone}
            />
             <TextInput
            placeholder="Adresse Email"
            style={[Styles.textInput,{fontFamily:'GOTHIC',marginBottom:3}]}
            placeholderTextColor="#b1bace"
            onChangeText={(input)=> setemail(input)}
            value={email}
            />
            <Text style={{color:theme.PRIMARY_TEXT_COLOR,paddingHorizontal:30,textAlign:'center'}}>vous n'êtes pas obligé de remplir l'adresse email</Text>
           
            <TextInput
            placeholder="Mot de passe"
           
            onChangeText={(input)=> setmdp(input)}
            secureTextEntry={true}
            style={[Styles.textInput,{fontFamily:'GOTHIC',marginTop:10}]}
            placeholderTextColor="#b1bace"
            value={mdp}
            />
             <TextInput
            placeholder="Retaper le mot de passe"
           
            onChangeText={(input)=> setcmdp(input)}
            secureTextEntry={true}
            style={[Styles.textInput,{fontFamily:'GOTHIC'}]}
            placeholderTextColor="#b1bace"
            value={cmdp}
            />
          </KeyboardAvoidingView>
         
          <TouchableOpacity onPress={()=> requete()}>
              <Text style={[Styles.btnDefault, {backgroundColor:'#ffa000',marginTop:10}]}>S'inscrire</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> props.navigation.navigate('login')}>
              <Text style={[Styles.btnDefault, {backgroundColor:'#929fba',marginTop:10}]}>Déjà un compte ?</Text>
          </TouchableOpacity>

          <Text style={{textAlign:'center',color:theme.secont_text_color,marginTop:width/13}}>2021 @groupgael</Text>
             </>
           }
         

          
        </View>
    )
}

const mapStateToProps = (state) => {
  return {
    message: state.inscriptionReducers.message,
    theme: state.themeReducers.theme,
  };
};
export default connect(mapStateToProps)(SignIn);