import React from "react";
import Modal from "react-modal";
import { FaTimes, FaTrash } from "react-icons/fa";
import { removeSubmenu } from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { customStyles } from "../commonModalStyle";

Modal.setAppElement("#root");

interface deleteSubmenuProps {
  title: string;
  menuId: string;
  submenuId: string;
  openDeleteSubmenuModal: boolean;
  setOpenDeleteSubmenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSubmenuModal = ({
  title,
  menuId,
  submenuId,
  openDeleteSubmenuModal,
  setOpenDeleteSubmenuModal,
}: deleteSubmenuProps) => {
  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleSubmitDeleteSubmenu = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const removedSubmenu = await removeSubmenu(menuId, submenuId);
    if (removedSubmenu) {
      setOpenDeleteSubmenuModal(false);
      setGlobalState("refresh", !refresh);
    }
  };

  const closeModal = () => {
    setOpenDeleteSubmenuModal(false);
  };

  return (
    <Modal
      isOpen={openDeleteSubmenuModal}
      onRequestClose={() => setOpenDeleteSubmenuModal(true)}
      style={customStyles}
    >
      <div className="modal-header">
        <div className="title"> Submenu</div>
        <button className="icon-button" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmitDeleteSubmenu}>
        <div className="modal-body">
          <label htmlFor="">Are you sure to delete {title} submenu ?</label>
        </div>
        <div className="modal-footer">
          <div id="errorMessage">{errorMessage}</div>
          <button className="delete-button" type="submit">
            <FaTrash /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteSubmenuModal;
