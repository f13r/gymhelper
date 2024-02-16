'use server';

import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getPlanWorkoutById(id: number) {
  try {
    return await prisma.planWorkout.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get PlanWorkout, id ' + id);
  }
}

export async function fetchPlans() {
  try {
    return await prisma.plan.findMany({
      select: {
        id: true,
        title: true,
        PlanWorkout: {
          select: {
            Workout: {
              select: {
                Tag: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
      take: 10000,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Plans');
  }
}

export type PlansWorkout = Prisma.PromiseReturnType<typeof fetchPlans>;
