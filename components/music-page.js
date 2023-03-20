import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { Audio } from 'expo-av';
import FFT from 'fft.js'
import { BluetoothController } from '../modules/BluetoothController';

const songs = [
    {
        title: "Never Gonna Give You Up",
        artist: "Rick Astley",
        file: require(`../assets/rickroll.mp3`)
    },
    {
        title: 'Piano Man',
        artist: 'Billy Joel',
        file: require('../assets/piano.mp3')
    },
    {
        title: "Sweet Child 'O Mine",
        artist: "Guns and Roses",
        file: require('../assets/sweet.mp3')
    },
    {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        file: require('../assets/bohemian.mp3')
    }


]

export default function MusicPage() {
    const [sound, setSound] = useState()
    const [songIdx, setSongIdx] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)


    async function playSound() {
        if (!sound) return
        await sound.playAsync()
        setIsPlaying(true)
        console.log("set")
    }

    async function pauseSound() {
        await sound.pauseAsync()
        setIsPlaying(false)
    }

    useEffect(() => {
        const createSounds = async () => {
            const sounds = await Promise.all(songs.map(async (song) => {
                const s = (await Audio.Sound.createAsync(song.file)).sound
                s.setOnAudioSampleReceived((sample) => {
                    //console.log(sample.channels[0].frames.length)
                    const fft = new FFT(4096)
                    const out = fft.createComplexArray()
                    fft.realTransform(out, sample.channels[0].frames)
                    const chunk = (arr, size) => arr.reduce((carry, _, index, orig) => !(index % size) ? carry.concat([orig.slice(index, index + size)]) : carry, []);
                    const chunks = chunk(out, 2048).map((array) => Math.max(...array)).map((val) => val / 350 * 8191 + 1024)
                    BluetoothController.sendRequest({
                        running: chunks[0],
                        left: chunks[1],
                        right: chunks[2],
                        reverse: chunks[3]
                    })
                })
                return s
            }))
            songs.forEach((song, idx) => {
                song.sound = sounds[idx]
            })
            setSound(songs[songIdx].sound)

        }
        createSounds()
    }, [])

    useEffect(() => {
        sound.pauseAsync()
        if (isPlaying) setIsPlaying(false)
        const nextSound = songs[songIdx].sound
        if (nextSound) setSound(nextSound)
    }, [songIdx])

    return (
        <View style={styles.container}>
            {
                songs[songIdx].sound &&
                <View flex spread center row>
                    <Button label="Skip Left" onPress={() => setSongIdx((songs.length + songIdx - 1) % songs.length)} />
                    {
                        isPlaying ?
                            <Button label="Pause" onPress={pauseSound} size={Button.sizes.large} marginL-16 marginR-16 /> :
                            <Button label="Play" onPress={playSound} size={Button.sizes.large} marginL-16 marginR-16 />
                    }
                    <Button label="Skip Right" onPress={() => setSongIdx((1 + songIdx) % songs.length)} />
                </View>
            }

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