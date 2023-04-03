import { Text, TextInput, View, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function MainScreen ({navigation}) {
  const [inputText, setInputText] = useState('');
  const [inputScan, setInputScan] = useState('');
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handlePress = () => {
    if (inputText.length === 0)
      return;
    navigation.navigate('QRCode', {inputText});
    setInputText('')
  }

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    BackHandler.addEventListener('hardwareBackPress', () => {
      setScanActive(false);
      return true;
    })

    getBarCodeScannerPermissions();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress')
    }
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setInputScan(data);
    setScanActive(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.mainBody}>
      <Text style={styles.title}>Generate or Scan your QR-code</Text>
      <TextInput 
        style={styles.input}
        value={inputText}
        onChangeText={ (inputText) => {
          setInputText(inputText)
        }}
      />
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          activeOpacity={0.5}
          onPress={handlePress}
        >
          <Text style={styles.buttonTextStyle}>
            Generate QR-code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          activeOpacity={0.5}
          onPress={() => setScanActive(true)}
        >
          <Text style={styles.buttonTextStyle}>
            Scan
          </Text>
        </TouchableOpacity>
      </View>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={{...StyleSheet.absoluteFillObject, display: scanActive ? 'flex' : 'none'}}
      /> 
      {
        inputScan 
        ?
        <>
        <Text style={[styles.title, styles.titleRes]}>Result of scan</Text>
          <TextInput 
            style={[styles.input, styles.inputRes]}
            value={inputScan}
            readonly
            onChangeText={ (inputText) => {
              setInputScan(inputText)
            }}
          />     
        </>
        :
        <></>
      }

           
    </View>
  )
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    color: 'white',

    textAlign: 'center',

    marginBottom: 100
  },
  buttonStyle: {
    backgroundColor: 'black',
    color: 'white',

    alignItems: 'center',

    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 5,

    marginTop: 15,

    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',

    paddingVertical: 10
  },
  input: {
    fontSize: 20,
    color: 'white',

    width: '90%',

    padding: 10,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: 'white',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  titleRes: {
    marginTop: 10,
    marginBottom: 10
  }
});

