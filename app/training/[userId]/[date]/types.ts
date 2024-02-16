export type PageProps = {
  params: {
    userId: string;
    date: string;
  };
  searchParams?: {
    showAll: number;
  };
};
