import React from 'react'
import { View, Text,Image, Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import {connect} from 'react-redux';
import ImageLoad from '../components/ImageLoad'
import TopNavNext from '../components/TopNavNext'
const {width,height} = Dimensions.get('screen');


function ReaderLivre(props) {
  const item= props.route.params.item;
  const theme = props.theme
 
    return (
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
            <TopNavNext {...props} texte="Livres"/>
                
                 
        <ScrollView style={{marginVertical: 10}}>
        <Text style={{color:'#000',backgroundColor:'#ff8f00', padding:5,position:'absolute',top:'9%',left:width/4,zIndex:10,borderBottomRightRadius:15,fontWeight:'700'}}>{(item.price !='0.00') ? item.price+' $' : 'Gratuit'} </Text>

            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width/2, height: height / 3,borderRadius:10,marginTop:'10%',marginLeft:width/4}} resizeMode="cover"/>                
            <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                <Title style={{color:theme.PRIMARY_TEXT_COLOR,marginBottom:0,textAlign:'center'}}>{item.titre}</Title>
                <Text style={{color:theme.second_text_color,fontSize:10,marginTop:0,textAlign:'center',color:'#ff8f00'}}>{item.auteur}</Text>
            </View>
        <View style={{flex:1,paddingHorizontal:20}}>
       <Title style={{color: 'orange', fontSize:16,marginTop: 10}}>Description</Title>
       <Text style={{color:theme.PRIMARY_TEXT_COLOR, fontSize:16, paddingHorizontal: 5,paddingVertical:5, textAlign:'justify'}}>{item.description}</Text>
       <TouchableOpacity onPress={()=> props.isConnect ? props.navigation.navigate('bookreader',{id:item.id}) : props.navigation.navigate('authentification')}>
       <Title style={{backgroundColor:'#ff8f00', textAlign:'center', fontSize:12,marginHorizontal:20, marginVertical:10, color:theme.PRIMARY_TEXT_COLOR,borderRadius:20,width:width-80}}>{(item.price !='0.00') ? 'lire' : 'lire'} </Title>
           </TouchableOpacity>
       </View>
       
        </ScrollView>
       </View>
    )
}
const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(ReaderLivre);