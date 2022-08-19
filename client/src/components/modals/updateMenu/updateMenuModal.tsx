import React, { useState } from "react";
import Modal from "react-modal";
import * as FontAwesome from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { editMenu, removeMenu } from "../../../services/menu.service";
import { customStyles } from "../commonModalStyle";
import { IMenu } from "../../../types/types";

Modal.setAppElement("#root");

interface UpdateMenuProps {
  menuid: string;
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  port: number;
  optionAction: boolean;
  setOptionAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateMenuModal = ({
  menuid,
  title,
  id,
  icon,
  rank,
  link,
  port,
  optionAction,
  setOptionAction,
}: UpdateMenuProps) => {
  const [updateMenu, setUpdateMenu] = useState<IMenu>({
    title,
    id,
    icon,
    rank,
    link,
    port,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const refresh = useGlobalState("refresh")[0];
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleUpdateMenu = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const updatedMenu = await editMenu(menuid, updateMenu);

    if (updatedMenu) {
      setOptionAction(!optionAction);
      setGlobalState("refresh", !refresh);
    }
  };

  const handleDeleteMenu = async (
    id: string,
    event: { preventDefault: () => void }
  ) => {
    event.preventDefault();
    const removedMenu = await removeMenu(id);
    if (removedMenu) {
      setGlobalState("refresh", !refresh);
    }
  };

  return (
    <div className="update-and-remove">
      <Modal
        isOpen={openDeleteModal}
        onRequestClose={() => false}
        style={customStyles}
      >
        <div className="modal-header">
          <div className="title">Menu</div>
          <button
            className="icon-button"
            onClick={() => setOptionAction(!optionAction)}
          >
            <FontAwesome.FaTimes />
          </button>
        </div>
        <form>
          <div className="modal-body">
            <p>Would you really want to delete this menu ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="delete-button"
              onClick={(event) => handleDeleteMenu(menuid, event)}
            >
              <FontAwesome.FaTrash /> Delete
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={optionAction}
        onRequestClose={() => false}
        style={customStyles}
      >
        <div className="modal-header">
          <div className="title">Menu</div>
          <button
            className="icon-button"
            onClick={() => setOptionAction(!optionAction)}
          >
            <FontAwesome.FaTimes />
          </button>
        </div>
        <form>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Title"
              onChange={(event) =>
                setUpdateMenu({ ...updateMenu, title: event.target.value })
              }
              value={updateMenu.title ?? ""}
            />
            <input
              type="text"
              placeholder="Id"
              onChange={(event) =>
                setUpdateMenu({ ...updateMenu, id: event.target.value })
              }
              value={updateMenu.id ?? ""}
            />
            <input
              type="text"
              placeholder="Icon"
              onChange={(event) =>
                setUpdateMenu({ ...updateMenu, icon: event.target.value })
              }
              value={updateMenu.icon ?? ""}
            />
            <input
              type="text"
              placeholder="Rank"
              onChange={(event) => {
                const re = /^[0-9\b]+$/;
                if (event.target.value === "" || re.test(event.target.value)) {
                  setErrorMessage(null);
                  setUpdateMenu({
                    ...updateMenu,
                    rank: event.target.value as unknown as number,
                  });
                } else {
                  setErrorMessage("Only numbers are allowed");
                }
              }}
              value={updateMenu.rank ?? ""}
            />
            <input
              type="text"
              placeholder="Link"
              onChange={(event) =>
                setUpdateMenu({ ...updateMenu, link: event.target.value })
              }
              value={updateMenu.link ?? ""}
            />
            <input
              type="text"
              placeholder="Port"
              onChange={(event) => {
                const re = /^[0-9\b]+$/;
                if (event.target.value === "" || re.test(event.target.value)) {
                  setErrorMessage(null);
                  setUpdateMenu({
                    ...updateMenu,
                    port: event.target.value as unknown as number,
                  });
                } else {
                  setErrorMessage("Only numbers are allowed");
                }
              }}
              value={updateMenu.port ?? ""}
            />
          </div>
          <div className="modal-footer">
            <button
              className="delete-button"
              onClick={() => {
                setOptionAction(!optionAction);
                setOpenDeleteModal(!openDeleteModal);
              }}
            >
              <FontAwesome.FaTrash /> Delete
            </button>
            <div id="errorMessage">{errorMessage}</div>
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
    </div>
  );
};

export default UpdateMenuModal;
