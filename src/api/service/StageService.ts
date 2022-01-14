import {Axios, AxiosInstance, AxiosResponse} from 'axios';
import {Stage} from '../../page/Game/Stage';

export class StageService {
  constructor(private request: AxiosInstance) {}

  public getStage3Detail = async (
    projectId: string,
  ): Promise<AxiosResponse<Stage>> => {
    return this.request.get(`stage3/${projectId}`);
  };

  public getStage3 = async (): Promise<AxiosResponse<Stage[]>> => {
    return await this.request.get(`stage3`);
  };

  public getStage4Detail = async (
    projectId: string,
  ): Promise<AxiosResponse<Stage>> => {
    return this.request.get(`stage4/${projectId}`);
  };

  public getStage4 = async (): Promise<AxiosResponse<Stage[]>> => {
    return this.request.get(`stage4`);
  };
}
