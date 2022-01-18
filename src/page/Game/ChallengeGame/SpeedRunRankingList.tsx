// @flow
import * as React from 'react';
import {SpeedRunDifficulty} from './SpeedRunDifficulty';
import {FlatList, Text, View} from 'react-native';
import {speedRunService} from '../../../api';
import {useEffect, useState} from 'react';
import {GetRankListResponse} from '../../../api/service/types/GetRankListResponse';
import {ChallengeGameStackRouteProp} from '../../stack/ChallengeGameStack';
import {rankingRepository} from '../../../repository/RankingRepository';
import {Divider} from 'react-native-paper';

type Props = {} & ChallengeGameStackRouteProp<'SpeedRunRankingList'>;

export const SpeedRunRankingList = ({
  route: {
    params: {difficulty},
  },
}: Props) => {
  const [rankList, setRankList] = useState<GetRankListResponse | null>(null);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [answerCount, setMyAnswerCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const {data: _rankList} = await speedRunService.getRankList(difficulty);
      setRankList(_rankList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let answerCount = 0;
      if (difficulty === 'High') {
        answerCount = await rankingRepository.getHighRank();
      }
      if (difficulty === 'Intermediate') {
        answerCount = await rankingRepository.getIntermediateRank();
      }
      if (difficulty === 'Low') {
        answerCount = await rankingRepository.getLowRank();
      }
      const {data} = await speedRunService.getMyRank(difficulty, answerCount);
      setMyRank(data);
    })();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 10,
      }}>
      <Text>myRank = {myRank}</Text>
      {rankList && (
        <FlatList
          data={rankList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item}) => {
            return (
              <SpeedRunRankingItem
                answerCount={item.answerCount}
                ranking={item.ranking}
              />
            );
          }}
        />
      )}
    </View>
  );
};
export const SpeedRunRankingItem = ({
  answerCount,
  ranking,
}: {
  answerCount: number;
  ranking: number;
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Divider></Divider>
      <Text>{answerCount}</Text>
    </View>
  );
};
