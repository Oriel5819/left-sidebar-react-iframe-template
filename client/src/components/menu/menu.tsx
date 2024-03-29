import React from "react";
import "./menu.css";
import * as FontAwesome from "react-icons/fa";
import { BiDotsHorizontal } from "react-icons/bi";
import { IconType } from "react-icons";
import Submenu from "../submenu/submenu";
import { setGlobalState, useGlobalState } from "../../state/global.state";
import UpdateMenuModal from "../modals/updateMenu/updateMenuModal";
import CreateSubmenuModal from "../modals/createSubmenu/createSubmenuModal";

interface MenuProps {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  port: number;
  submenus: any[];
  openIf: string;
}

const Menu = ({
  title,
  id,
  icon,
  rank,
  link,
  port,
  submenus,
  openIf,
}: MenuProps) => {
  //! note RETRIEVING ALL IMPORTED FONTAWESOME
  const allFonts: IconType[] | any = FontAwesome;
  const [open, setOpen] = React.useState<boolean>(true);
  const [showOption, setShowOption] = React.useState<boolean>(false);
  const height = 40;
  const allSubmenus: any[] = submenus;
  const openMenuId = useGlobalState("openMenuId")[0];
  const [openAddSubmenuModal, setOpenAddSubmenuModal] =
    React.useState<boolean>(false);
  const [optionAction, setOptionAction] = React.useState<boolean>(false);

  const handleMenuAction = (id: string) => {
    setOptionAction(!optionAction);
  };

  const handleOpenMenu = (menuId: string) => {
    if (openMenuId === menuId) {
      setGlobalState("openMenuId", "");
    } else {
      setGlobalState("openMenuId", menuId);
    }
    setOpen(true);
  };

  return (
    <div>
      <UpdateMenuModal
        menuid={id}
        title={title}
        id={id}
        icon={icon}
        rank={rank}
        link={link}
        port={port}
        optionAction={optionAction}
        setOptionAction={setOptionAction}
      />

      <CreateSubmenuModal
        menuId={id}
        openAddSubmenuModal={openAddSubmenuModal}
        setOpenAddSubmenuModal={setOpenAddSubmenuModal}
      />

      {
        <div className="menu-wrap">
          <div
            className={
              open && openIf === id ? "menu-button-open" : "menu-button-close"
            }
            onMouseEnter={(e) => setShowOption(true)}
            onMouseLeave={(e) => setShowOption(false)}
          >
            <button
              className="menu-button-itself"
              id={title.toLocaleLowerCase()}
              onClick={() => handleOpenMenu(id)}
            >
              <div className="menu-button-left-content">
                {/* //! CHECKING WHETHER THE ICON IN THE DATABASE EXISTS IN THE IMPORTED ICONS */}
                {allFonts[`${icon}`] ? (
                  React.createElement(allFonts[`${icon}`])
                ) : (
                  <FontAwesome.FaInfoCircle />
                )}
                {/* //! CHECKING WHETHER THE ICON IN THE DATABASE EXISTS IN THE IMPORTED ICONS */}
                <div className="title">{title.toLocaleUpperCase()}</div>
              </div>
            </button>
            {useGlobalState("isAdministrator")[0] && showOption ? (
              <div className="menu-button-option">
                <FontAwesome.FaPlus
                  className="menu-button-option-icon"
                  onClick={() => setOpenAddSubmenuModal(!openAddSubmenuModal)}
                />
                <BiDotsHorizontal
                  className="menu-button-option-icon"
                  onClick={() => handleMenuAction(id)}
                />
              </div>
            ) : (
              <div
                className={
                  open && openIf === id
                    ? "menu-button-submenu-count-open"
                    : "menu-button-submenu-count-close"
                }
              >
                {submenus.length}
              </div>
            )}
          </div>
          <ul
            className="submenu-wrapper"
            style={
              open && openIf === id
                ? {
                    maxHeight: allSubmenus.length * height,
                    transition: "max-height 0.5s ease",
                  }
                : { maxHeight: "0", transition: "max-height 0.5s ease" }
            }
          >
            {allSubmenus.map((submenu, index) => {
              return (
                <Submenu
                  key={index}
                  menuTitle={title}
                  menuId={id}
                  submenuId={submenu.id}
                  title={submenu.title}
                  id={submenu.id}
                  icon={submenu.icon}
                  rank={submenu.rank}
                  link={submenu.link}
                  menuPort={port}
                  open={open}
                />
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
};

export default Menu;
