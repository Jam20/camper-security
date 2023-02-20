import { useState } from 'react';
import {Switch, Text, View} from 'react-native-ui-lib';
import AutoMode from './auto-mode';
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
        </View>
    )
}