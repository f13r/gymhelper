'use server';

import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function fetchTrainingByUserAndDate(
  userId: number,
  { gte, lte }: { gte: Date; lte: Date },
) {
  try {
    return prisma.training.findFirst({
      where: {
        userId,
        date: {
          gte,
          lte,
        },
      },
      include: {
        Plan: {
          select: {
            id: true,
          },
        },
        Exercise: {
          orderBy: {
            order: 'asc',
          },
          include: {
            Workout: {
              select: {
                title: true,
                Tag: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
            Reps: {
              select: {
                id: true,
                order: true,
                weight: true,
                count: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Exercise by user = ' + userId);
  }
}

export type TrainingByUserAndDate = Prisma.PromiseReturnType<
  typeof fetchTrainingByUserAndDate
>;

export async function getLastTrainingByIdAndPlanId(id: number, planId: number) {
  return prisma.training.findFirst({
    where: {
      id: {
        lt: id,
      },
      planId,
    },
    include: {
      Plan: {
        select: {
          id: true,
        },
      },
      Exercise: {
        orderBy: {
          order: 'asc',
        },
        include: {
          Workout: {
            select: {
              title: true,
              Tag: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          Reps: {
            select: {
              id: true,
              order: true,
              weight: true,
              count: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });
}

export async function reorderExercise(
  id: number,
  trainingId: number,
  order: number,
  newOrder: number,
) {
  try {
    const siblingExercise = await prisma.exercise.findFirst({
      where: {
        trainingId,
        order: newOrder,
      },
      select: {
        id: true,
      },
    });

    if (siblingExercise) {
      const updateCurrent = prisma.exercise.update({
        where: {
          id,
        },
        data: {
          order: newOrder,
        },
      });

      const updateUpper = prisma.exercise.update({
        where: {
          id: siblingExercise.id,
        },
        data: {
          order: order,
        },
      });

      await prisma.$transaction([updateCurrent, updateUpper]);
    } else {
      console.log('Cant find exercise to update');
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }

  revalidatePath('/');
}
