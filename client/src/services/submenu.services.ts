import axios from "axios";
import Submenu from "../models/submenus.models";

export default async function createSubmenu(
  title: string,
  id: string,
  icon: string,
  rank: number,
  link: string,
  parentId: string
): Promise<Submenu> {
  const { data } = await axios.post<Submenu>(
    "http://localhost:5000/submenu/create",
    { title, id, icon, rank, parent: parentId, link }
  );
  return data;
}

export async function editSubmenu(
  menuId: string,
  submenuId: string,
  title: string,
  id: string,
  icon: string,
  rank: number,
  link: string
): Promise<Submenu> {
  const { data } = await axios.put<Submenu>(
    "http://localhost:5000/submenu/edit/" + submenuId,
    { menuId, title, id, icon, rank, link }
  );
  return data;
}

export async function removeSubmenu(
  menuId: string,
  submenuId: string
): Promise<Submenu> {
  const { data } = await axios.delete<Submenu>(
    "http://localhost:5000/submenu/delete/" + menuId + "/" + submenuId
  );
  return data;
}
