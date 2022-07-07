import React from "react";
import Modal from "react-modal";
import "../modal.css";
import * as FontAwesome from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { createMenu } from "../../../services/menu.service";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    // backgroundColor: "red",
  },
};
Modal.setAppElement("#root");

interface createMenuModalProps {
  open: boolean;
  setOpenAddMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMenuModal = ({
  open,
  setOpenAddMenuModal,
}: createMenuModalProps) => {
  const [newMenuTitle, setNewMenuTitle] = React.useState<string>("");
  const [newMenuId, setNewMenuId] = React.useState<string>("");
  const [newMenuIcon, setNewMenuIcon] = React.useState<string>("");
  const [newMenuRank, setNewMenuRank] = React.useState<number>(0);
  const [newMenuLink, setNewMenuLink] = React.useState<string>("");
  const [newMenuPort, setNewMenuPort] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const refresh = useGlobalState("refresh")[0];

  const closeModal = () => {
    setOpenAddMenuModal(false);
  };

  const handleSubmitCreateMenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createMenu(newMenuTitle, newMenuId, newMenuIcon, newMenuRank, newMenuLink)
      .then((result: any) => {
        setGlobalState("refresh", !refresh);
        setNewMenuTitle("");
        setNewMenuId("");
        setNewMenuIcon("");
        setNewMenuRank(0);
        setNewMenuLink("");
        setNewMenuPort("");
        setOpenAddMenuModal(false);
      })
      .catch((error: any) =>
        setErrorMessage(
          error.response.data.errorMessage || error.response.data.error
        )
      );
  };

  return (
    <Modal
      isOpen={open}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => open}
      style={customStyles}
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <div className="modal-header">
        <button className="icon-button" onClick={closeModal}>
          <FontAwesome.FaTimes />
        </button>
        Create a menu
      </div>

      <form onSubmit={handleSubmitCreateMenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setNewMenuTitle(e.target.value)}
            value={newMenuTitle}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(e) => setNewMenuId(e.target.value)}
            value={newMenuId}
          />
          <input
            type="text"
            placeholder="Icon"
            onChange={(e) => setNewMenuIcon(e.target.value)}
            value={newMenuIcon}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(e) =>
              setNewMenuRank(e.target.value as unknown as number)
            }
            value={newMenuRank}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(e) => setNewMenuLink(e.target.value)}
            value={newMenuLink}
          />
          <input
            type="text"
            placeholder="Port"
            onChange={(e) => setNewMenuPort(e.target.value)}
            value={newMenuPort}
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

export default CreateMenuModal;
