import { View } from 'react-native-ui-lib';
import { BluetoothController } from '../modules/BluetoothController';
import LightSlider from './light-slider';
import { useEffect, useState } from 'react';

 
function scaleValue(val, factor) {
    return 8191 - Math.floor(val * factor)
}
export default function ManualMode(props) {
    const [maxBrightness, setMaxBrightness] = useState(1)
    const [left, setLeft] = useState(1)
    const [right, setRight] = useState(1)
    const [running, setRunning] = useState(1)
    const [reverse, setReverse] = useState(1)
    
    useEffect(()=> {
        BluetoothController.sendRequest({
            running: scaleValue(running, maxBrightness),
            left: scaleValue(left, maxBrightness),
            right: scaleValue(right, maxBrightness),
            reverse: scaleValue(reverse, maxBrightness)
        })
    }, [left, right, running, reverse, maxBrightness])

    return (
        <View flex-2>
            <LightSlider label="Max Brightness" value={8191} onValueChange= {(value) => setMaxBrightness(value/8192)}/>

            <LightSlider label="Running Lights" onValueChange={setRunning} />

            <View flex row>
                <View width={"50%"} paddingR-16>
                    <LightSlider label="Left Turn Lights" onValueChange={(value) => setLeft(value)} />
                </View>
                <View width={"50%"}>
                    <LightSlider label="Right Turn Lights" onValueChange={(value) => setRight(value)} />
                </View>
            </View>

            <LightSlider label="Reverse Lights" onValueChange={(value) => setReverse(value)} />
        </View>
    )
}