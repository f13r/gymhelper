import { fetchPlans, PlansWorkout } from '@/app/lib/actions/plan';
import Program from '@/app/ui/program/program';

const mapPlans = (plans: PlansWorkout) => {
  return plans.map(({ id, title, PlanWorkout }) => {
    const tags = PlanWorkout.reduce<string[]>((acc, planWorkout) => {
      const tag = planWorkout.Workout.Tag?.title;
      if (tag && !acc.includes(tag)) {
        acc.push(tag);
      }

      return acc;
    }, [] as string[]);
    return {
      id,
      title,
      tags,
      count: PlanWorkout.length,
    };
  });
};

export type PlansType = ReturnType<typeof mapPlans>;

export default async function Page() {
  const plans = mapPlans(await fetchPlans());

  return <Program plans={plans} />;
}
