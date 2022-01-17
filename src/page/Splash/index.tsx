import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PatternRenderer} from '../../components/Renderer/PatternRenderer';
import {useEffect, useRef, useState} from 'react';

export const Splash = () => {
  const [selectedIndices, setSelectedIndices] = useState<Array<number>>([]);
  // const patternRef = useRef(patternGenerator());
  //
  // useEffect(() => {
  //   let {done: _done, value: _value} = patternRef.current.next();
  //
  //   const interval = setInterval(() => {
  //     const {done, value} = (_value as Generator<number, void, unknown>).next();
  //     const currentValue = value as number;
  //
  //     if (done) {
  //       setSelectedIndices([]);
  //     } else {
  //       setSelectedIndices((indices) => indices.concat(currentValue));
  //     }
  //
  //     if (_done) {
  //       patternRef.current = patternGenerator();
  //     }
  //   }, 100);
  //
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/*<PatternRenderer*/}
      {/*  selectedIndexes={selectedIndices}*/}
      {/*  columnCount={3}*/}
      {/*  rowCount={3}></PatternRenderer>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
