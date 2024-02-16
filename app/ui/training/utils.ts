import { Exercise } from '@/app/ui/training/types';
import { tagColorClassName } from '@/app/ui/training/exercise/consts';
import { TrainingByUserAndDate } from '@/app/lib/actions/exercises';

export const transformNullToStringOrUndefined = (
  value: number | null | undefined,
) => {
  return value ?? undefined;
};

export const mapTraining = (
  training: TrainingByUserAndDate,
): Exercise[] | undefined => {
  if (training) {
    return training.Exercise.map(
      ({
        id,
        Workout: { title, Tag },
        workoutId,
        trainingId,
        done,
        order,
        defaultSetCount,
        defaultRepCount,
        defaultWeight,
        Reps,
      }) => {
        return {
          id,
          title,
          order,
          tag: Tag?.title ?? '',
          tagId: Tag?.id,
          workoutId,
          trainingId,
          defaultSetCount: transformNullToStringOrUndefined(defaultSetCount),
          defaultRepCount: transformNullToStringOrUndefined(defaultRepCount),
          done: !!done,
          defaultWeight: transformNullToStringOrUndefined(defaultWeight),
          planId: training.Plan.id,
          reps: Reps.map(({ id: repId, order, count, weight }) => {
            return {
              id: repId,
              order,
              count: transformNullToStringOrUndefined(count),
              weight: transformNullToStringOrUndefined(weight),
            };
          }),
        };
      },
    );
  }
};

export const getTotalWeightByExercise = (exercises: Exercise[]) => {
  const totalWeight =
    exercises.reduce(
      (acc, e) =>
        e?.reps?.reduce((repAcc, rep) => {
          if (rep?.count && rep?.weight) {
            return rep.count * rep.weight + repAcc;
          }
          return repAcc;
        }, 0) + acc,
      0,
    ) ?? 0;

  const weightByTag: Record<string, any> = {};

  exercises.forEach((e) => {
    const weight = e?.reps?.reduce((repAcc, rep) => {
      if (rep?.count && rep?.weight) {
        return rep.count * rep.weight + repAcc;
      }
      return repAcc;
    }, 0);

    if (!weightByTag[e.tag]) {
      weightByTag[e.tag] = weight;
    } else {
      weightByTag[e.tag] = weightByTag[e.tag] + weight;
    }
  });

  return {
    totalWeight,
    weightByTag,
  };
};

export const getBgColorByTag = (tagId: number) => {
  return tagColorClassName?.[tagId]?.bg ?? 'bg-default-200';
};

export const getTextColorByTag = (tagId: number) => {
  return tagColorClassName?.[tagId]?.text ?? 'text-blue-500';
};

export const getTagTitleColor = (tag: keyof typeof tagColorClassName) => {
  return tagColorClassName?.[tag]?.titleColor ?? 'text-default-500';
};

export const getTagColor = (tag: keyof typeof tagColorClassName) => {
  return tagColorClassName?.[tag]?.color ?? 'text-default-500';
};
