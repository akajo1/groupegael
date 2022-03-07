import React,{useState} from 'react'
import { View, Text,Dimensions } from 'react-native'
import PDFView from 'react-native-view-pdf';
import GetLoading from '../components/GetLoading';
const {width,height}= Dimensions.get('screen');
export default function BookReader(props) {
    const [wait,setwait]=useState(false)
    const resources = {
        file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
        url: 'https://api.groupegael.com/storage/produits/'+props.route.params.id+'.pdf',
        base64: 'JVBERi0xLjMKJcfs...',
      };
    const resourceType = 'url';
    return (
        <View style={{ flex: 1, backgroundColor:'#000'}}>
        {
            wait ? <Text>Veuillez patienter pendant le chargement du livre</Text> : null
        }
        <PDFView
          fadeInDuration={250.0}
          style={{ height,width }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => setwait(true)}
          onError={(error) => console.log('Cannot render PDF', error)}
          
        />
      </View>
    )
}
