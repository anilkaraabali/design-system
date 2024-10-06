import { EmptyState } from '@/design-system/empty-state';
import { IconArrowLeft } from '@/design-system/icons';
import { DynamicTranslationKey, ICommonView } from '@/model';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { ErrorProps as NextErrorProps } from 'next/error';

import styles from './Error.module.scss';

export interface ErrorProps extends ICommonView, NextErrorProps {
  detail?: string;
  messages: AbstractIntlMessages;
}

export const Error: React.FC<ErrorProps> = (props) => {
  const t = useTranslations('Error');

  return (
    <EmptyState
      action={{
        children: t('cta'),
        href: '/',
        icon: {
          component: IconArrowLeft,
          position: 'prefix',
        },
        theme: 'primary',
      }}
      className={styles['error']}
      description={t(`${props.statusCode}.detail` as DynamicTranslationKey)}
      heading={t(`${props.statusCode}.title` as DynamicTranslationKey)}
      imageUrl='/images/illustrations/error.svg'
    />
  );
};
