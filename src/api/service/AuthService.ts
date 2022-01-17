import {AxiosInstance} from 'axios';

export class AuthService {
  constructor(private request: AxiosInstance) {}

  public login = async (nickname: string): Promise<void> => {
    return this.request.post(`/login`, {nickname});
  };

  public logout = async () => {
    return this.request.delete('/logout');
  };
}
