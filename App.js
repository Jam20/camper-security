import { useState, useEffect } from 'react';
import {View, TabController, Text} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import HomePage from './components/home-page';
import MusicPage from './components/music-page';
import SettingsPage from './components/settings-page';
import { BluetoothController } from './modules/BluetoothController';



export default function App() {
  var [connected, setConnected] = useState(false)

  useEffect(()=>{
    BluetoothController.connect( async ()=>{
      setConnected(await BluetoothController.isConnected())
    })
  },[])

  

  return (
    <View flex paddingT-60 paddingB-32 >
      <TabController  items={[{label: 'Music' }, {label: 'Home'}, {label: 'Settings'}]}>
       <View flex>
         <TabController.TabPage index={0}>
          <Text>{connected? "Connected" : "Not Connected"}</Text>
          </TabController.TabPage>
         <TabController.TabPage index={1} lazy><HomePage/></TabController.TabPage>
         <TabController.TabPage index={2} lazy><SettingsPage/></TabController.TabPage>
       </View>
       <TabController.TabBar enableShadows />
      </TabController>
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
    paddingBottom: 6
  }
});
