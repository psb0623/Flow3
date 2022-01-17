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
      `/pattern?${queryString.stringify({
        page,
        size,
      })}`,
    );
  };
}
