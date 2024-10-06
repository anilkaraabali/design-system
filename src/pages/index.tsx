import type { GetServerSideProps } from 'next';

import { HomeViewProps } from '@/features/home/HomeView';
import { serverGetCommonServerSideProps } from '@/server/utils/get-common-server-side-props';
import { promiseAllSettled } from '@/utils/promise-all-settled';

export const getServerSideProps = (async (ctx) => {
  const [messages] = await promiseAllSettled([
    serverGetCommonServerSideProps(ctx, ['Homepage', 'Product']),
  ]);

  return {
    props: {
      breadcrumbs: [],
      ...messages,
    },
  };
}) satisfies GetServerSideProps<HomeViewProps>;

export { default } from '@/features/home/HomeView';
