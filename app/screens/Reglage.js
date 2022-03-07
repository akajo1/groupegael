import React,{useState} from 'react'
import { View, Text,Dimensions } from 'react-native'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import TopNavNext from '../components/TopNavNext';
import { Switch, Title } from 'react-native-paper';
import {connect} from 'react-redux';
import {darkTheme,lightTheme} from '../Styled/Theme'
const {width,height} = Dimensions.get('screen');
function Reglage(props) {
   const theme = props.theme
    const [isSwitchOn, setIsSwitchOn] = React.useState((theme.mode == 'dark' ? true : false));

    const onToggleSwitch = () => {
        const action = { type: "SWITCH_THEME", value:''}
        setIsSwitchOn(!isSwitchOn)
        if(theme.mode == 'dark'){
            action.value = lightTheme
        }else{
            action.value = darkTheme
        }
        
         props.dispatch(action)
    };

    return (
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
             <TopNavNext {...props}/>
            <View style={{width,padding:10}}>
            <Text style={{color:'#ff8f00',fontSize:22}}>Reglage</Text>
          
            <View style={{alignItems:'center',flexDirection:'row',marginTop:20}}>
                <Title style={{color: theme.PRIMARY_TEXT_COLOR,marginRight:10}}>Theme sombre</Title>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="orange"/>
            </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Reglage);