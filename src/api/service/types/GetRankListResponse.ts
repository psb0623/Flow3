export type GetRankListResponse = {
  rows: Array<{
    answerCount: number;
    ranking: number;
  }>;
  length: number;
};
