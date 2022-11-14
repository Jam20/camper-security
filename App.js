import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager()
export default function App() {
  var [deviceNames, setDeviceNames] = useState([])

  const scanAndConnect = ()=> {
    manager.startDeviceScan(null, null, (error, device)=>{
      if(error) return 
      setDeviceNames([...deviceNames, device.name])
      if(device.name === "DEVICE NAME" || device.name === "OTHER NAME"){
        manager.stopDeviceScan()
        device.connect()
        .then(()=>{
          return device.discoverAllServicesAndCharacteristics()
        }).then(()=>{

        }).catch(()=>{
          //if error occurs during connection
        })
      }
    })
  }

  useEffect(()=>{
    const subscription =manager.onStateChange((state)=>{
      if(state === "PoweredOn"){
        scanAndConnect()
        subscription.remove()
      }
    },true)
  },[])


  return (
    <View style={styles.container} >
      <Text>This is a dummy app and I will test BLE </Text>
      <Text>Found Devices: {deviceNames.count == 0 ? "NONE": deviceNames} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingBottom: 2
  }
});
