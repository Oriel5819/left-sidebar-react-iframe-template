import * as React from "react";
import "./sidebar.css";
import Menus from "../../models/menus.model";
import { setGlobalState, useGlobalState } from "../../state/global.state";
import Search from "../../components/search/search";
import AddMenuButton from "../../components/buttons/addMenuButton/addMenuButton";
import MenuButton from "../../components/menu/menu";
import fetchMenus from "../../services/menu.service";
import CreateMenuModal from "../../components/modals/createMenu/createMenuModal";

const Sidebar: React.FC = () => {
  const [allMenus, setAllMenus] = React.useState<Menus[]>();
  const refresh = useGlobalState("refresh")[0];
  const [searchItem, setSearchItem] = React.useState<string>("");
  const openMenuId = useGlobalState("openMenuId")[0];
  let menusToRender: any[] = [];
  const [openAddMenuModal, setOpenAddMenuModal] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    fetchMenus()
      .then((result) => setAllMenus(result))
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleOpenAddMenuModal = () => {
    setOpenAddMenuModal(!openAddMenuModal);
  };

  return (
    <div
      className={
        useGlobalState("showSidebar")[0] === false
          ? "sidebar-close"
          : "sidebar-open"
      }
    >
      {/* modal for creating new menu */}
      <CreateMenuModal
        open={openAddMenuModal}
        setOpenAddMenuModal={setOpenAddMenuModal}
      />
      {/* modal for creating new menu */}

      <div>
        <Search search={searchItem} searchFunction={setSearchItem} />
        <div className="menu-button-wrap">
          {searchItem.length !== 0
            ? allMenus
                ?.filter((_menu) =>
                  _menu.title
                    .toLocaleLowerCase()
                    .includes(searchItem.toLocaleLowerCase())
                )
                ?.map((menu) => {
                  menusToRender.push(menu);
                }) &&
              allMenus?.map((menu) => {
                menu.submenus
                  ?.filter((_submenu) =>
                    _submenu.title
                      .toLocaleLowerCase()
                      .includes(searchItem.toLocaleLowerCase())
                  )
                  ?.map((submenu) => {
                    let temp_menu = {
                      title: menu.title,
                      id: menu.id,
                      icon: menu.icon,
                      rank: menu.rank,
                      submenus: [submenu],
                    };
                    menusToRender.push(temp_menu);
                  });
              })
            : allMenus?.map((menu) => {
                menusToRender.push(menu);
              })}

          {menusToRender.length !== 0 &&
            menusToRender?.map((_menu, _index) => {
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
                  openIf={searchItem ? _menu.id : openMenuId}
                />
              );
            })}
        </div>
      </div>
      <AddMenuButton
        openAddMenuModal={openAddMenuModal}
        handleOpenAddMenuModal={handleOpenAddMenuModal}
      />
    </div>
  );
};

export default Sidebar;
