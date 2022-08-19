import { Request, Response } from "express";
import { Menus, Submenus } from "../models";
import { IMenu } from "../types/types";

const getMenus = async (request: Request, response: Response) => {
  try {
    const allMenus: IMenu[] = await Menus.find();
    response.status(200).json(allMenus);
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

const createMenu = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { title, id, icon, rank, link, port } = request.body;

    // Managing error from the input whether there is some empty input or not
    if (!title) {
      response.status(500).json({ errorMessage: `Menu title is required` });
    }
    if (!id) {
      response.status(500).json({ errorMessage: `Menu id is required` });
    }
    if (!icon) {
      response.status(500).json({ errorMessage: `Menu icon is required` });
    }
    if (!rank) {
      response.status(500).json({ errorMessage: `Menu rank is required` });
    }
    if (!link) {
      response.status(500).json({ errorMessage: `Menu link is required` });
    }
    if (!port) {
      response.status(500).json({ errorMessage: `Menu port is required` });
    }

    // if not
    // CREATING MENU
    const newMenu: IMenu = await Menus.create({
      title,
      id,
      icon,
      rank,
      link,
      port,
    });

    if (newMenu) {
      response.status(201).json(newMenu);
    }
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

const editMenu = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { menuid } = request.params;
    const { title, id, icon, rank, link, port } = request.body;

    const editedMenu: IMenu | null = await Menus.findOneAndUpdate(
      { id: menuid },
      {
        title,
        id,
        icon,
        rank,
        link,
        port,
      }
    );

    if (editedMenu) {
      response.status(200).json({ editedMenu });
    }
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

const removeMenu = async (request: Request, response: Response) => {
  try {
    const { menuid } = request.params;

    const deletedMenu = await Menus.findOneAndDelete({ id: menuid });
    // await Submenus.deleteMany({ parent: menuid }),
    if (deletedMenu) {
      response
        .status(200)
        .json({ Succes: "Menu and its submenu has been deleted successfully" });
    }
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

export { getMenus, createMenu, editMenu, removeMenu };
