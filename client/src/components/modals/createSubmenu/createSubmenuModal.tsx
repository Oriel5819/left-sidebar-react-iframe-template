import React from "react";
import Modal from "react-modal";
import createSubmenu from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import * as FontAwesome from "react-icons/fa";

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

interface createSubmenuProps {
  menuId: string;
  openAddSubmenuModal: boolean;
  setOpenAddSubmenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSubmenuModal = ({
  menuId,
  openAddSubmenuModal,
  setOpenAddSubmenuModal,
}: createSubmenuProps) => {
  const [newSubmenuTitle, setNewSubmenuTitle] = React.useState<string>("");
  const [newSubmenuId, setNewSubmenuId] = React.useState<string>("");
  const [newSubmenuIcon, setNewSubmenuIcon] = React.useState<string>("");
  const [newSubmenuRank, setNewSubmenuRank] = React.useState<number>(0);
  const [newSubmenuLink, setNewSubmenuLink] = React.useState<string>("");
  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleSubmitCreateSubmenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createSubmenu(
      newSubmenuTitle,
      newSubmenuId,
      newSubmenuIcon,
      newSubmenuRank,
      newSubmenuLink,
      menuId
    ).then((result) => {
      setOpenAddSubmenuModal(!openAddSubmenuModal);
      setNewSubmenuTitle("");
      setNewSubmenuId("");
      setNewSubmenuIcon("");
      setNewSubmenuRank(0);
      setNewSubmenuLink("");
      setGlobalState("refresh", !refresh);
    });
  };

  const closeModal = () => {
    setOpenAddSubmenuModal(false);
  };
  return (
    <Modal
      isOpen={openAddSubmenuModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setOpenAddSubmenuModal(true)}
      style={customStyles}
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <div className="modal-header">
        <button className="icon-button" onClick={closeModal}>
          <FontAwesome.FaTimes />
        </button>
        Create a submenu
      </div>

      <form onSubmit={handleSubmitCreateSubmenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setNewSubmenuTitle(e.target.value)}
            value={newSubmenuTitle}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => setNewSubmenuId(e.target.value)}
            value={newSubmenuId}
          />
          <input
            type="text"
            placeholder="Icon"
            onChange={(e) => setNewSubmenuIcon(e.target.value)}
            value={newSubmenuIcon}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(e) =>
              setNewSubmenuRank(e.target.value as unknown as number)
            }
            value={newSubmenuRank}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setNewSubmenuLink(e.target.value)}
            value={newSubmenuLink}
          />
        </div>
        <div className="modal-footer">
          <div id="errorMessage">{errorMessage}</div>
          <button className="add-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateSubmenuModal;
