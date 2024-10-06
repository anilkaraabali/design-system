import type { InferGetServerSidePropsType } from 'next';

import { ICommonView } from '@/model';
import { getServerSideProps } from '@/pages/agb';

import { PdfViewer } from './PdfViewer';

export interface PdfViewProps extends ICommonView {
  fileName: string;
  title: string;
}

export default function PdfView({
  fileName,
  title,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <PdfViewer fileName={fileName} title={title} />;
}
