import {StageService} from './service/StageService';
import {apiInstance} from './instance';
import {PublicPatternService} from './service/PatternService';

export const stageService = new StageService(apiInstance);
export const patternService = new PublicPatternService(apiInstance);
