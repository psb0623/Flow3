export type SpeedRunDifficulty = 'High' | 'Intermediate' | 'Low';
export const SpeedRunDifficultyMap: {
  [key in SpeedRunDifficulty]: number;
} = {
  High: 2,
  Intermediate: 1,
  Low: 0,
};
