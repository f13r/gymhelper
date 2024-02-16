import React from 'react';
import { ExerciseWeight } from '@/app/ui/training/types';

export const EndTraining = ({
  lastWeight,
  currentWeight,
}: {
  lastWeight?: ExerciseWeight;
  currentWeight: ExerciseWeight;
}) => {
  let cTotalClassName = 'text-default-500';
  let totalSign = '';
  let cTotal = currentWeight.totalWeight;
  const lTotal = lastWeight?.totalWeight;
  if (cTotal && lTotal) {
    cTotalClassName = cTotal > lTotal ? 'text-blue-500' : 'text-danger-500';
    totalSign = cTotal > lTotal ? '+' : '';
    cTotal = cTotal - lTotal;
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <div className="text-xl text-blue-500">
        Вітаємо! Тренування завершено!
      </div>
      <div className="mt-6">Результати тренування:</div>
      <div className={`flex gap-4 text-4xl ${cTotalClassName}`}>
        {totalSign}
        {cTotal} кг
        {!!lTotal && <span className="text-default-500">({lTotal} кг)</span>}
      </div>

      <div className="mt-6">По групам:</div>
      <div className="flex flex-col items-center justify-center gap-4 text-xl ">
        {Object.keys(currentWeight.weightByTag).map((tag) => {
          let cWeight = currentWeight.weightByTag[tag];
          const lWeight = lastWeight?.weightByTag[tag];

          let cWeightClassName = 'text-default-500';
          let sign = '';
          if (lWeight) {
            cWeightClassName =
              cWeight > lWeight ? 'text-blue-500' : 'text-danger-500';
            sign = cWeight > lWeight ? '+' : '';
            cWeight = cWeight - lWeight;
          }

          return (
            <div key={tag} className="flex gap-2">
              <span className="text-default-500">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}:
              </span>
              {!lastWeight ? (
                <span className="text-default-500">{cWeight} кг</span>
              ) : (
                <span className={cWeightClassName}>
                  {sign}
                  {cWeight} кг
                </span>
              )}
              {!!lastWeight && (
                <span className="text-default-500">({lWeight} кг)</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
