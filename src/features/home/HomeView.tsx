import type { InferGetServerSidePropsType } from 'next';

import { BreadcrumbOptionType, Breadcrumbs } from '@/design-system/breadcrumbs';
import { Footer } from '@/layout/footer';
import { Header } from '@/layout/header';
import { ICommonView } from '@/model';
import { NextPageWithLayout } from '@/pages/_app';
import { getServerSideProps } from '@/pages/index';

export interface HomeViewProps extends ICommonView {
  breadcrumbs: BreadcrumbOptionType[];
}

export default function HomeView({
  breadcrumbs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <main>{!!breadcrumbs.length && <Breadcrumbs options={[]} />}</main>;
}

HomeView.getLayout = (page: NextPageWithLayout) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
