import { useContext } from 'react';

import { GlobalContext } from './global.context';

export const useGlobal = () => useContext(GlobalContext);
