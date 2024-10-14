import type { AppProps, NextWebVitalsMetric } from 'next/app';

import { ErrorBoundary } from '@/components/error';
import { Snackbar } from '@/design-system/snackbar';
import { Layout } from '@/layout/Layout';
import { GlobalProvider } from '@/store/global.context';
import '@/styles/index.scss';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { DefaultSeo } from 'next-seo';
import { Lato, Noto_Sans } from 'next/font/google';
import { useRouter } from 'next/router';

import SEO from '../../next-seo.config';

export type NextPageWithLayout<P = object, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

const fontHeading = Lato({
  style: 'normal',
  subsets: ['latin-ext'],
  weight: ['300', '400', '700'],
});

export const fontDefault = Noto_Sans({
  style: 'normal',
  subsets: ['latin-ext'],
  weight: ['400', '500'],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  const router = useRouter();

  return (
    <ErrorBoundary
      deviceType={pageProps.deviceType}
      isTouchable={pageProps.isTouchable}
      messages={pageProps.messages}
      referer={pageProps.referer}
      session={pageProps.session}
    >
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone='Europe/Berlin'
      >
        <style global jsx>{`
          :root {
            --font-family-heading: ${fontHeading.style.fontFamily};
            --font-family-default: ${fontDefault.style.fontFamily};
          }
        `}</style>
        <DefaultSeo {...SEO} />
        <div id='root'>
          <SessionProvider session={pageProps.session}>
            <GlobalProvider
              isMobile={pageProps.deviceType === 'mobile'}
              isTouchable={pageProps.isTouchable}
              referer={pageProps.referer}
            >
              <Snackbar />
              {getLayout(<Component {...pageProps} />)}
            </GlobalProvider>
          </SessionProvider>
        </div>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const name = metric.name.replace('Next.js-', '');
  const value = metric.value.toFixed(name === 'CLS' ? 1 : 0);

  console.info(
    `CWV-${name}:${value}:${
      metric.startTime ? Math.round(metric.startTime) : 0
    }`
  );
}
