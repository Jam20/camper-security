import { useEffect, useState } from "react";
import { Text, View } from "react-native-ui-lib";
import { BluetoothController } from "../modules/BluetoothController";


export default function SettingsPage() {
    const [voltage, setVoltage] = useState(0)

    useEffect(() => {
        const interval = setInterval(async ()=> {
            setVoltage((await BluetoothController.getStatus()).voltage)
        }, 1000)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    console.log(voltage)
    return (
        <View>
            <Text color="#ffffff" h1 centerH marginL-128 marginT-128>{voltage}</Text>
        </View>
    )
}