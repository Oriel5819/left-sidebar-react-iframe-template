import React from "react";
import MenusModels from "../../models/menus.model";
import { useGlobalState } from "../../state/global.state";
import MenuButton from "../../components/menu/menu";

interface MenusProps {
  search: string;
  allMenus: MenusModels[] | undefined;
  menutorender: any[];
  setAllMenus: React.Dispatch<React.SetStateAction<MenusModels[] | undefined>>;
}

const Menus = ({ search, allMenus, menutorender, setAllMenus }: MenusProps) => {
  const openMenuId = useGlobalState("openMenuId")[0];
  const refresh = useGlobalState("refresh")[0];

  return (
    <div className="menu-button-wrap">
      {search.length !== 0
        ? allMenus
            ?.filter((_menu) =>
              _menu.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            ?.map((menu) => {
              menutorender.push(menu);
            }) &&
          allMenus?.map((menu) => {
            menu.submenus
              ?.filter((_submenu) =>
                _submenu.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              ?.map((submenu) => {
                let temp_menu = {
                  title: menu.title,
                  id: menu.id,
                  icon: menu.icon,
                  rank: menu.rank,
                  submenus: [submenu],
                };
                menutorender.push(temp_menu);
              });
          })
        : allMenus?.map((menu) => {
            menutorender.push(menu);
          })}

      {menutorender.length !== 0 &&
        menutorender?.map((_menu, _index) => {
          return (
            <MenuButton
              key={_index}
              title={_menu.title}
              id={_menu.id}
              icon={_menu.icon}
              rank={_menu.rank}
              link={_menu.link}
              port={_menu.port}
              submenus={_menu.submenus}
              openIf={search ? _menu.id : openMenuId}
            />
          );
        })}
    </div>
  );
};

export default Menus;
