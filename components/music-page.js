import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';

export default function MusicPage() {
    const [sound, setSound] = useState()

    async function playSound() {
        //const { sound } = await Audio.Sound.createAsync(require('../assets/kendrickTest.mp3'), {shouldPlay: true})
        //setSound(sound)
        //await sound.playAsync()
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