import { redirect } from 'next/navigation';
import { transformForRoute } from '@/app/lib/utils/date';

export default async function Page() {
  redirect('/training/1/' + transformForRoute(new Date()));
}
