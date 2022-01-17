import {StageService} from './service/StageService';
import {apiInstance} from './instance';
import {PublicPatternService} from './service/PatternService';
import {AuthService} from './service/AuthService';

export const stageService = new StageService(apiInstance);
export const patternService = new PublicPatternService(apiInstance);
export const authService = new AuthService(apiInstance);
