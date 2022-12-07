import { useState, useEffect } from 'react';
import { View, Text, Slider } from 'react-native-ui-lib';
import { BluetoothController } from '../modules/BluetoothController';

const maxVal = 8191
const minVal = 1

export default function HomePage(props) {
    const [running, setRunning] = useState(minVal)
    const [left, setLeft] = useState(minVal)
    const [right, setRight] = useState(minVal)
    const [reverse, setReverse] = useState(minVal)
    const [canSend, setCanSend] = useState(true)

    useEffect(async () => {
        if(!canSend){
            await new Promise(resolve => setTimeout(resolve, 200))
            setCanSend(true)
        }
    }, [canSend])
    useEffect(async () => {
        if(!canSend) return
        BluetoothController.sendRequest(running,left,right,reverse)
        setCanSend(false)
    }, [running, left, right, reverse])

    return (
        <View flex paddingT-32 paddingB-32 paddingL-32 paddingR-32>
            <View paddingB-64 >
                <Text h1 centerH>Running Lights</Text>
                <Slider 
                    value={minVal}
                    onValueChange={(value) => {setRunning(Math.round(value))}}
                    minimumValue={minVal}
                    maximumValue={maxVal}
                 />
                <Text bodySmall centerH $textNeutral numberOfLines={1}>
                  {Math.round(((running-minVal)*100)/(maxVal-minVal))}
                </Text>     
            </View>
            <View row paddingB-64>
                <View width={"50%"} paddingR-16>
                <Text h1 centerH>Left Turn Lights</Text>
                    <Slider 
                        value={minVal}
                        onValueChange={(value) => {setLeft(Math.round(value))}}
                        minimumValue={minVal}
                        maximumValue={maxVal}
                     />
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                      {Math.round(((left-minVal)*100)/(maxVal-minVal))}
                    </Text>    
                </View>
                <View width={"50%"}>
                <Text h1 centerH>Right Turn Lights</Text>
                    <Slider 
                        value={minVal}
                        onValueChange={(value) => {setRight(Math.round(value))}}
                        minimumValue={minVal}
                        maximumValue={maxVal}
                     />
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                      {Math.round(((right-minVal)*100)/(maxVal-minVal))}
                    </Text>               
                </View>  
            </View>
            <View paddingB-6 >
                <Text h1 centerH>Reverse Lights</Text>
                <Slider 
                    value={minVal}
                    onValueChange={(value) => {setReverse(Math.round(value))}}
                    minimumValue={minVal}
                    maximumValue={maxVal}
                 />
                <Text bodySmall centerH $textNeutral numberOfLines={1}>
                  {Math.round(((reverse-minVal)*100)/(maxVal-minVal))}
                </Text>     
            </View>

        </View>
    )
}