import { WorkoutItem } from '@/app/ui/workout/workout-item';
import { CreateWorkout } from '@/app/ui/workout/create-workout';
import { Tag } from '@prisma/client';
import { WorkoutsWithTag } from '@/app/lib/actions/workouts';

export const WorkoutsComponent = ({
  workouts,
  tags,
}: {
  workouts: WorkoutsWithTag;
  tags: Tag[];
}) => {
  return (
    <div className="mt-8 flex  flex-col items-center justify-center gap-6">
      <CreateWorkout tags={tags} />
      <div className="flex flex-col items-center gap-6">
        {workouts.map((workout) => {
          return <WorkoutItem key={workout.id} workout={workout} tags={tags} />;
        })}
      </div>
    </div>
  );
};
