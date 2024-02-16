import React from 'react';
import { fetchPlans, Plans } from '@/app/lib/actions';
import TrainingComponent from '@/app/ui/training/training';
import { transformForPrisma } from '@/app/lib/utils/date';
import { getTotalWeightByExercise, mapTraining } from '@/app/ui/training/utils';
import { PageProps } from '@/app/training/[userId]/[date]/types';
import { Exercise } from '@/app/ui/training/types';
import {
  fetchTrainingByUserAndDate,
  getLastTrainingByIdAndPlanId,
} from '@/app/lib/actions/exercises';

export default async function Page({
  params: { userId, date },
  searchParams,
}: PageProps) {
  const showAll = !!searchParams?.showAll;
  const exercises = mapTraining(
    await fetchTrainingByUserAndDate(Number(userId), transformForPrisma(date)),
  );

  const trainingId = exercises?.[0]?.trainingId;
  const planId = exercises?.[0]?.planId;

  let lastExercises: Exercise[] | undefined = [];
  let lastWeight;
  if (trainingId && planId) {
    lastExercises = mapTraining(
      await getLastTrainingByIdAndPlanId(trainingId, planId),
    );
    lastWeight = getTotalWeightByExercise(lastExercises ?? []);
  }

  const currentWeight = getTotalWeightByExercise(exercises ?? []);

  const plans: Plans = await fetchPlans();

  return (
    <TrainingComponent
      date={date}
      exercises={exercises}
      lastExercises={lastExercises}
      plans={plans}
      currentWeight={currentWeight}
      lastWeight={lastWeight}
      showAll={showAll}
    />
  );
}
