import React from "react";
import Modal from "react-modal";
import * as FontAwesome from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { editMenu, removeMenu } from "../../../services/menu.service";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};
Modal.setAppElement("#root");

interface UpdateMenuProps {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  port: string;
  optionAction: boolean;
  setOptionAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateMenuModal = ({
  title,
  id,
  icon,
  rank,
  link,
  port,
  optionAction,
  setOptionAction,
}: UpdateMenuProps) => {
  const [menuTitle, setMenuTitle] = React.useState<string>(title);
  const [menuId, setMenuId] = React.useState<string>(id);
  const [menuIcon, setMenuIcon] = React.useState<string>(icon);
  const [menuRank, setMenuRank] = React.useState<number>(rank);
  const [menuLink, setMenuLink] = React.useState<string>(link);
  const [menuPort, setMenuPort] = React.useState<string>(port);
  const refresh = useGlobalState("refresh")[0];

  const handleUpdateMenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    editMenu(
      id,
      menuTitle,
      menuId,
      menuIcon,
      menuRank,
      menuLink,
      menuPort
    ).then((result) => {
      setOptionAction(!optionAction);
      setGlobalState("refresh", !refresh);
    });
  };

  const handleDeleteMenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    removeMenu(id).then((result) => {
      setOptionAction(!optionAction);
      setGlobalState("refresh", !refresh);
    });
  };

  return (
    <Modal
      isOpen={optionAction}
      onRequestClose={() => false}
      style={customStyles}
    >
      <div className="modal-header">
        <button
          className="icon-button"
          onClick={() => setOptionAction(!optionAction)}
        >
          <FontAwesome.FaTimes />
        </button>
        Edit menu
      </div>
      <form>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setMenuTitle(e.target.value)}
            value={menuTitle}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => setMenuId(e.target.value)}
            value={menuId}
          />
          <input
            type="text"
            placeholder="Icon"
            onChange={(e) => setMenuIcon(e.target.value)}
            value={menuIcon}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(e) => setMenuRank(e.target.value as unknown as number)}
            value={menuRank}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setMenuLink(e.target.value)}
            value={menuLink}
          />
          <input
            type="text"
            placeholder="Port"
            onChange={(e) => setMenuPort(e.target.value)}
            value={menuPort}
          />
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            className="delete-button"
            onClick={handleDeleteMenu}
          >
            <FontAwesome.FaTrash /> Delete
          </button>
          <button
            type="submit"
            className="update-button"
            onClick={handleUpdateMenu}
          >
            <FontAwesome.FaEdit /> Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateMenuModal;
