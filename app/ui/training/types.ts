export type Rep = {
  id: number;
  order: number;
  count?: number;
  weight?: number;
};

export type Exercise = {
  id: number;
  title: string;
  done: boolean;
  trainingId: number;
  workoutId: number;
  tag: string;
  tagId?: number;
  order: number;
  defaultWeight?: number;
  defaultRepCount?: number;
  defaultSetCount?: number;
  planId: number;
  reps: Rep[];
};

export type ChangeDone = {
  id: number;
  done: boolean;
};

export type ExerciseWeight = {
  totalWeight: number;
  weightByTag: Record<string, any>;
};
