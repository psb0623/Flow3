// @flow
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {GameType} from '../StageGame/GameType';
import {patternService} from '../../../api';
import {PublicPatternCard} from './PublicPatternCard';

type Props = {};

export interface IPattern {
  gameType: GameType;
  id: string;
  answer: string;
  solvedNum: string;
  createdAt: string;
  writer: string;
  solve: boolean;
  solvedAt: string;
}

export const SharePattern = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);
  const [patterns, setPatterns] = useState<IPattern[]>([]);

  useEffect(() => {
    (async () => {
      const _patterns = (await patternService.getPatternPage(pageNum, 5)).data;
      console.log(_patterns);
      setPatterns((patterns) => patterns?.concat(_patterns));
    })();
  }, [pageNum]);

  return (
    <View>
      <FlatList
        style={{
          width: '100%',
          height: '100%',
        }}
        data={patterns}
        renderItem={(pattern) => {
          return (
            <PublicPatternCard key={pattern.item.id} pattern={pattern.item} />
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
};
