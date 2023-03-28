import { useState, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { BluetoothController } from './modules/BluetoothController';
import ConnectedScreen from './components/connected-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DisconnectedScreen from './components/disconnected-screen';
import { Colors } from 'react-native-ui-lib'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


Colors.loadColors({
  primary: '#fa8c64'
})
export default function App() {
  var [connected, setConnected] = useState(false)

  useEffect(() => {
    BluetoothController.connect(async () => {
      setConnected(await BluetoothController.isConnected())
    })
    setInterval(async () => {
      if (await BluetoothController.isConnected()) return
      setConnected(false)
      BluetoothController.connect(async () => {
        setConnected(await BluetoothController.isConnected())
      })
    }, 5000)
  }, [])



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View paddingT-16 paddingB-32 style={styles.container}>
        {connected ? <ConnectedScreen /> : <DisconnectedScreen />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingBottom: 6
  }
});
