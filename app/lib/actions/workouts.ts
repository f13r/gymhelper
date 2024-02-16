'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma, Workout } from '@prisma/client';

export async function getWorkoutById(id: number) {
  try {
    return await prisma.workout.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get Workout, id ' + id);
  }
}

export async function fetchWorkouts(orderBy: string) {
  try {
    return await prisma.workout.findMany({
      where: {
        deleted: false,
      },
      include: {
        Tag: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        [orderBy]: 'desc',
      },
      take: 10000,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Workouts');
  }
}

export type WorkoutsWithTag = Prisma.PromiseReturnType<typeof fetchWorkouts>;
export type WorkoutWithTag = WorkoutsWithTag[number];

export async function fetchTags() {
  try {
    return await prisma.tag.findMany({
      take: 10000,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Tags');
  }
}

export async function addWorkout(workout: Workout) {
  try {
    await prisma.workout.create({
      data: {
        title: workout.title,
        defaultRepCount: workout.defaultRepCount,
        defaultSetCount: workout.defaultSetCount,
        tagId: workout.tagId,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add Workouts');
  }

  revalidatePath('/workout');
}

export async function editWorkout(workout: Workout) {
  try {
    await prisma.workout.update({
      where: {
        id: workout.id,
      },
      data: {
        title: workout.title,
        defaultRepCount: workout.defaultRepCount,
        defaultSetCount: workout.defaultSetCount,
        tagId: workout.tagId,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to edit workout, id ' + workout.id);
  }

  revalidatePath('/workout');
}
