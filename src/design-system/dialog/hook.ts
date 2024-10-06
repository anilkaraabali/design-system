import { create } from 'zustand';

import { ButtonProps } from '../button';

type EmptyFunctionType = () => void;

interface ButtonActionInterface {
  label: string;
  props?: Omit<ButtonProps, 'type'>;
}

export interface IDialogStore {
  closeDialog: () => void;
  content: string;
  disableEscapeKeyDown?: boolean;
  isOpen: boolean;
  onOverlayClick?: EmptyFunctionType;
  openDialog: (
    dialog: Omit<IDialogStore, 'closeDialog' | 'isOpen' | 'openDialog'>
  ) => void;
  primaryAction: ButtonActionInterface;
  secondaryAction?: ButtonActionInterface;
}

const defaultState: Omit<IDialogStore, 'closeDialog' | 'openDialog'> = {
  content: '',
  isOpen: false,
  primaryAction: {
    label: '',
  },
  secondaryAction: {
    label: '',
  },
};

export const useDialog = create<IDialogStore>((set) => ({
  ...defaultState,
  closeDialog: (): void => set({ ...defaultState }),
  openDialog: (data): void => set({ ...data, isOpen: true }),
}));
