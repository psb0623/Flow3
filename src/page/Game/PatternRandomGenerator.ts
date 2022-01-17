import {RandomGeneratorService} from '../../api/service/RandomGeneratorService';
import {randomGeneratorService} from '../../api';

export class PatternRandomGenerator {
  private size;

  constructor(private row = 3, private column = 3) {
    this.size = row * column;
  }

  generate = async () => {
    let ret = await randomGeneratorService.getRandomPattern(0);
    return ret;
  };
}
