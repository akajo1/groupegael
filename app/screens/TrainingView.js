import React,{useState,useEffect} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity, Dimensions,Alert} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import { ScrollView } from 'react-native-gesture-handler'
import ImageLoad from '../components/ImageLoad'
import TopNavNext from '../components/TopNavNext'
import GetLoading from '../components/GetLoading'
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { getTraining, postTraining } from '../apis/endpoint.api'
import CustomAlert from '../components/CustomAlert'
const {width,height} = Dimensions.get('screen');

function TrainingView(props) {
    const theme= props.theme;
    const item = props.route.params.cours;
    const [loading, setLoading] = useState(false);
    const [state, setstate] = useState(false);
    const [alert, setalert] = useState(false);
    const myForm = {
        cours_id: item.id,
        user_id: props.connexion.id
    }
    const onAlert = (value)=>{
        setalert(value)
    }
    const requete = ()=>{
        setLoading(true)
        postTraining(myForm)
        .then((response)=> response.json())
        .then((response)=>{
            setLoading(false)
            if(response.success==1){
                getAllStudents();
            }
        })
        .catch((error) => {
      
           setalert(true)
            });
        }
    const getAllStudents = ()=>{
        setLoading(true)
        getTraining(item.id)
        .then((response)=> response.json())
        .then((response)=>{
            setLoading(false)
            if(response.success==1){
                response.msg.forEach(element => {
                    if(element.user_id == props.connexion.id){
                        setstate(true)
                    }else setstate(false)
                });
            }else{
                setstate(false)
            }
        })
        .catch((error) => {
            setalert(true)
           
            });
        }
    

    useEffect(() => {
        getAllStudents();
        return ()=>{
            getAllStudents();
        }  
    }, []);

    return (
        loading ? <GetLoading/>
        :
        <>
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
            
            <TopNavNext {...props} texte="Formations"/> 
            {
                alert && <CustomAlert title="Avertissement" texte="vérifier l'état de votre connexion" tbgColor="#F93154" tcolor="#fff" affiche={true} onAlert={(alert)=>onAlert(alert)} alert={alert}/>

            }      
            <ScrollView>
                <Animatable.View animation="bounceIn">
                <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width -40,height: height/2.4,shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5, borderRadius:5,marginHorizontal:20}} resizeMode='cover' />
                </Animatable.View>
                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                <Text style={{color:'#ff8f00',fontSize:12,marginBottom:-7}}>Titre formation</Text>

                <Title style={{color:theme.PRIMARY_TEXT_COLOR}}>{item.titre}</Title>

                <View>
                        <Text style={{color:'#ff8f00',fontSize:11,marginBottom:-7}}>Debut Formation</Text>
                        <Title style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:14}}>{item.beginning}</Title>    
                    </View>
                <View style={{width: width -120,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                    

                    <View>
                        <Text style={{color:'#ff8f00',fontSize:11,marginBottom:-7}}>Début enregistrement</Text>
                        <Title style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:14,marginBottom:0}}>{item.start}</Title>
                    </View>

                    <View>
                        <Text style={{color:'#ff8f00',fontSize:11,marginBottom:-7}}>Fin enregistrement</Text>
                        <Title style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:14}}>{item.end}</Title>    
                    </View>
                    <View>
                        <Text style={{color:'#ff8f00',fontSize:11,marginBottom:-7}}>Prix</Text>
                        <Title style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:14}}>{(item.price !='0.00') ? item.price+' $' : 'Gratuit'}</Title>    
                    </View>
                </View>

                </View>
       <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: '#ff8f00', fontSize:16,marginTop: 10}}>Petit resumé</Title>
       <Text style={{color:theme.PRIMARY_TEXT_COLOR, fontSize:16, paddingHorizontal: 5,paddingVertical:5, textAlign:'justify'}}>{item.content}</Text>
       {
           state ? 
           <Title style={{backgroundColor:'#08ad47', textAlign:'center', fontSize:12,marginHorizontal:20, marginVertical:10, color:theme.PRIMARY_TEXT_COLOR,borderRadius:20,width:width-80}}>vous êtes déjà inscrit!!</Title>
           :
           <TouchableOpacity onPress={()=> props.isConnect ? requete() : props.navigation.navigate('authentification')}>
               <Title style={{backgroundColor:'#ff8f00', textAlign:'center', fontSize:12,marginHorizontal:20, marginVertical:10, color:theme.PRIMARY_TEXT_COLOR,borderRadius:20,width:width-80}}>ça m'intéresse </Title>
           </TouchableOpacity>
       }
       </View>
        
        </ScrollView>
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
  export default connect(mapStateToProps)(TrainingView);