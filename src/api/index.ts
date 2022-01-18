import {StageService} from './service/StageService';
import {apiInstance} from './instance';
import {PublicPatternService} from './service/PatternService';
import {AuthService} from './service/AuthService';
import {RandomGeneratorService} from './service/RandomGeneratorService';

export const stageService = new StageService(apiInstance);
export const patternService = new PublicPatternService(apiInstance);
export const authService = new AuthService(apiInstance);
export const randomGeneratorService = new RandomGeneratorService(apiInstance);
