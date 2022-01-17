import {Axios, AxiosInstance, AxiosResponse} from 'axios';
import {Stage} from '../../page/Game/StageGame/Stage';

export class SpeedRunService {
  constructor(private request: AxiosInstance) {}

  public updateAnswerCount = async (
    answerCount: string,
  ): Promise<AxiosResponse<void>> => {
    return this.request.patch(`/speed-run/answer`, {
      answerCount,
    });
  };
}
