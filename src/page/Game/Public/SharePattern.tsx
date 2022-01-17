// @flow
import * as React from 'react';
import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {GameType} from '../StageGame/GameType';
import {patternService} from '../../../api';
import {PublicPatternCard} from './PublicPatternCard';

type Props = {};

export interface IPattern {
  gameType: GameType;
  id: number;
  answer: string;
  solved: number;
  createdAt: string;
  writer: string;
}

export const SharePattern = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);
  const [patterns, setPatterns] = useState<IPattern[]>();

  useEffect(() => {
    (async () => {
      const _patterns = (await patternService.getPatternPage(pageNum, 5)).data;
      setPatterns((patterns) => patterns?.concat(patterns));
    })();
  }, [pageNum]);

  return (
    <View>
      {patterns?.map((pattern) => {
        return <PublicPatternCard pattern={pattern}></PublicPatternCard>;
      })}
    </View>
  );
};
