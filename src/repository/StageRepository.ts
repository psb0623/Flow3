import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStageRepository {
  saveLastClearStage3(lastStage: number): Promise<number>;
  getLastClearStage3(): Promise<number>;
  saveLastClearStage4(lastStage: number): Promise<number>;
  getLastClearStage4(): Promise<number>;
}

export class StageRepository implements IStageRepository {
  STAGE_REPOSITORY_KEY = 'STAGE_REPOSITORY_KEY' as const;
  LAST_CLEAR_3 = `${this.STAGE_REPOSITORY_KEY}:lastClear3`;
  LAST_CLEAR_4 = `${this.STAGE_REPOSITORY_KEY}:lastClear4`;
  async getLastClearStage3(): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(`${this.LAST_CLEAR_3}`);
      if (value !== null) {
        return parseInt(value);
      }
      return await this.saveLastClearStage3(0);
    } catch (e) {
      return 0;
    }
  }

  async saveLastClearStage3(lastStage: number): Promise<number> {
    try {
      const currentValue = parseInt(
        (await AsyncStorage.getItem(`${this.LAST_CLEAR_3}`)) ?? '0',
      );

      await AsyncStorage.setItem(
        `${this.LAST_CLEAR_3}`,
        Math.max(lastStage, currentValue).toString(),
      );
      return Math.max(lastStage, currentValue);
    } catch (e) {
      throw e;
    }
  }

  async getLastClearStage4(): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(`${this.LAST_CLEAR_4}`);
      if (value !== null) {
        return parseInt(value);
      }
      return await this.saveLastClearStage4(0);
    } catch (e) {
      return 0;
    }
  }

  async saveLastClearStage4(lastStage: number): Promise<number> {
    try {
      const currentValue = parseInt(
        (await AsyncStorage.getItem(`${this.LAST_CLEAR_4}`)) ?? '0',
      );
      await AsyncStorage.setItem(
        `${this.LAST_CLEAR_4}`,
        Math.max(lastStage, currentValue).toString(),
      );
      return Math.max(lastStage, currentValue);
    } catch (e) {
      throw e;
    }
  }
}

export const stageRepository = new StageRepository();
