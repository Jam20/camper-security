import { useState } from 'react';
import {Slider, Switch, Text, View} from 'react-native-ui-lib';
import { BluetoothController } from '../modules/BluetoothController';
import AutoMode from './auto-mode';
import LightSlider from './light-slider';
import ManualMode from './manual-mode';

export default function HomePage(props) {
    const [isAutoMode, setIsAutoMode] = useState(false)
    return (
        <View flex paddingT-16 paddingL-32 paddingR-32>

            <View flex spread center row >
                <Text flex text40 centerH $textNeutral numberOfLines={1} >
                    Mode: {isAutoMode ? " Auto" : " Manual"}
                </Text>
                <Switch flex-0 value={isAutoMode} onValueChange={(val)=>setIsAutoMode(val)} width={80} height={38} thumbSize={34}/>
            </View>
            {isAutoMode ? <AutoMode/> : <ManualMode/>}
            {/* <LightSlider label="Running Lights" onValueChange={(value)=> BluetoothController.sendRequest({running: value})}/>
            
            <View flex row>
                <View width={"50%"} paddingR-16>
                    <LightSlider label="Left Turn Lights" onValueChange={(value)=> BluetoothController.sendRequest({left: value})}/>
                </View>
                <View width={"50%"}>
                    <LightSlider label="Right Turn Lights" onValueChange={(value)=> BluetoothController.sendRequest({right: value})}/>
                </View>
            </View>
            
            <LightSlider label="Reverse Lights" onValueChange={(value)=> BluetoothController.sendRequest({reverse: value})}/> */}
        </View>
    )
}