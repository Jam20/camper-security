import { useState, useEffect } from 'react';
import { View, Text, Slider, Colors} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';


const maxVal = 8191
const minVal = 1

export default function LightSlider(props) {
    const [value, setValue] = useState(minVal)

    return(
        <View paddingB-16 style={styles.container}>
                <Text h1 centerH color="#ffffff">{props.label}</Text>
                <Slider 
                    value={minVal}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    onValueChange={(val) => {
                        setValue(val)
                        if(props.onValueChange) props.onValueChange(Math.round(8192-value))
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

const styles = StyleSheet.create({
    container: {
        borderColor: "red",
        flex: 1
    }
})