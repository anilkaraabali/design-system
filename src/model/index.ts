import { getDeviceInfo } from '@/utils/get-device-info';
import { getSession } from 'next-auth/react';
import { AbstractIntlMessages, NestedKeyOf, useTranslations } from 'next-intl';

export type DynamicTranslationKey = NestedKeyOf<
  Parameters<ReturnType<typeof useTranslations>>[0]
>;

export type LocaleType = 'en';

export interface ICommonView extends ReturnType<typeof getDeviceInfo> {
  messages: AbstractIntlMessages;
  referer: string;
  session: Awaited<ReturnType<typeof getSession>>;
}
