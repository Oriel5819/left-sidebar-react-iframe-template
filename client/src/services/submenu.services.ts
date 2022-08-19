import axios from "axios";
import { ISubmenu } from "../types/types";

export default async function createSubmenu(
  menuid: string,
  { title, id, rank, link }: ISubmenu
): Promise<ISubmenu> {
  const { data } = await axios.post<ISubmenu>(
    `http://localhost:5000/submenu/create/${menuid}`,
    { title, id, rank, link }
  );
  return data;
}

export async function editSubmenu(
  menuId: string,
  submenuId: string,
  { title, id, rank, link }: ISubmenu
): Promise<ISubmenu> {
  const { data } = await axios.put<ISubmenu>(
    `http://localhost:5000/submenu/edit/${menuId}/${submenuId}`,
    { menuId, title, id, rank, link }
  );
  return data;
}

export async function removeSubmenu(
  menuId: string,
  submenuId: string
): Promise<ISubmenu> {
  const { data } = await axios.delete<ISubmenu>(
    `http://localhost:5000/submenu/delete/${menuId}/${submenuId}`
  );
  return data;
}
