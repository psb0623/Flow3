import {Axios, AxiosInstance, AxiosResponse} from 'axios';
import {Stage} from '../../page/Game/StageGame/Stage';
import {
  SpeedRunDifficulty,
  SpeedRunDifficultyMap,
} from '../../page/Game/ChallengeGame/SpeedRunDifficulty';
import {GetRankListResponse} from './types/GetRankListResponse';

export class SpeedRunService {
  constructor(private request: AxiosInstance) {}

  public getMyRank = async (
    difficulty: SpeedRunDifficulty,
    answerCount: string,
  ): Promise<AxiosResponse<number>> => {
    return this.request.get(
      `/ranking/${SpeedRunDifficultyMap[difficulty]}?my_ranking=${answerCount}`,
    );
  };

  public getRankList = async (
    difficulty: SpeedRunDifficulty,
  ): Promise<AxiosResponse<GetRankListResponse>> => {
    return this.request.get(
      `/ranking/list/${SpeedRunDifficultyMap[difficulty]}`,
    );
  };

  public updateHighScore = async (
    difficulty: SpeedRunDifficulty,
    score: number,
  ) => {
    return this.request.post(`/ranking/update`, {
      score,
      difficulty: SpeedRunDifficultyMap[difficulty],
    });
  };
}
