import {AxiosInstance, AxiosResponse} from 'axios';
import {IPattern} from '../../page/Game/Public/SharePattern';
import * as queryString from 'query-string';

export class PublicPatternService {
  constructor(private request: AxiosInstance) {}

  public getPatternPage = async (
    page: number,
    size: number,
  ): Promise<AxiosResponse<Array<IPattern>>> => {
    return this.request.get(
      `/public/stage?${queryString.stringify({
        page,
        size,
      })}`,
    );
  };

  public solvePublicPattern = async (
    patternId: string,
  ): Promise<AxiosResponse<void>> => {
    return this.request.post(`/public/me/stage`, {
      patternId,
    });
  };

  public createPublicPattern = async (
    answer: string,
  ): Promise<AxiosResponse<void>> => {
    return this.request.post(`public/stage`, {
      answer: answer,
    });
  };
}
