import React from 'react'
import { View, Text, ScrollView, FlatList, Dimensions,Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Style from '../styles'
import {Title} from 'react-native-paper'
import {connect} from 'react-redux';
function More(props) {
  const theme= props.theme
    const _goUrl = (url) => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log('impossible');
          }
        });
      };
    return (
        <View style={[Style.container_fluid,{flexDirection:'row',backgroundColor : theme.bg_global}]}>
           <View style={Style.leftBar}>
           <Text style={[Style.textRotate,{width: 400,color: theme.borderColor, transform:[{ rotate: '-90deg'},{translateY:-165},{translateX:100}]}]}>PLUS</Text>

           </View>
           <View style={Style.rightPart}>
                   <ScrollView style={{flex:1}}>
                   <View style={{flexDirection:'row'}}>
                       <TouchableOpacity onPress={()=> _goUrl('https://groupegael.com/?p=donation')}>
                           <View style={{width:(Dimensions.get('screen').width - 100) / 2, height: Dimensions.get('screen').height / 3, backgroundColor: theme.secondBorderColor,marginRight:5,padding:10}}>
                           <Title style={{fontSize:32, textTransform:'uppercase',position:'absolute', bottom:10,color: theme.second_text_color,left:10}}>don</Title>
                           <Icons name="hand-holding-usd" size={82} style={{textAlign:'right'}} color={theme.second_text_color}/>

                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=>{props.isConnect ? props.navigation.navigate('profil') : props.navigation.navigate('login')}}  >
                           <View style={{width:(Dimensions.get('screen').width - 100) / 2, height: Dimensions.get('screen').height / 3, backgroundColor:'orange',padding:10}}>
                                <Title style={{fontSize:32, textTransform:'uppercase',position:'absolute', bottom:10,left:5,color:theme.PRIMARY_TEXT_COLOR}}>Profil</Title>
                                <Icon name="user" size={82} style={{textAlign:'right'}} color={theme.PRIMARY_TEXT_COLOR}/>

                           </View>
                       </TouchableOpacity>
                   </View>
                   <View style={{flexDirection:'row', marginTop:5}}>
                       <TouchableOpacity onPress={()=> props.navigation.navigate('about')}>
                           <View style={{width:(Dimensions.get('screen').width - 100) / 2, height: Dimensions.get('screen').height / 5, backgroundColor: theme.secondBorderColor,marginRight:5,padding:10}}>
                           <Title style={{fontSize:22, textTransform:'uppercase',position:'absolute', bottom:10, color: theme.second_text_color,left: 10}}>a prôpos</Title>
                           <Icon name="users" size={62} style={{textAlign:'right'}} color={theme.second_text_color}/>

                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=> props.navigation.navigate('activity')}>
                           <View style={{width:(Dimensions.get('screen').width - 100) / 2, height: Dimensions.get('screen').height / 5, backgroundColor: theme.secondBorderColor,padding:10}}>
                           <Icons name="hands" size={62} style={{textAlign:'right'}} color={theme.second_text_color}/>

                           <Title style={{fontSize:16, textTransform:'uppercase',position:'absolute', bottom:10, color: theme.second_text_color,left: 10}}>Nos activités</Title>

                           </View>
                       </TouchableOpacity>
                   </View>
                   <TouchableOpacity onPress={()=> props.navigation.navigate('reglage')}>
                           <View style={{width:Dimensions.get('screen').width - 95, height: Dimensions.get('screen').height / 8, backgroundColor: theme.secondBorderColor,marginTop:5,padding:10}}>
                           <Icon name="cog" size={62} style={{textAlign:'right'}} color={theme.second_text_color}/>
                           <Title style={{fontSize:16, textTransform:'uppercase',position:'absolute', bottom:10, color: theme.second_text_color,left: 10}}>Reglage</Title>

                           </View>
                       </TouchableOpacity>
                   </ScrollView>
           </View>
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
  export default connect(mapStateToProps)(More);