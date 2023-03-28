import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
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
var maxs = [0,0,0,0]


function processSound(chunk, idx) {
    //console.log(chunk)
    const maxOfChunk = Math.max(...chunk)
    if (maxOfChunk > maxs[idx] || maxOfChunk < maxs[idx] / 4) {
        maxs[idx] = (maxs[idx] + maxOfChunk) / 2
    }
    //console.log(max)
    //console.log(maxOfChunk)
    return Math.floor(Math.min((maxOfChunk / maxs[idx]) * 8191, 8191))
}

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
                s.setOnAudioSampleReceived(async (sample) => {
                    const fft = new FFT(sample.channels[0].frames.length)
                    const out = fft.createComplexArray()
                    fft.realTransform(out, sample.channels[0].frames)
                    //console.log(out)
                    const chunk = (arr, size) => arr.reduce((carry, _, index, orig) => !(index % size) ? carry.concat([orig.slice(index, index + size)]) : carry, []);
                    const chunks = chunk(out, sample.channels[0].frames.length/2).map(processSound)

                    console.log(chunks)
                    //console.log("test?")

                    await BluetoothController.sendRequest({
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
        if (!sound) return
        sound.pauseAsync()
        if (isPlaying) setIsPlaying(false)
        const nextSound = songs[songIdx].sound
        if (nextSound) setSound(nextSound)
    }, [songIdx])

    return (
        <View style={styles.container}>
            {
                songs[songIdx].sound &&
                <View flex center marginT-64>
                    <Text text40 color="#ffffff">{songs[songIdx].title}</Text>
                    <Text text50 color="#ffffff">{songs[songIdx].artist}</Text>
                    <View flex spread center row marginT-32>
                        <Button label="Skip Left" onPress={() => setSongIdx((songs.length + songIdx - 1) % songs.length)} />
                        {
                            isPlaying ?
                                <Button label="Pause" onPress={pauseSound} size={Button.sizes.large} marginL-16 marginR-16 /> :
                                <Button label="Play" onPress={playSound} size={Button.sizes.large} marginL-16 marginR-16 />
                        }
                        <Button label="Skip Right" onPress={() => setSongIdx((1 + songIdx) % songs.length)} />
                    </View>
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