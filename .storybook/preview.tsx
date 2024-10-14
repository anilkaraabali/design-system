import type { Preview } from '@storybook/react';
import React from 'react';
import { Lato, Noto_Sans } from 'next/font/google';
import './styles.scss';

import { Snackbar } from '../src/design-system/snackbar';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '../messages/en.json';

const fontHeading = Lato({
  subsets: ['latin-ext'],
  weight: ['300', '400', '700'],
  style: ['normal'],
});

const fontDefault = Noto_Sans({
  style: 'normal',
  subsets: ['latin-ext'],
  weight: ['400', '500'],
});

const preview: Preview = {
  decorators: [
    (Story, args) => {
      const locale = args.globals.locale;

      return (
        <NextIntlClientProvider
          locale={locale}
          messages={enMessages}
          timeZone='Europe/Berlin'
        >
          <style>{`
            :root {
              --font-family-heading: ${fontHeading.style.fontFamily};
              --font-family-default: ${fontDefault.style.fontFamily};
            }
          `}</style>
          <Snackbar />
          <Story />
        </NextIntlClientProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: false,
    },
  },
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'de', right: '🇩🇪', title: 'German' },
        ],
      },
    },
  },
};

export default preview;
