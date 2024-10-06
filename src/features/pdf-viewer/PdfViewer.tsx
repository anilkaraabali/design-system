import { Breadcrumbs } from '@/design-system/breadcrumbs';
import { CircularProgress } from '@/design-system/circular-progress';
import { getBreadcrumbs } from '@/utils/get-breadcrumbs';
import { useRouter } from 'next/router';
import { list, throttle } from 'radash';
import { useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import styles from './PdfViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

interface PdfViewerProps {
  fileName: string;
  title: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ fileName, title }) => {
  const { pathname } = useRouter();

  const [numPages, setNumPages] = useState<null | number>(null);
  const [initialWidth, setInitialWidth] = useState<number | undefined>(
    undefined
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  useEffect(() => {
    const listener = () => {
      const element = document.querySelector('#main');
      setInitialWidth(element?.getBoundingClientRect().width);
    };

    window.addEventListener('resize', throttle({ interval: 500 }, listener));
    listener();

    return () => {
      window.removeEventListener(
        'resize',
        throttle({ interval: 500 }, listener)
      );
    };
  }, []);

  const PageWrapper = useCallback<React.FC<{ pageNumber: number }>>(
    ({ pageNumber }) => (
      <Page pageNumber={pageNumber + 1} width={initialWidth} />
    ),
    [initialWidth]
  );

  return (
    <>
      <div className={styles['pdf-layout__header']}>
        <Breadcrumbs
          className={styles['pdf-layout__breadcrumbs']}
          options={getBreadcrumbs([
            {
              title,
              url: pathname,
            },
          ])}
        />
        <h1 className={styles['pdf-layout__title']}>{title}</h1>
      </div>
      <Document
        file={fileName}
        loading={<CircularProgress size='xlarge' />}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          list(numPages - 1).map((pageNumber) => (
            <PageWrapper key={`page_${pageNumber}`} pageNumber={pageNumber} />
          ))}
      </Document>
    </>
  );
};
