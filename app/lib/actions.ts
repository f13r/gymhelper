'use server';

import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { Exercise, Rep } from '@/app/ui/training/types';
import { transformForRoute } from '@/app/lib/utils/date';
import { fetchWorkouts } from '@/app/lib/actions/workouts';

const prepareNumberValue = (value?: number) => {
  return value || value === 0 ? value : null;
};

export async function removeRepAction(id: number) {
  try {
    await prisma.reps.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error, 'error');
      throw new Error(error.code);
    }

    console.error(error);
  }

  revalidatePath('/');
}

export async function findLastRepByWorkout(
  workoutId: number,
  trainingId: number,
  order: number,
) {
  const exercise = await prisma.exercise.findFirst({
    where: {
      workoutId,
      trainingId: { not: trainingId },
    },
    include: {
      Reps: {
        select: {
          count: true,
          weight: true,
          order: true,
        },
        where: {
          order,
        },
        take: 1,
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });

  return exercise?.Reps?.[0];
}

export async function addRepAction(exerciseId: number, rep: any) {
  const { weight, count, order } = rep;
  try {
    const result = await prisma.reps.create({
      data: {
        weight: prepareNumberValue(weight),
        count: prepareNumberValue(count),
        order,
        Exercise: {
          connect: {
            id: exerciseId,
          },
        },
      },
    });
    return result.id;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export async function updateRepAction({ id, weight, count, order }: Rep) {
  try {
    await prisma.reps.update({
      where: {
        id,
      },
      data: {
        weight: prepareNumberValue(weight),
        count: prepareNumberValue(count),
        order,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export async function updateExerciseAction({
  id,
  defaultWeight,
  workoutId,
  done,
}: Exercise) {
  try {
    await prisma.exercise.update({
      where: {
        id,
      },
      data: {
        done,
        defaultWeight: prepareNumberValue(defaultWeight),
        Workout: {
          connect: { id: workoutId },
        },
      },
      include: {
        Workout: {
          select: {
            title: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error();
  }
  revalidatePath('/');
}

export type Workouts = Prisma.PromiseReturnType<typeof fetchWorkouts>;

export async function fetchPlans() {
  try {
    return await prisma.plan.findMany();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Plans');
  }
}

export type Plans = Prisma.PromiseReturnType<typeof fetchPlans>;

export async function createPlan(
  title: string,
  userId: number,
  workoutIds: number[],
) {
  try {
    const planWorkouts = workoutIds.map((workoutId, index) => {
      return {
        order: index + 1,
        userId,
        workoutId,
      };
    });

    return await prisma.plan.create({
      data: {
        title,
        userId,
        PlanWorkout: {
          createMany: {
            data: planWorkouts,
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create Plan');
  }
}

export async function createTraining(
  date: Date,
  userId: number,
  planId: number,
) {
  const planWorkouts = await prisma.planWorkout.findMany({
    where: {
      planId,
    },
  });

  let exercises = [];

  for (let { workoutId, order } of planWorkouts) {
    const [lastExercise] = await prisma.exercise.findMany({
      where: {
        workoutId,
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
    });

    exercises.push({
      date,
      userId,
      workoutId,
      order,
      defaultSetCount: workout?.defaultSetCount,
      defaultRepCount: workout?.defaultRepCount,
      defaultWeight: lastExercise?.defaultWeight ?? null,
    });
  }

  try {
    await prisma.training.create({
      data: {
        date,
        userId,
        planId,
        Exercise: {
          createMany: {
            data: exercises,
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create Plan');
  }

  revalidatePath('/training/1/' + transformForRoute(date));
}

export async function removeTraining(id: number) {
  const deleteExercises = prisma.exercise.deleteMany({
    where: {
      trainingId: id,
    },
  });

  const deleteTraining = prisma.training.delete({
    where: {
      id,
    },
  });

  await prisma.$transaction([deleteExercises, deleteTraining]);
}
