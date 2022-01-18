// @flow
import * as React from 'react';
import {SpeedRunDifficulty} from './SpeedRunDifficulty';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {speedRunService} from '../../../api';
import {useEffect, useState} from 'react';
import {GetRankListResponse} from '../../../api/service/types/GetRankListResponse';
import {ChallengeGameStackRouteProp} from '../../stack/ChallengeGameStack';
import {rankingRepository} from '../../../repository/RankingRepository';
import {Divider} from 'react-native-paper';
import {diffColor} from './ChallengeGameSelect';

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
      setMyAnswerCount(answerCount);
      setMyRank(data);
    })();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        flexDirection: 'column',
      }}>
      <View style={styles.rankingListContainer}>
        {rankList && (
          <FlatList
            style={{width: '100%'}}
            data={rankList.rows}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item}) => {
              return (
                <SpeedRunRankingItem
                  answerCount={item.answerCount}
                  ranking={item.ranking}
                  backgroundColor={
                    diffColor[
                      difficulty === 'High'
                        ? 2
                        : difficulty === 'Intermediate'
                        ? 1
                        : 0
                    ]
                  }
                />
              );
            }}
          />
        )}
      </View>
      <View style={styles.myRankingContainer}>
        {myRank && rankList && answerCount && (
          <>
            <Text style={{fontSize: 16}}>{`내 순위 (상위 ${(
              (myRank / rankList.length) *
              100
            ).toFixed(2)}%)`}</Text>
            <SpeedRunRankingItem
              answerCount={answerCount}
              ranking={myRank}
              backgroundColor={
                diffColor[
                  difficulty === 'High'
                    ? 2
                    : difficulty === 'Intermediate'
                    ? 1
                    : 0
                ]
              }
            />
          </>
        )}
      </View>
    </View>
  );
};
export const SpeedRunRankingItem = ({
  answerCount,
  ranking,
  backgroundColor,
}: {
  answerCount: number;
  ranking: number;
  backgroundColor: string;
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 90,
        padding: 10,
      }}>
      <View style={[styles.rankingItemContainer, {backgroundColor}]}>
        <Divider></Divider>
        <View style={styles.rankingContainer}>
          <Text style={styles.rankingText}>{ranking + '위   |'}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{answerCount + '점    '}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rankingItemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    padding: 12,
    backgroundColor: '#2196F3',
    elevation: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankingListContainer: {
    padding: 0,
    flex: 4,
    backgroundColor: '#E0E0E0',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myRankingContainer: {
    padding: 0,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankingContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 25,
    color: 'white',
    //fontWeight: 'bold',
  },
  rankingText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
