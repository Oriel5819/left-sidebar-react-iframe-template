import * as React from "react";
import "./submenu.css";
import { FaPen, FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../../state/global.state";
import UpdateSubmenuModal from "../modals/updateSubmenu/updateSubmenuModal";
import DeleteSubmenuModal from "../modals/deleteSubmenu/deleteSubmenuModal";

interface SubmenuProps {
  menuTitle: string;
  menuId: string;
  submenuId: string;
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  menuPort: number;
  open: boolean;
}

const Submenu: React.FC<SubmenuProps> = ({
  menuId,
  submenuId,
  title,
  id,
  icon,
  rank,
  link,
  menuPort,
  open,
}) => {
  const [submenuHoverOn, setSubmenuHoverOn] = React.useState<boolean>(false);
  const [openEditSubmenuModal, setOpenEditSubmenuModal] =
    React.useState<boolean>(false);
  const [openDeleteSubmenuModal, setOpenDeleteSubmenuModal] =
    React.useState<boolean>(false);

  const sendUrl = (menu_port: number, submenu_link: string) => {
    localStorage.setItem("port", JSON.stringify(menu_port));
    localStorage.setItem("link", JSON.stringify(submenu_link));
    setGlobalState("port", menu_port);
    setGlobalState("link", submenu_link);
  };

  return (
    <li
      className="submenu"
      style={open ? { display: "block" } : { display: "none" }}
      // className={open ? "submenu-open" : "submenu-close"}
      onClick={() => sendUrl(menuPort, link)}
    >
      <UpdateSubmenuModal
        menuId={menuId}
        submenuId={submenuId}
        title={title}
        id={id}
        rank={rank}
        link={link}
        openEditSubmenuModal={openEditSubmenuModal}
        setOpenEditSubmenuModal={setOpenEditSubmenuModal}
      />

      <DeleteSubmenuModal
        title={title}
        menuId={menuId}
        submenuId={id}
        openDeleteSubmenuModal={openDeleteSubmenuModal}
        setOpenDeleteSubmenuModal={setOpenDeleteSubmenuModal}
      />

      <button
        onMouseEnter={() => setSubmenuHoverOn(true)}
        onMouseLeave={() => setSubmenuHoverOn(false)}
      >
        <div className="submenu-title">{title.toLocaleUpperCase()}</div>
        {useGlobalState("isAdministrator")[0] && submenuHoverOn && (
          <div className="submenu-options">
            <FaPen
              className="submenu-icon-button"
              onClick={() => setOpenEditSubmenuModal(true)}
            />
            <FaTimes
              className="submenu-icon-button"
              onClick={() => setOpenDeleteSubmenuModal(true)}
            />
          </div>
        )}
      </button>
    </li>
  );
};

export default Submenu;
