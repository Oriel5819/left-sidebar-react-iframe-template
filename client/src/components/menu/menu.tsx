import React from "react";
import "./menu.css";
import * as FontAwesome from "react-icons/fa";
import { BiDotsHorizontal } from "react-icons/bi";
import { IconType } from "react-icons";
import Submenu from "../submenu/submenu";
import Modal from "react-modal";
import { setGlobalState, useGlobalState } from "../../state/global.state";
import { editMenu, removeMenu } from "../../services/menu.service";
import createSubmenu from "../../services/submenu.services";
import UpdateMenuModal from "../modals/updateMenu/updateMenuModal";
import CreateSubmenuModal from "../modals/createSubmenu/createSubmenuModal";

interface MenuProps {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  port: string;
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

  const handleMenuAction = () => {
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
            className="menu-button"
            onMouseEnter={(e) => setShowOption(true)}
            onMouseLeave={(e) => setShowOption(false)}
          >
            <button
              className="menu-button-itself"
              id={title.toLocaleLowerCase()}
              onClick={() => handleOpenMenu(id)}
            >
              <div className="menu-button-left-content">
                {/* //! CHECKING IF THE ICON IN THE DATABASE EXISTS IN THE IMPORTED ICONS */}
                {allFonts[`${icon}`] ? (
                  React.createElement(allFonts[`${icon}`])
                ) : (
                  <FontAwesome.FaInfoCircle />
                )}
                {/* //! CHECKING IF THE ICON IN THE DATABASE EXISTS IN THE IMPORTED ICONS */}
                {title.toLocaleUpperCase()}
              </div>
            </button>
            {showOption ? (
              <div className="menu-button-option">
                <FontAwesome.FaPlus
                  className="menu-button-option-icon"
                  onClick={() => setOpenAddSubmenuModal(!openAddSubmenuModal)}
                />
                <BiDotsHorizontal
                  className="menu-button-option-icon"
                  onClick={() => handleMenuAction()}
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
                    transition: "max-height 1s ease",
                  }
                : { maxHeight: "0", transition: "max-height 1s ease" }
            }
          >
            {allSubmenus.map((submenu, index) => {
              return (
                <Submenu
                  key={index}
                  menuTitle={title}
                  menuId={id}
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
