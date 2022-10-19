import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

export default function App() {
  var [count, setCount] = useState(0)
  
  return (
    <View style={styles.container} >
      <Text>This is a dummy app and I change things count: {count} </Text>
      <View style={styles.item}>
        <Button title='Increment Count' onPress={() => setCount(count+1)} style={styles.item}/>
      </View>
      <View style={styles.item}>
      <Button title='Reset Count' onPress={()=> setCount(0)}/>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingBottom: 2
  }
});
