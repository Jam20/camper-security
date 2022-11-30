import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothController } from './modules/BluetoothController';

export default function App() {
  var [status, setStatus] = useState(null)
  var [connected, setConnected] = useState(false)
  console.log(status)
  useEffect(()=>{
    
    BluetoothController.connect( async ()=>{
      setConnected(BluetoothController.isConnected())
      await new Promise(resolve => setTimeout(resolve, 8000));
      await BluetoothController.sendRequest(39,0,0,0)
      setStatus(await BluetoothController.getStatus())
    })
  },[])




  return (
    <View style={styles.container} >
      <Text>This is a dummy app and I will test BLE </Text>
      <Text>Connected: {connected? "true" : "false"} </Text>
      {status != null && <Text>Running:{status.running} Left:{status.left} Right:{status.right} Reverse {status.reverse}</Text>}
      <Button title='Read Status' onPress={async ()=>{setStatus(await BluetoothController.getStatus())}}/>
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
