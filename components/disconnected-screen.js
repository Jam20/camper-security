import { View, Text, Icon, Colors } from 'react-native-ui-lib';
import logo from '../assets/Logo.png'
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function DisconnectedScreenz(props) {

    return (
        <View style={styles.container}>
            <Icon source={logo} width={"match-parent"} style={styles.image} />
            <ActivityIndicator size={"large"} color={Colors.primary} style={styles.indicator} />
            <Text color={Colors.primary} text70>Waiting For Device</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 256,
        marginBottom: 128,
        resizeMode: 'contain'
    },
    indicator: {
        marginBottom: 64,
    },
    container: {
        padding: 30,
        height: "100%",
        alignItems: 'center'
    }
})