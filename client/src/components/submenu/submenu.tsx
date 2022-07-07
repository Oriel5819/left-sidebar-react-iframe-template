import * as React from "react";
import "./submenu.css";
import { FaPen, FaTimes } from "react-icons/fa";
import { setGlobalState } from "../../state/global.state";
import UpdateSubmenuModal from "../modals/updateSubmenu/updateSubmenuModal";
import DeleteSubmenuModal from "../modals/deleteSubmenu/deleteSubmenuModal";

interface SubmenuProps {
  menuTitle: string;
  menuId: string;
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  menuPort: string;
  open: boolean;
}

const Submenu: React.FC<SubmenuProps> = ({
  menuId,
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

  const sendUrl = (menu_port: string, submenu_link: string) => {
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
        title={title}
        id={id}
        icon={icon}
        rank={rank}
        link={link}
        openEditSubmenuModal={openEditSubmenuModal}
        setOpenEditSubmenuModal={setOpenEditSubmenuModal}
      />

      <DeleteSubmenuModal
        title={title}
        menuId={menuId}
        id={id}
        openDeleteSubmenuModal={openDeleteSubmenuModal}
        setOpenDeleteSubmenuModal={setOpenDeleteSubmenuModal}
      />

      <button
        onMouseEnter={() => setSubmenuHoverOn(true)}
        onMouseLeave={() => setSubmenuHoverOn(false)}
      >
        <div className="submenu-title">{title}</div>
        {submenuHoverOn && (
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
