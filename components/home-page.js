import { Text, View} from 'react-native-ui-lib';
import { BluetoothController } from '../modules/BluetoothController';
import LightSlider from './light-slider';

const maxVal = 8191
const minVal = 1

export default function HomePage(props) {

    return (
        <View flex paddingT-32 paddingB-32 paddingL-32 paddingR-32>
            <LightSlider label="Running Lights" onValueChange={(value)=> BluetoothController.sendRequest({running: value})}/>

            <View flex row>
                <View width={"50%"} paddingR-16>
                    <LightSlider label="Left Turn Lights" onValueChange={(value)=> BluetoothController.sendRequest({left: value})}/>
                </View>
                <View width={"50%"}>
                    <LightSlider label="Right Turn Lights" onValueChange={(value)=> BluetoothController.sendRequest({right: value})}/>
                </View>
            </View>
            
            <LightSlider label="Reverse Lights" onValueChange={(value)=> BluetoothController.sendRequest({reverse: value})}/>
        </View>
    )
}