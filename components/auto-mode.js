import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, DateTimePicker, RadioButton, Slider, View, Text, Switch} from 'react-native-ui-lib';
import { RadioGroup } from 'react-native-ui-lib/src/components/radioGroup';
import { BluetoothController } from '../modules/BluetoothController';

export default function AutoMode(props) {
    const [timingMode, setTimingMode] = useState('timer')
    const [currentTimer, setCurrentTimer] = useState(1)
    const [isAccelOn, setIsAccelOn] = useState(false)
    function onTimerValChange() {

        BluetoothController.sendRequest({
            startTime: 0,
            endTime: Math.floor(currentTimer*60)
        })
    }
    return (
        <View flex-2>
            <RadioGroup width={200} initialValue={timingMode} onValueChange={(val) => setTimingMode(val)}>
                <RadioButton value={'timer'} label={'Timer'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'schedule'} label={'Schedule'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'night'} label={'Nighttime'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
            </RadioGroup>
            <Slider
                value={1}
                minimumTrackTintColor={Colors.primary}
                thumbTintColor={Colors.primary}
                onValueChange={(val) => {
                    setCurrentTimer(val)
                }}
                minimumValue={1}
                maximumValue={1440}
            />  
             <Text bodySmall centerH $textNeutral numberOfLines={1}>
                {`${Math.floor(currentTimer/60)} hours, ${Math.floor(currentTimer%60)} minutes`}
            </Text>
            <Button label="Set Timer" onPress={()=> {onTimerValChange()}}/>
            <Switch value={isAccelOn} onValueChange={(value) => {
                setIsAccelOn(value)
                BluetoothController.sendRequest({enable: value})
            }
            }/>     
        </View>
    )
}

const styles = StyleSheet.create({
    radioText: {
        color: "white"
    }
});