// @flow
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {patternService} from '../../../api';
import {PublicPatternCard} from './PublicPatternCard';
import {PublicGameStackNavigationProp} from '../../stack/PublicGameStack';

type Props = {} & PublicGameStackNavigationProp;

export interface IPattern {
  id: string;
  answer: string;
}

export const SharePattern = ({navigation}: Props) => {
  const [pageNum, setPageNum] = useState(1);
  const [patterns, setPatterns] = useState<IPattern[]>([]);

  const goShareGameScene = useCallback((pattern: IPattern) => {
    navigation.navigate('PublicGameScene', {
      pattern,
    });
  }, []);

  useEffect(() => {
    (async () => {
      const _patterns = (await patternService.getPatternPage(pageNum, 5)).data;
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
            <PublicPatternCard
              key={pattern.item.id}
              pattern={pattern.item}
              onPressed={() => {
                goShareGameScene(pattern.item);
              }}
            />
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
};
