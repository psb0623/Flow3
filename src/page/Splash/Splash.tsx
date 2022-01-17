import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PatternRenderer} from '../../components/Renderer/PatternRenderer';
import {useEffect, useRef, useState} from 'react';
import {splashGenerator} from './SplashGenerator';

export const Splash = () => {
  const [selectedIndices, setSelectedIndices] = useState<Array<number>>([]);
  const patternRef = useRef(splashGenerator());

  useEffect(() => {
    let {done: _done, value: _value} = patternRef.current.next();

    const interval = setInterval(() => {
      if (_done) {
        patternRef.current = splashGenerator();
        const temp = patternRef.current.next();
        _done = temp.done;
        _value = temp.value;
      } else {
        const {done, value} = (
          _value as Generator<number, void, unknown>
        ).next();
        const currentValue = value as number;

        if (done && !_done) {
          const temp = patternRef.current.next();
          _done = temp.done;
          _value = temp.value;
          setSelectedIndices([]);
        } else {
          setSelectedIndices((indices) => indices.concat(currentValue));
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.patternRendererLayout}>
        <PatternRenderer
          selectedIndexes={selectedIndices}
          columnCount={3}
          rowCount={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererLayout: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
