import { ISnackbarStore, useSnackbarStore } from './SnackbarStore';

export const useSnackbar = (): Pick<
  ISnackbarStore,
  'alert' | 'hide' | 'isVisible'
> => {
  const { alert, hide, isVisible } = useSnackbarStore();

  return {
    alert,
    hide,
    isVisible,
  };
};
