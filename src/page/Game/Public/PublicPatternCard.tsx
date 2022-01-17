// @flow
import * as React from 'react';
import {IPattern} from './SharePattern';
import {Paragraph, Title, Card, Divider} from 'react-native-paper';
import {PatternRenderer} from '../../../components/Renderer/PatternRenderer';
import {StyleSheet, View, Text, Pressable} from 'react-native';

type Props = {
  pattern: IPattern;
};
export const PublicPatternCard = ({
  pattern: {answer, writer, solve, solvedAt, createdAt, solvedNum},
}: Props) => {
  return (
    <View
      style={{
        width: '100%',
        padding: 10,
      }}>
      <Pressable onPress={() => {}}>
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: `${solve ? '#dbead5' : 'white'}`,
            borderRadius: 20,
            padding: 5,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            display: 'flex',
            flexDirection: 'row',
            elevation: 5,
          }}>
          <View style={styles.rendererLayout}>
            <PatternRenderer
              selectedIndexes={answer.split('').map((value) => parseInt(value))}
              columnCount={3}
              rowCount={3}
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text>만든이 : {writer}</Text>
            <Text>만든날짜 : {createdAt}</Text>
            <Text>푼사람 : {solvedNum}</Text>
            <Text>푼날짜 : {solvedAt}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  rendererLayout: {
    height: '100%',
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
