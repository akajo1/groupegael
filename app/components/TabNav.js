import React from 'react'
import { View, Text,TouchableOpacity,Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height} = Dimensions.get('screen');
import {connect} from 'react-redux';
function TabNav({page,onchangePage,theme,navigation,isConnect}) {
   
    return (
        <View style={{width,height: height/15,backgroundColor:theme.tabBarColor,position:'absolute',bottom:0,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> onchangePage('ministries')}>
                <View style={{alignItems:'center',justifyContent:'center',width: width/5,borderBottomColor: (page == 'ministries') ? '#ffa000' : theme.tabBarElement,borderBottomWidth:(page == 'ministries') ? 2 : 0}}>
                    <Icon name="praying-hands" color={(page == 'ministries') ? '#ffa000' : theme.tabBarElement} size={24}/>
                    <Text style={{color:(page == 'ministries') ? '#ffa000' : theme.tabBarElement,textTransform:'uppercase',fontSize:8}}>Ministères</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onchangePage('musiques')}>
                <View style={{alignItems:'center',justifyContent:'center',width: width/5,borderBottomColor: (page == 'musiques') ? '#ffa000' : theme.tabBarElement,borderBottomWidth:(page == 'musiques') ? 2 : 0}}>
                    <Icon name="music" color={(page == 'musiques') ? '#ffa000' : theme.tabBarElement} size={24}/>
                    <Text style={{color:(page == 'musiques') ? '#ffa000' : theme.tabBarElement,textTransform:'uppercase',fontSize:8}}>musiques</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> (isConnect) ? onchangePage('communautes') : navigation.navigate('login')}>
                <View style={{alignItems:'center',justifyContent:'center',width: width/5,borderBottomColor: (page == 'communautes') ? '#ffa000' : theme.tabBarElement,borderBottomWidth:(page == 'communautes') ? 2 : 0}}>
                    <Icon name="comments" color={(page == 'communautes') ? '#ffa000' : theme.tabBarElement} size={24}/>
                    <Text style={{color:(page == 'communautes') ? '#ffa000' : theme.tabBarElement,textTransform:'uppercase',fontSize:8}}>communautés</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onchangePage('formations')}>
                <View style={{alignItems:'center',justifyContent:'center',width: width/5,borderBottomColor: (page == 'formations') ? '#ffa000' : theme.tabBarElement,borderBottomWidth:(page == 'formations') ? 2 : 0}}>
                    <Icon name="user-graduate" color={(page == 'formations') ? '#ffa000' : theme.tabBarElement} size={24}/>
                    <Text style={{color:(page == 'formations') ? '#ffa000' : theme.tabBarElement,textTransform:'uppercase',fontSize:8}}>formations</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onchangePage('plus')}>
                <View style={{alignItems:'center',justifyContent:'center',width: width/5,borderBottomColor: (page == 'plus') ? '#ffa000' : theme.tabBarElement,borderBottomWidth:(page == 'plus') ? 2 : 0}}>
                    <Icon name="ellipsis-h" color={(page == 'plus') ? '#ffa000' : theme.tabBarElement} size={24}/>
                    <Text style={{color:(page == 'plus') ? '#ffa000' : theme.tabBarElement,textTransform:'uppercase',fontSize:8}}>plus</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
      theme: state.themeReducers.theme,
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
    };
  };
  export default connect(mapStateToProps)(TabNav);