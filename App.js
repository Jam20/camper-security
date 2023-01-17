import { useState, useEffect } from 'react';
import { View, Text, TabController} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { BluetoothController } from './modules/BluetoothController';
import ConnectedScreen from './components/connected-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View flex paddingT-60 paddingB-32>
        {!connected ? <ConnectedScreen/> : <Text>Not Connected</Text>}
      </View>
    </GestureHandlerRootView>


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
