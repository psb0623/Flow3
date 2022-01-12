import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Naver</Text>
        <Text>진성호</Text>
        <Text>진성호</Text>
        <Text>진성호</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
