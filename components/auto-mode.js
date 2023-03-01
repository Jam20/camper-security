import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Colors, RadioButton, View} from 'react-native-ui-lib';
import { RadioGroup } from 'react-native-ui-lib/src/components/radioGroup';
import { BluetoothController } from '../modules/BluetoothController';

export default function AutoMode(props) {
    const [timingMode, setTimingMode] = useState('timer')
    return (
        <View flex-2>
            <RadioGroup initialValue={timingMode} onValueChange={(val) => setTimingMode(val)}>
                <RadioButton value={'yes'} label={'Timer'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16/>
                <RadioButton value={'no'} label={'Schedule'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16/>
                <RadioButton value={'maybe'} label={'Nighttime'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16/>
                <RadioButton value={'fuck'} label={'Ambient'} color={Colors.primary} labelStyle={styles.radioText} />
            </RadioGroup>
        </View>
    )
}

const styles = StyleSheet.create({
    radioText: {
      color: "white"
    }
  });