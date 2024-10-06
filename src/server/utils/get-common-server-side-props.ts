import { ICommonView } from '@/model';
import { getDeviceInfo } from '@/utils/get-device-info';
import { getReferer } from '@/utils/get-referer';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { pick } from 'radash';

export const serverGetCommonServerSideProps = async (
  ctx: GetServerSidePropsContext,
  namespaces: string[] = []
): Promise<ICommonView> => ({
  session: await getSession(ctx),
  ...getDeviceInfo(ctx.req.headers['user-agent']),
  messages: pick(
    (await import(`../../../messages/${ctx.locale}.json`)).default,
    [...namespaces, 'Common', 'Auth']
  ),
  referer: getReferer({
    headers: ctx.req.headers,
    redirect: '/',
  }),
});
