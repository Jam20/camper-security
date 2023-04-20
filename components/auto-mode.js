import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, RadioButton, Slider, View, Text, Switch} from 'react-native-ui-lib';
import { RadioGroup } from 'react-native-ui-lib/src/components/radioGroup';
import { BluetoothController } from '../modules/BluetoothController';

export default function AutoMode(props) {
    const [timingMode, setTimingMode] = useState('timer')
    const [currentTimer, setCurrentTimer] = useState(1)
    const [currentScheduleStart, setCurrentScheduleStart] = useState(0)
    const [currentScheduleEnd, setCurrentScheduleEnd] = useState(0)
    
    function onTimerValChange() {

        BluetoothController.sendRequest({
            startTime: 0,
            endTime: Math.floor(currentTimer*60)
        })
    }
    function onScheduleValChange(){
        const today = new Date()
        const currentTime = today.getHours()*60 + today.getMinutes()
        const start = currentTime > currentScheduleStart ? 1440 - currentTime + currentScheduleStart : currentScheduleStart - currentTime
        const end =  currentScheduleStart > currentScheduleEnd ? 1440 - currentScheduleStart + currentScheduleEnd : currentScheduleEnd - currentScheduleStart
        BluetoothController.sendRequest({
            startTime: Math.floor(start*60),
            endTime: Math.floor(end*60)
        })
    }
    return (
        <View flex-2>
            <RadioGroup width={200} initialValue={timingMode} onValueChange={(val) => setTimingMode(val)}>
                <RadioButton value={'timer'} label={'Timer'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'schedule'} label={'Schedule'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
                <RadioButton value={'night'} label={'Nighttime'} color={Colors.primary} labelStyle={styles.radioText} paddingB-16 />
            </RadioGroup>

            {timingMode == 'timer' &&
                <View>
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
                </View>
            }
            {timingMode == 'schedule' &&
                <View>
                    <Slider
                        value={1}
                        minimumTrackTintColor={Colors.primary}
                        thumbTintColor={Colors.primary}
                        onValueChange={(val) => {
                            setCurrentScheduleStart(val)
                        }}
                        minimumValue={0}
                        maximumValue={1440}
                    />  
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                        {`Start Time: ${Math.floor(currentScheduleStart/60)%12 == 0 ? 12: Math.floor(currentScheduleStart/60)%12}:${(Math.floor(currentScheduleStart%60)<10? "0": "") + Math.floor(currentScheduleStart%60)} ${Math.floor(currentScheduleStart/60)>12 ? "pm": "am"}`}
                    </Text>
                    <Slider
                        value={1}
                        minimumTrackTintColor={Colors.primary}
                        thumbTintColor={Colors.primary}
                        onValueChange={(val) => {
                            setCurrentScheduleEnd(val)
                        }}
                        minimumValue={0}
                        maximumValue={1440}
                    />  
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                        {`End Time: ${Math.floor(currentScheduleEnd/60)%12 == 0 ? 12: Math.floor(currentScheduleEnd/60)%12}:${Math.floor(currentScheduleEnd%60)} ${Math.floor(currentScheduleEnd/60)>12 ? "pm": "am"}`}
                    </Text>
                    <Button label="Set Schedule" onPress={()=> {onScheduleValChange()}}/>
                </View>
            }

  
        </View>
    )
}

const styles = StyleSheet.create({
    radioText: {
        color: "white"
    }
});