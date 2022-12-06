import { useState, useEffect } from 'react';
import {View, TabController, Text, Button, TextField, Assets} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import HomePage from './components/home-page';
import MusicPage from './components/music-page';
import SettingsPage from './components/settings-page';
import { BluetoothController } from './modules/BluetoothController';



export default function App() {
  var [status, setStatus] = useState(null)
  var [connected, setConnected] = useState(false)
  var [writeValue, setWriteValue] = useState("")
  var [readValue, setReadValue] = useState("NOTHING")

  useEffect(()=>{
    
    
    BluetoothController.connect( async ()=>{
      setConnected(BluetoothController.isConnected())
      //await new Promise(resolve => setTimeout(resolve, 8000));
      //await BluetoothController.sendRequest(39,0,0,0)
      setStatus(await BluetoothController.getStatus())
    })
  },[])

  

  return (
    <View flex paddingT-60 paddingB-32 >
      <TabController  items={[{label: 'Music' }, {label: 'Home'}, {label: 'Settings'}]}>
       <View flex>
         <TabController.TabPage index={0}><MusicPage/></TabController.TabPage>
         <TabController.TabPage index={1} lazy><HomePage sendRequest={BluetoothController.sendRequest}/></TabController.TabPage>
         <TabController.TabPage index={2} lazy><SettingsPage/></TabController.TabPage>
       </View>
       <TabController.TabBar enableShadows />
      </TabController>
    </View>

    // <View style={styles.container} >
    //   <Text>This is a dummy app and I will test BLE </Text>
    //   <Text>Connected: {connected? "true" : "false"} </Text>
    
    //   {status != null && <Text>Running:{status.running} Left:{status.left} Right:{status.right} Reverse {status.reverse}</Text>}
    //   <Button label='Read Status' onPress={async ()=>{setStatus(await BluetoothController.getStatus())}}/>
    //   <Button label='Turn Off' onPress={async ()=>{await BluetoothController.sendRequest(0,0,0,0)}}/>      
    //   <Button label='Turn On' onPress={async ()=>{await BluetoothController.sendRequest(1,0,0,0)}}/>
      
    // </View>

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
    paddingBottom: 6
  }
});
