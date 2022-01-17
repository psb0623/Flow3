import AsyncStorage from '@react-native-async-storage/async-storage';

interface IHintRepository {
  getHintCount(): Promise<number>;
  minusHintCount(): Promise<number>;
}

export class HintRepository implements IHintRepository {
  STAGE_REPOSITORY_KEY = 'HINT_REPOSITORY_KEY' as const;
  INITIAL_HINT_COUNT = 3;

  async getHintCount(): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(this.STAGE_REPOSITORY_KEY);
      if (value !== null) {
        return parseInt(value);
      }

      return await this.setHintCount(this.INITIAL_HINT_COUNT);
    } catch (e) {
      return 0;
    }
  }

  async minusHintCount(): Promise<number> {
    try {
      const value = await this.getHintCount();
      const nextValue = Math.max(value - 1, 0);
      return await this.setHintCount(nextValue);
    } catch (e) {
      return 0;
    }
  }

  async plusHintCount(): Promise<number> {
    try {
      const value = await this.getHintCount();
      const nextValue = Math.max(value + 1, 0);
      return await this.setHintCount(nextValue);
    } catch (e) {
      return 0;
    }
  }

  private async setHintCount(hintCount: number): Promise<number> {
    try {
      await AsyncStorage.setItem(
        this.STAGE_REPOSITORY_KEY,
        hintCount.toString(),
      );
      return hintCount;
    } catch (e) {
      return 0;
    }
  }
}

export const hintRepository = new HintRepository();
