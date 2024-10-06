import { Error, ErrorProps } from '@/components/error';
import { getDeviceInfo } from '@/utils/get-device-info';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { pick } from 'radash';

const CustomError: NextPage<ErrorProps> = (props) => <Error {...props} />;

CustomError.getInitialProps = async ({
  locale,
  req,
  res,
}): Promise<ErrorProps> => ({
  session: await getSession({ req }),
  ...getDeviceInfo(req?.headers['user-agent']),
  messages: pick((await import(`../../messages/${locale}.json`)).default, [
    'Common',
    'Error',
  ]),
  referer: '/',
  statusCode: res?.statusCode || 500,
});

export default CustomError;
