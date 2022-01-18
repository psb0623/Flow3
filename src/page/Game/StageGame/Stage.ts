export interface Stage {
  id: number;
  answer: string;
}

export const isStage = (object: any): object is Stage => {
  if (object.id == null) return false;
  if (object.answer == null) return false;
  return true;
};
