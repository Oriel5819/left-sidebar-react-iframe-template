import axios from "axios";
import Menu from "../models/menus.model";

export default async function fetchMenus(): Promise<Menu[]> {
  const { data } = await axios.get<Menu[]>("http://localhost:5000/menu");
  return data;
}

export async function createMenu(
  title: string,
  id: string,
  icon: string,
  rank: number,
  link: string
): Promise<Menu> {
  const { data } = await axios.post<Menu>("http://localhost:5000/menu/create", {
    title: title,
    id: id,
    icon: icon,
    rank: rank,
    link: link,
  });
  return data;
}

export async function editMenu(
  id: string,
  title: string,
  new_id: string,
  icon: string,
  rank: number,
  link: string,
  port: string
): Promise<Menu> {
  const { data } = await axios.put<Menu>(
    "http://localhost:5000/menu/edit/" + id,
    { title, new_id, icon, rank, link, port }
  );
  return data;
}

export async function removeMenu(id: string): Promise<Menu> {
  const { data } = await axios.delete<Menu>(
    "http://localhost:5000/menu/delete/" + id
  );
  return data;
}
