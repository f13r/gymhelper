import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const transformForDateInput = (date: string) => {
  return dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
};

export const transformForRoute = (date: Date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

export const transformForPrisma = (date: string) => {
  const gte = dayjs(date, 'DD-MM-YYYY').startOf('day').toDate();
  const lte = dayjs(date, 'DD-MM-YYYY').endOf('day').toDate();

  return {
    gte,
    lte,
  };
};
