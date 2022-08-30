import { Request, Response } from "express";
import Menu from "../models/menu.model";
import { Menus } from "../models";

export const createSubmenu = async (request: Request, response: Response) => {
  try {
    const { menuid } = request.params;
    const { title, id, icon, rank, link } = request.body;

    // let all_child_amount = await Submenu.find({ parent: parent });

    // UPDATING THE PARENT MENU
    const createdSubmenu = await Menus.findOneAndUpdate(
      { id: menuid },
      { $push: { submenus: { title, id, icon, rank, link } } },
      { new: true }
    );

    // let _rank = all_child_amount.length;

    // /* CREATING THE NEW SUBMENU */

    // // CHECK SUBMENU EXISTANCE
    // let new_menu = await new Submenu({
    //   title,
    //   id: menu_parent.id + "-" + title.toLocaleLowerCase(),
    //   icon,
    //   rank: _rank,
    //   parent,
    // });
    // new_menu.save();
    // /* CREATING THE NEW SUBMENU */

    if (createdSubmenu) {
      response
        .status(200)
        .json({ menuid, newSubmenu: { title, id, icon, rank, link } });
    }
  } catch (error) {
    response.status(500).json({ error: "error.message" });
  }
};

export const editSubmenu = async (request: Request, response: Response) => {
  try {
    const { menuid, submenuid } = request.params; // submenuId
    const { title, id, icon, rank, link } = request.body;

    // link could not be registered

    const updatedSubmenu = await Menu.findOneAndUpdate(
      { id: menuid },
      {
        $set: {
          "submenus.$[selectedSubmenu].title": title,
          "submenus.$[selectedSubmenu].id": id,
          "submenus.$[selectedSubmenu].icon": icon,
          "submenus.$[selectedSubmenu].rank": rank,
          "submenus.$[selectedSubmenu].link": link,
        },
      },
      { arrayFilters: [{ "selectedSubmenu.id": submenuid }] }
    );

    if (updatedSubmenu) {
      response.status(200).json({
        menuid,
        submenuid,
        updatedSubmenu: { title, id, icon, rank, link },
      });
    }
  } catch (error) {
    response.status(500).json({ error: "error.message" });
  }
};

export const removeSubmenu = async (request: Request, response: Response) => {
  try {
    const { menuid, submenuid } = request.params;

    const deletedSubmenu = await Menu.findOneAndUpdate(
      { id: menuid },
      { $pull: { submenus: { id: submenuid } } }
    );

    if (deletedSubmenu) {
      response.status(200).json({ menuid, submenuid });
    }
  } catch (error) {
    response.status(500).json({ error: error });
  }
};
