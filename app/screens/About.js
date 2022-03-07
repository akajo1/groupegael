import React from 'react'
import { View, Text,StyleSheet,Image,Dimensions,ScrollView, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import GetLoading from '../components/GetLoading';
import Styles from '../styles'
const {width,height}= Dimensions.get('screen');
export default function About(props) {
    return (
        <ScrollView style={{backgroundColor:'#000'}}>
            <View style={{...StyleSheet.absoluteFill}}>
                <Image source={require('../assets/backlog.png')} />
            </View>
            <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 40, left: 20,zIndex:10}}>
            <Icon name="chevron-left" color="orange" size={32} />
            </TouchableOpacity>
            <Animatable.View  animation="bounceIn" style={{width,justifyContent:'center',alignItems:'center',marginBottom:50,marginTop:20}}>
              <Image source={require('../assets/logo_.png')} resizeMode="cover" style={{width:160, height:80}} />
            </Animatable.View>
            <View style={{paddingHorizontal:10}}>
            <Title style={{color:'orange',fontSize:26,marginBottom:10}}>Qui sommes-nous ?</Title>
            <Paragraph style={{color:'#fff',fontSize:16}}>
            Crée le 17 MARS 1998 par l'initiative du frère ALAIN MOLOTO KOSSY, le Groupe Adorons l'Eternel, en sigle GAEL, est un ensemble des ministères œuvrant auprès du Corps du Christ dans le domaine de la louange et de l'adoration.
            </Paragraph>
            <Image source={{uri: 'https://groupegael.com/resources/img/alain-moloto.jpg'}} resizeMode="cover" style={{width:width- 20,height: height/3,marginVertical:20}} />
            <Title style={{color:'orange',fontSize:22,marginBottom:10}}>Notre vision</Title>

<Paragraph style={{color:'#fff',fontSize:22,fontWeight:'700'}}>UNE ARMÉE DES INTIMES DE L'ETERNEL</Paragraph>
<Image source={{uri: 'https://groupegael.com/resources/img/bg-7.jpg'}} resizeMode="cover" style={{width:width- 20,height: height/3,marginVertical:20}} />
<Paragraph style={{color:'#fff',fontSize:16}}>
Nous visons un corps du Christ fort et stable dans sa relation avec Dieu et conscient des richesses d'une vie d'adorateur sur le plan personnel et communautaire (l'Eglise et la nation).
</Paragraph>
<Paragraph style={{color:'#fff',fontSize:16}}>Nous existons pour participer à la restauration et au dynamisme de louange et de l'adoration dans le corps du Christ par l'utilisation des moyens de communication médiatique, littéraire et phonographique.
</Paragraph>
<Paragraph style={{color:'#fff',fontSize:16}}>
« Au-delà des mots, une vie attend d'être vécue. »
</Paragraph>
<Title style={{color:'orange',fontSize:22,marginBottom:10}}>Notre mission</Title>
<Paragraph style={{color:'#fff',fontSize:22,fontWeight:'700'}}>
ÂGIR À LA RESTAURATION ET AU DYNAMISME DE L'ADORATION DANS LE CORPS DU CHRIST
</Paragraph>
<Paragraph style={{color:'#fff',fontSize:16}}>Nous travaillons à restaurer et maintenir une qualité de vie d'adorateur de manière personnelle, familiale et communautaire pour les chrétiens dans les nations.</Paragraph>
<Paragraph style={{color:'#fff',fontSize:16}}>
Nous mettons l'expérience acquise avec le temps à la disposition des églises locales désireuses d'un meilleur équipement pour leurs musiciens.
</Paragraph>
<Paragraph style={{color:'#fff',fontSize:16}}>
Nous recrutons les adorateurs de Jésus-Christ dans toutes générations quel que soit l'âge et l'occupation
</Paragraph>
<Image source={{uri: 'https://groupegael.com/resources/img/bg-10.jpg'}} resizeMode="cover" style={{width:width- 20,height: height/3,marginVertical:20}} />


            </View>
        </ScrollView>
    )
}
