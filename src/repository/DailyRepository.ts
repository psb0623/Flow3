import AsyncStorage from '@react-native-async-storage/async-storage';

interface IDailyRepository {
  setSolvedAt(solved: number): Promise<number>;
  getSolvedAt(): Promise<number>;
}

export class DailyRepository implements IDailyRepository {
  DAILY_REPOSITORY_KEY = 'DAILY_REPOSITORY_KEY' as const;

  async getSolvedAt(): Promise<number> {
    const daily = await AsyncStorage.getItem(this.DAILY_REPOSITORY_KEY);
    if (daily === null) {
      return 0;
    }
    return parseInt(daily);
  }

  async setSolvedAt(solved: number): Promise<number> {
    await AsyncStorage.setItem(this.DAILY_REPOSITORY_KEY, solved.toString());
    return solved;
  }
}

export const dailyRepository = new DailyRepository();
