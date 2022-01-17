import AsyncStorage from '@react-native-async-storage/async-storage';

interface IRankingRepository {
  getHighRank(): Promise<number>;
  setHighRank(rank: number): Promise<number>;
  getIntermediateRank(): Promise<number>;
  setIntermediateRank(rank: number): Promise<number>;
  getLowRank(): Promise<number>;
  setLowRank(rank: number): Promise<number>;
}

export class RankingRepository implements IRankingRepository {
  RANKING_REPOSITORY_KEY = 'RANKING_REPOSITORY_KEY';
  RANKING_REPOSITORY_KEY_HIGH_RANK = `${this.RANKING_REPOSITORY_KEY}:HIGH_RANK`;
  RANKING_REPOSITORY_KEY_INTERMEDIATE_RANK = `${this.RANKING_REPOSITORY_KEY}:INTERMEDIATE_RANK`;
  RANKING_REPOSITORY_KEY_LOW_RANK = `${this.RANKING_REPOSITORY_KEY}:LOW_RANK`;

  async getHighRank(): Promise<number> {
    const rank = await AsyncStorage.getItem(
      this.RANKING_REPOSITORY_KEY_HIGH_RANK,
    );

    if (rank != null) {
      return parseInt(rank);
    }

    await AsyncStorage.setItem(this.RANKING_REPOSITORY_KEY_HIGH_RANK, '0');
    return 0;
  }

  async getIntermediateRank(): Promise<number> {
    const rank = await AsyncStorage.getItem(
      this.RANKING_REPOSITORY_KEY_INTERMEDIATE_RANK,
    );

    if (rank != null) {
      return parseInt(rank);
    }

    await AsyncStorage.setItem(
      this.RANKING_REPOSITORY_KEY_INTERMEDIATE_RANK,
      '0',
    );
    return 0;
  }

  async getLowRank(): Promise<number> {
    const rank = await AsyncStorage.getItem(
      this.RANKING_REPOSITORY_KEY_LOW_RANK,
    );

    if (rank != null) {
      return parseInt(rank);
    }

    await AsyncStorage.setItem(this.RANKING_REPOSITORY_KEY_LOW_RANK, '0');
    return 0;
  }

  async setHighRank(rank: number): Promise<number> {
    const highRank = await this.getHighRank();
    if (highRank < rank) {
      await AsyncStorage.setItem(
        this.RANKING_REPOSITORY_KEY_HIGH_RANK,
        rank.toString(),
      );
      return rank;
    }

    return highRank;
  }

  async setIntermediateRank(rank: number): Promise<number> {
    const intermediateRank = await this.getIntermediateRank();
    if (intermediateRank < rank) {
      await AsyncStorage.setItem(
        this.RANKING_REPOSITORY_KEY_INTERMEDIATE_RANK,
        rank.toString(),
      );
      return rank;
    }

    return intermediateRank;
  }

  async setLowRank(rank: number): Promise<number> {
    const lowRank = await this.getLowRank();
    if (lowRank < rank) {
      await AsyncStorage.setItem(
        this.RANKING_REPOSITORY_KEY_LOW_RANK,
        rank.toString(),
      );
      return rank;
    }

    return lowRank;
  }
}

export const rankingRepository = new RankingRepository();
