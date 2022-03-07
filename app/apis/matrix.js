import React from 'react'
import {View,Text,Dimensions} from 'react-native'
import Shimmer from 'react-native-shimmer';
const {width,height}= Dimensions.get('screen');
export const meditationShimmer = (theme)=>{
    return (
        <View style={{flexDirection:'row'}}>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2,height: height/4.4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/3,height:15,backgroundColor:theme.borderColor}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2,height: height/4.4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/3,height:15,backgroundColor:theme.borderColor}}/>
            </View>
        </View>
    )
}
export const worshipShimmer = (theme)=>{
    return (
        <View style={{flexDirection:'row'}}>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2,height: height/4.4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2,height: height/4.4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
        </View>
    )
}
export const albumShimmer = (theme)=>{
    return (
       <View style={{width}}>
            <View style={{flexDirection:'row',marginBottom:30}}>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.5,height: height/5,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.5,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/3.5,height:15,backgroundColor:theme.borderColor}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.5,height: height/5,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.5,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/3.5,height:15,backgroundColor:theme.borderColor}}/>
            </View>
        </View>
        <Shimmer  style={{width:width/1.3,backgroundColor:theme.borderColor,marginBottom:10,height:25}}/>
        <Shimmer  style={{width:width/2.2,backgroundColor:theme.borderColor,marginBottom:10,height:20}}/>
        <View style={{width,marginTop:15}}>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:width/1.7,height:40,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />

                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:width/1.7,height:40,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />

                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:width/1.7,height:40,backgroundColor:theme.borderColor,marginRight:10}} />
                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />

                    <Shimmer style={{width:30,height:30,backgroundColor:theme.borderColor,marginRight:10}} />
            </View>
        </View>
       </View>
    )
}

export const livresShimmer = (theme)=>{
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.4,height: height/4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.4,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.4,height: height/4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.4,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.4,height: height/4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.4,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
            <View style={{marginRight:10}}>
                <Shimmer style={{width: width/2.4,height: height/4,borderRadius:5,backgroundColor:theme.borderColor,marginBottom:10}}/>
                <Shimmer style={{width: width/2.4,height:15,backgroundColor:theme.borderColor,marginBottom:10}}/>
            </View>
        </View>
    )
}
export const communauteShimmer = (theme)=>{
    return (
        <View style={{width}}>
                <View style={{flexDirection:'row',backgroundColor:theme.borderColor,justifyContent:'center',padding:20,marginBottom:15}}>
                    <Shimmer style={{width:50,height:50, borderRadius:25,backgroundColor:theme.bg_global,marginRight:15}} />
                    <View>
                        <Shimmer style={{width:width/1.4,height:80,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/1.8,height:15,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/3,height:10,backgroundColor:theme.bg_global,marginBottom:10}} />
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:theme.borderColor,justifyContent:'center',padding:20,marginBottom:15}}>
                    <Shimmer style={{width:50,height:50, borderRadius:25,backgroundColor:theme.bg_global,marginRight:15}} />
                    <View>
                        <Shimmer style={{width:width/1.4,height:80,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/1.8,height:15,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/3,height:10,backgroundColor:theme.bg_global,marginBottom:10}} />
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:theme.borderColor,justifyContent:'center',padding:20,marginBottom:15}}>
                    <Shimmer style={{width:50,height:50, borderRadius:25,backgroundColor:theme.bg_global,marginRight:15}} />
                    <View>
                        <Shimmer style={{width:width/1.4,height:80,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/1.8,height:15,backgroundColor:theme.bg_global,marginBottom:10}} />
                        <Shimmer style={{width:width/3,height:10,backgroundColor:theme.bg_global,marginBottom:10}} />
                    </View>
                </View>
        </View>
    )
}
export const friendShimmer = (theme)=>{
    return (
        <View style={{width}}>
            <View style={{flexDirection:'row',marginBottom:15,backgroundColor:theme.borderColor,padding:20}}>
                <Shimmer  style={{width: 30,height:30,backgroundColor:theme.bg_global,marginRight:10}}/>
                <Shimmer style={{width:width/1.5,height:30,backgroundColor:theme.bg_global}} />
            </View>
            <View style={{flexDirection:'row',marginBottom:15,backgroundColor:theme.borderColor,padding:20}}>
                <Shimmer  style={{width: 30,height:30,backgroundColor:theme.bg_global,marginRight:10}}/>
                <Shimmer style={{width:width/1.5,height:30,backgroundColor:theme.bg_global}} />
            </View>
            <View style={{flexDirection:'row',marginBottom:15,backgroundColor:theme.borderColor,padding:20}}>
                <Shimmer  style={{width: 30,height:30,backgroundColor:theme.bg_global,marginRight:10}}/>
                <Shimmer style={{width:width/1.5,height:30,backgroundColor:theme.bg_global}} />
            </View>
            <View style={{flexDirection:'row',marginBottom:15,backgroundColor:theme.borderColor,padding:20}}>
                <Shimmer  style={{width: 30,height:30,backgroundColor:theme.bg_global,marginRight:10}}/>
                <Shimmer style={{width:width/1.5,height:30,backgroundColor:theme.bg_global}} />
            </View>
            <View style={{flexDirection:'row',marginBottom:15,backgroundColor:theme.borderColor,padding:20}}>
                <Shimmer  style={{width: 30,height:30,backgroundColor:theme.bg_global,marginRight:10}}/>
                <Shimmer style={{width:width/1.5,height:30,backgroundColor:theme.bg_global}} />
            </View>
        </View>
    )
}