export interface IMenu {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  submenus: ISubmenu[];
}

export interface ISubmenu {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
}
