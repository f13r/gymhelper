import { getPlanWorkoutById } from '@/app/lib/actions/plan';

export default async function Page({
  params: { planId },
}: {
  params: { planId: string };
}) {
  const planWorkout = await getPlanWorkoutById(parseInt(planId, 10));

  return JSON.stringify(planWorkout);
}
