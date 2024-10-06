import { createContext } from 'react';

interface GlobalContext {
  isMobile: boolean;
  isTouchable: boolean;
  referer: string;
}

export const GlobalContext = createContext<GlobalContext>({
  isMobile: true,
  isTouchable: true,
  referer: '/',
});

export const GlobalProvider: React.FC<
  React.PropsWithChildren<GlobalContext>
> = ({ children, ...value }) => (
  <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
);
