import { useState, useEffect } from 'react';
import { View, Text, TabController} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { BluetoothController } from './modules/BluetoothController';
import ConnectedScreen from './components/connected-screen';
import SettingsPage from './components/settings-page';
import HomePage from './components/home-page';
import MusicPage from './components/music-page';
export default function App() {
  var [connected, setConnected] = useState(false)

  useEffect(()=>{
    BluetoothController.connect( async ()=>{
      setConnected(await BluetoothController.isConnected())
    })
    setInterval(async () => {
      if(await BluetoothController.isConnected()) return
      setConnected(false)
      BluetoothController.connect(async () => {
        setConnected(await BluetoothController.isConnected())
      })
    },5000)
  },[])

  

  return (
    <View flex paddingT-60 paddingB-32>
      {connected ? <ConnectedScreen/> : <Text>Not Connected</Text>}
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
