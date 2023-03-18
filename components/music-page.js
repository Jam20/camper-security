import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { Audio } from 'expo-av';
import FFT from 'fft.js'
import { BluetoothController } from '../modules/BluetoothController';
export default function MusicPage() {
    const [sound, setSound] = useState()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/rickroll.mp3'), {shouldPlay: true})
        setSound(sound)
        sound.setOnAudioSampleReceived((sample)=> {
            //console.log(sample.channels[0].frames.length)
            const fft = new FFT(4096)
            const out = fft.createComplexArray()
            fft.realTransform(out, sample.channels[0].frames)
            const chunk = (arr, size) => arr.reduce((carry, _, index, orig) => !(index % size) ? carry.concat([orig.slice(index,index+size)]) : carry, []);
            const chunks = chunk(out,2048).map((array) => Math.max(...array)).map((val)=> val/350*8191+1024)
            BluetoothController.sendRequest({
                running: chunks[0],
                left: chunks[1],
                right: chunks[2],
                reverse: chunks[3]
            })
        })
        await sound.playAsync()
    }
    async function pauseSound(){
        console.log("pausing")
        console.log("sound")
        await sound.pauseAsync()
        console.log("paused")
    }

    useEffect(() => {
        return sound ? ()=> {
           sound.unloadAsync()
        } : undefined
    }, [sound])

    return(
        <View style={styles.container}>
            <Button label="Play" onPress={playSound} size={Button.sizes.large} marginB-32/>
            <Button label="Pause" onPress={pauseSound} size={Button.sizes.large}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333',
      //alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      paddingBottom: 6
    }
  });