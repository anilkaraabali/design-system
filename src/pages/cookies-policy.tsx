import type { GetServerSideProps } from 'next';

import { PdfViewProps } from '@/features/pdf-viewer/PdfView';
import { serverGetCommonServerSideProps } from '@/server/utils/get-common-server-side-props';
import { promiseAllSettled } from '@/utils/promise-all-settled';

export const getServerSideProps = (async (ctx) => {
  const [messages] = await promiseAllSettled([
    serverGetCommonServerSideProps(ctx),
  ]);

  return {
    props: {
      fileName:
        'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
      title: 'Cookies policy',
      ...messages,
    },
  };
}) satisfies GetServerSideProps<PdfViewProps>;

export { default } from '@/features/pdf-viewer/PdfView';
