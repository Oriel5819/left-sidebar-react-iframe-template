import Submenu from "./submenus.models";

export default interface Menu {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  submenus: Submenu[];
}
