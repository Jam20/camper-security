import { useEffect, useState } from "react";
import { Text, View, Switch, Slider, Colors} from "react-native-ui-lib";
import { BluetoothController } from "../modules/BluetoothController";


export default function SettingsPage() {
    const [voltage, setVoltage] = useState(0)
    const [isAccelOn, setIsAccelOn] = useState(false)
    const [band, setBand] = useState(1)

    useEffect(() => {
        const interval = setInterval(async () => {
            setVoltage((await BluetoothController.getStatus()).voltage)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <View flex center paddingT-16 paddingL-32 paddingR-32>
            <View>
                <Text color="#ffffff" h1 centerH> Enable Accelerometer</Text>
                <Switch value={isAccelOn} onValueChange={(value) => {
                    setIsAccelOn(value)
                    BluetoothController.sendRequest({enable: value, band: band})
                }
                }/>
                <Slider
                    value={1}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    onValueChange={(val) => {
                        setBand(Math.floor(val))
                    }}
                    onSeekEnd={()=> {
                        BluetoothController.sendRequest({enable: isAccelOn, band: Math.floor(band)})
                    }}
                    minimumValue={0}
                    maximumValue={1000}
                />            
            </View>
  
            <Text color="#ffffff" h1 centerH >Voltage: {voltage}</Text>
        </View>
    )
}