import {AxiosInstance, AxiosResponse} from 'axios';
import {IPattern} from '../../page/Game/Public/SharePattern';
import * as queryString from 'query-string';

export class AuthService {
  constructor(private request: AxiosInstance) {}

  public login = async (nickname: string): Promise<void> => {
    return this.request.post(`/login`, {nickname});
  };

  public logout = async () => {
    return this.request.delete('/logout');
  };
}
