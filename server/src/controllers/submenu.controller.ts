import { Express, Request, Response, NextFunction, Router } from "express";
import Submenu from "../models/submenu.model";
import Menu from "../models/menu.model";

export default async function createSubmenu(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, id, icon, rank, link, parent } = req.body;

    // let all_child_amount = await Submenu.find({ parent: parent });

    // UPDATING THE PARENT MENU
    let menu_parent = await Menu.findOneAndUpdate(
      { id: parent },
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

    res.status(200).json({
      menu_parent,
    });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
}

export async function editSubmenu(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { menuId, title, id: submenu_id, icon, rank, link } = req.body;

    // link could not be registered

    await Menu.findOneAndUpdate(
      { id: menuId },
      {
        $set: {
          "submenus.$[selectedSubmenu].title": title,
          "submenus.$[selectedSubmenu].id": submenu_id,
          "submenus.$[selectedSubmenu].icon": icon,
          "submenus.$[selectedSubmenu].rank": rank,
          "submenus.$[selectedSubmenu].link": link,
        },
      },
      { arrayFilters: [{ "selectedSubmenu.id": id }] }
    );

    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
}

export async function removeSubmenu(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { menuid, submenuid } = req.params;

    await Menu.findOneAndUpdate(
      { id: menuid },
      { $pull: { submenus: { id: submenuid } } }
    );

    res.status(200).json({ message: "submenu deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
