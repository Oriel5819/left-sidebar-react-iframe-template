import React from "react";
import Modal from "react-modal";
import { FaTimes, FaTrash } from "react-icons/fa";
import { removeSubmenu } from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";

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

interface deleteSubmenuProps {
  title: string;
  menuId: string;
  id: string;
  openDeleteSubmenuModal: boolean;
  setOpenDeleteSubmenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSubmenuModal = ({
  title,
  menuId,
  id,
  openDeleteSubmenuModal,
  setOpenDeleteSubmenuModal,
}: deleteSubmenuProps) => {
  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleSubmitDeleteSubmenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    removeSubmenu(menuId, id)
      .then((result) => {
        setOpenDeleteSubmenuModal(false);
        setGlobalState("refresh", !refresh);
      })
      .catch((error) =>
        setErrorMessage(
          error.response.data.errorMessage || error.response.data.error
        )
      );
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
        <button className="icon-button" onClick={closeModal}>
          <FaTimes />
        </button>
        Remove submenu
      </div>
      <form onSubmit={handleSubmitDeleteSubmenu}>
        <div className="modal-body">
          <label htmlFor="">Are you sure to remove {title} submenu ?</label>
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
