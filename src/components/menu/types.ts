export interface IMenuItem {
  children?: IMenuItem[];
  coverImage?: string;
  key: string;
  label: string;
  url: string;
}
