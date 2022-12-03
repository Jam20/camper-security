import { useState, useEffect } from 'react';
import { View, Text, Button, Slider } from 'react-native-ui-lib';


export default function HomePage() {
    const [running, setRunning] = useState(0)
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [reverse, setReverse] = useState(0)
    

    return (
        <View flex paddingT-32 paddingB-32 paddingL-32 paddingR-32>
            <View paddingB-64 >
                <Text h1 centerH>Running Lights</Text>
                <Slider 
                    value={0}
                    onValueChange={(value) => {setRunning(value)}}
                    minimumValue={0}
                    maximumValue={255}
                 />
                <Text bodySmall centerH $textNeutral numberOfLines={1}>
                  {Math.round((running*100)/255)}
                </Text>     
            </View>
            <View row paddingB-64>
                <View width={"50%"} paddingR-16>
                <Text h1 centerH>Left Turn Lights</Text>
                    <Slider 
                        value={0}
                        onValueChange={(value) => {setLeft(value)}}
                        minimumValue={0}
                        maximumValue={255}
                     />
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                      {Math.round((left*100)/255)}
                    </Text>    
                </View>
                <View width={"50%"}>
                <Text h1 centerH>Right Turn Lights</Text>
                    <Slider 
                        value={0}
                        onValueChange={(value) => {setRight(value)}}
                        minimumValue={0}
                        maximumValue={255}
                     />
                    <Text bodySmall centerH $textNeutral numberOfLines={1}>
                      {Math.round((right*100)/255)}
                    </Text>               
                </View>  
            </View>
            <View paddingB-6 >
                <Text h1 centerH>Reverse Lights</Text>
                <Slider 
                    value={0}
                    onValueChange={(value) => {setReverse(value)}}
                    minimumValue={0}
                    maximumValue={255}
                 />
                <Text bodySmall centerH $textNeutral numberOfLines={1}>
                  {Math.round((reverse*100)/255)}
                </Text>     
            </View>

        </View>
    )
}