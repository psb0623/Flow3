const _p = [3, 4, 5, 2, 1, 0, 6];
const _a = [3, 4, 5, 8, 2, 1, 0, 6];
const _t = [7, 4, 1, 0, 2];
const _e = [3, 4, 5, 2, 1, 0, 6, 7, 8];
const _r = [8, 4, 3, 5, 2, 1, 0, 6];
const _n = [0, 3, 6, 4, 2, 5, 8];

const alphabetGeneratorFactory = function* (alphabet: Array<number>) {
  for (let i of alphabet) {
    yield i;
  }
};

export const splashGenerator = function* () {
  yield alphabetGeneratorFactory(_p);
  yield alphabetGeneratorFactory(_a);
  yield alphabetGeneratorFactory(_t);
  yield alphabetGeneratorFactory(_t);
  yield alphabetGeneratorFactory(_e);
  yield alphabetGeneratorFactory(_r);
  yield alphabetGeneratorFactory(_n);
};
