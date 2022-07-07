import { Express, Request, Response, NextFunction, Router } from "express";
import Menu from "../models/menu.model";
import Submenu from "../models/submenu.model";

async function getMenus(req: Request, res: Response, next: NextFunction) {
  try {
    let allMenus: Object[] = await Menu.find();
    res.status(200).json(allMenus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function createMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, id: css_id, icon, rank, link, port, submenus } = req.body;
    const submenu_array: Object[] = [];

    if (!title) {
      return res.status(400).json({ errorMessage: `Menu title is required` });
    }

    if (!css_id) {
      return res.status(400).json({ errorMessage: `Menu id is required` });
    }

    if (!icon) {
      return res.status(400).json({ errorMessage: `Menu icon is required` });
    }

    if (!rank) {
      return res.status(400).json({ errorMessage: `Menu rank is required` });
    }

    if (!link) {
      return res.status(400).json({ errorMessage: `Menu link is required` });
    }

    if (!port) {
      return res.status(400).json({ errorMessage: `Menu port is required` });
    }

    // if (submenus) {
    //   for (let index = 0; index < submenus.length; index++) {
    //     let submenu_title = submenus[index].title;
    //     let submenu_icon = submenus[index].icon;

    //     let temp_: object = {
    //       title: submenu_title,
    //       id:
    //         css_id.toLocaleLowerCase() +
    //         "-" +
    //         submenu_title.toLocaleLowerCase(),
    //       icon: submenu_icon,
    //       rank: index,
    //       link:
    //         "/" +
    //         title.toLocaleLowerCase() +
    //         "/" +
    //         submenu_title.toLocaleLowerCase(),
    //     };

    //     submenu_array.push(temp_);
    //   }

    //   // CREATING MENU
    //   let new_menu = await new Menu({
    //     title,
    //     id: css_id,
    //     icon,
    //     rank,
    //     link: "/" + title.toLocaleLowerCase(),
    //     submenus: submenu_array,
    //   });

    //   new_menu
    //     .save()
    //     .then((new_menu: any) => res.status(201).json(new_menu))
    //     .catch((errorMessage: any) => res.status(400).json({ errorMessage }));
    // } else {}

    // CREATING MENU
    let new_menu = await new Menu({
      title,
      id: css_id,
      icon,
      rank,
      link,
      port,
    });

    new_menu
      .save()
      .then((new_menu: any) => res.status(201).json(new_menu))
      .catch((err: any) => res.status(400).json({ error: err.message }));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function editMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, id: css_id, icon, rank, link, port } = req.body;

    let edited_menu = await Menu.findOneAndUpdate(
      { id: id },
      { title, id: css_id, icon, rank, link, port }
    );

    return res.status(200).json({ edited_menu });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function removeMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    await Menu.deleteOne({ id: id });
    // await Submenu.deleteMany({ parent: id }),
    res
      .status(200)
      .json({ Succes: "Menu and its submenu has been deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default getMenus;
export { createMenu, editMenu, removeMenu };
