import {AxiosInstance} from 'axios';

export class StageService {
  constructor(private request: AxiosInstance) {}

  public getStage = (projectId: string) => {
    return this.request.get(`stage/${projectId}`);
  };
}
