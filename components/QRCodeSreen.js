import { Pressable, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from 'react-native-root-toast';
import QRCode from 'react-native-qrcode-svg';
import { useState, useEffect } from 'react';

export default function QRCodeScreen ({route, navigation}) {
  const QR = route.params.inputText;
  const [QRref, setQRref] = useState();
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(()=>{
    (async ()=>{ setHasPermissions((await MediaLibrary.requestPermissionsAsync()).granted) })()
  }, [])

  const saveQRCode = ()=>{
    if(!hasPermissions || !QRref) return

    QRref.toDataURL(async data =>{
      const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
      await FileSystem.writeAsStringAsync(QRCodeImg, data, { encoding: FileSystem.EncodingType.Base64 })
      MediaLibrary.saveToLibraryAsync(QRCodeImg)
      .then(()=> Toast.show("QR Code saved to gallery", Toast.durations.LONG))
      .catch(console.error)
    })
  }

  return (
    <View style={styles.container}>          
      <View style={styles.qr}>
        <Pressable onPress={saveQRCode}>
          { QR && 
            <QRCode 
              size={240} 
              value={QR} 
              getRef={setQRref} 
              backgroundColor="#fff"
            /> 
          }
        </Pressable>
      </View>
      { QR && 
        <TouchableOpacity
          style={[styles.buttonStyle]}
          activeOpacity={0.5}
          onPress={saveQRCode}
        >
          <Text style={styles.buttonTextStyle}>
            Save QR-code
          </Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  qr:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
  },

  instraction:{
    marginTop: 40,
    color: "#adadad"
  },

  instraicon:{
    color: "#bf88f3"
  },
  buttonStyle: {
    backgroundColor: 'black',
    color: 'white',

    alignItems: 'center',

    borderRadius: 30,

    paddingHorizontal: 30,
    paddingVertical: 5,

    marginTop: 50,

    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',

    paddingVertical: 10
  }
});