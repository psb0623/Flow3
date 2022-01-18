import {AxiosInstance, AxiosResponse} from 'axios';

export class RandomGeneratorService {
  constructor(private request: AxiosInstance) {}

  public getRandomPattern = async (
    difficulty: number,
  ): Promise<AxiosResponse<number[]>> => {
    return this.request.get(`/random/${difficulty}`);
  };
}
