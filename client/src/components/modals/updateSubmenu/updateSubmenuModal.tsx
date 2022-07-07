import React from "react";
import Modal from "react-modal";
import { editSubmenu } from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { FaTimes } from "react-icons/fa";

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

interface UpdateSubmenuModalProps {
  menuId: string;
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  openEditSubmenuModal: boolean;
  setOpenEditSubmenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSubmenuModal = ({
  menuId,
  title,
  id,
  icon,
  rank,
  link,
  openEditSubmenuModal,
  setOpenEditSubmenuModal,
}: UpdateSubmenuModalProps) => {
  const [submenuTitle, setSubmenuTitle] = React.useState<string>(title);
  const [submenuId, setSubmenuId] = React.useState<string>(id);
  const [submenuIcon, setSubmenuIcon] = React.useState<string>(icon);
  const [submenuRank, setSubmenuRank] = React.useState<number>(rank);
  const [submenuLink, setSubmenuLink] = React.useState<string>(link);
  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleSubmitEditSubmenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    editSubmenu(
      menuId,
      id,
      submenuTitle,
      submenuId,
      submenuIcon,
      submenuRank,
      submenuLink
    )
      .then((result) => {
        setOpenEditSubmenuModal(false);
        setGlobalState("refresh", !refresh);
      })
      .catch((error) =>
        setErrorMessage(
          error.response.data.errorMessage || error.response.data.error
        )
      );
  };

  const closeModal = () => {
    setOpenEditSubmenuModal(false);
  };

  return (
    <Modal
      isOpen={openEditSubmenuModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setOpenEditSubmenuModal(true)}
      style={customStyles}
    >
      <div className="modal-header">
        <button className="icon-button" onClick={closeModal}>
          <FaTimes />
        </button>
        Edit submenu
      </div>

      <form onSubmit={handleSubmitEditSubmenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setSubmenuTitle(e.target.value)}
            value={submenuTitle}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => setSubmenuId(e.target.value)}
            value={submenuId}
          />
          <input
            type="text"
            placeholder="Icon"
            onChange={(e) => setSubmenuIcon(e.target.value)}
            value={submenuIcon}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(e) =>
              setSubmenuRank(e.target.value as unknown as number)
            }
            value={submenuRank}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setSubmenuLink(e.target.value)}
            value={submenuLink}
          />
        </div>
        <div className="modal-footer">
          <div id="errorMessage">{errorMessage}</div>
          <button className="update-button" type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateSubmenuModal;
