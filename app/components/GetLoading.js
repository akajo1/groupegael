import React from 'react'
import { View,Dimensions} from 'react-native'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
const {width,height} = Dimensions.get('screen');
const GetLoading = (props) => {
    const theme = props.theme
    return (
        <View style={{width,height,justifyContent:'center',alignItems:'center',backgroundColor: theme.bg_global,position:'absolute',top:0,left:0}}>
            <LottieView source={require('../assets/lf30_editor_hganey22.json')} autoPlay loop style={{width: 200}}/>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      theme: state.themeReducers.theme,
   
    };
  };
  export default connect(mapStateToProps)(GetLoading);
