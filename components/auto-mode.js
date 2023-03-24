import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, DateTimePicker, PickerModes, RadioButton, View } from 'react-native-ui-lib';
import { RadioGroup } from 'react-native-ui-lib/src/components/radioGroup';
import { BluetoothController } from '../modules/BluetoothController';

export default function AutoMode(props) {
    const [timingMode, setTimingMode] = useState('timer')

    function onTimerValChange(val) {
        const diff = 68400000-Math.abs(val.getTime())
        BluetoothController.sendRequest({
            startTime: 0,
            endTime: Math.floor(diff/1000)
        })
    }
    return (
        <View flex-2>
            <RadioGroup width={200} initialValue={timingMode} onValueChange={(val) => setTimingMode(val)}>
                <RadioButton value={'yes'} label={'Timer'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'no'} label={'Schedule'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'maybe'} label={'Nighttime'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'fuck'} label={'Ambient'} color={Colors.primary} labelStyle={styles.radioText} />
            </RadioGroup>
            <DateTimePicker migrate value={new Date(0)} title={"Select time"} placeholder={"Placeholder"} mode={'countdown'} onChange={(val => onTimerValChange(val))} />

        </View>
    )
}

const styles = StyleSheet.create({
    radioText: {
        color: "white"
    }
});