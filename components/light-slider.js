import { useState, useEffect } from 'react';
import { View, Text, Slider } from 'react-native-ui-lib';


const maxVal = 8191
const minVal = 1

export default function LightSlider(props) {
    const [value, setValue] = useState(minVal)

    return(
        <View paddingB-64 >
                <Text h1 centerH>{props.label}</Text>
                <Slider 
                    value={minVal}
                    onValueChange={(val) => {
                        setValue(val)
                        if(props.onValueChange) props.onValueChange(Math.round(value))
                    }}
                    minimumValue={minVal}
                    maximumValue={maxVal}
                 />
                <Text bodySmall centerH $textNeutral numberOfLines={1}>
                  {Math.round(((value-minVal)*100)/(maxVal-minVal))}
                </Text>     
            </View>
    )
}