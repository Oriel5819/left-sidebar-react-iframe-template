export interface IMenu {
  title: string | null;
  id: string | null;
  icon: string | null;
  rank: number | null;
  link: string | null;
  port: number | null;
}

export interface ISubmenu {
  title: string | null;
  id: string | null;
  rank: number | null;
  link: string | null;
}
