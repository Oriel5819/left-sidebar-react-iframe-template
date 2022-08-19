import axios from "axios";
import Menu from "../models/menus.model";
import { IMenu } from "../types/types";

export default async function fetchMenus(): Promise<Menu[]> {
  const { data } = await axios.get<Menu[]>("http://localhost:5000/menu");
  return data;
}

export async function createMenu({
  title,
  id,
  icon,
  rank,
  link,
  port,
}: IMenu): Promise<Menu> {
  const { data } = await axios.post<Menu>("http://localhost:5000/menu/create", {
    title,
    id,
    icon,
    rank,
    link,
    port,
  });

  return data;
}

export async function editMenu(
  menuid: string,
  { id, title, icon, rank, link, port }: IMenu
): Promise<Menu> {
  const { data } = await axios.put<Menu>(
    `http://localhost:5000/menu/edit/${menuid}`,
    {
      title,
      id,
      icon,
      rank,
      link,
      port,
    }
  );
  return data;
}

export async function removeMenu(id: string): Promise<Menu> {
  const { data } = await axios.delete<Menu>(
    `http://localhost:5000/menu/delete/${id}`
  );
  return data;
}
