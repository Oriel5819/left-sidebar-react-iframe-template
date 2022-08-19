import { useState } from "react";
import Modal from "react-modal";
import "../modal.css";
import * as FontAwesome from "react-icons/fa";
import { createMenu } from "../../../services/menu.service";
import { customStyles } from "../commonModalStyle";
import { IMenu } from "../../../types/types";
import { useGlobalState, setGlobalState } from "../../../state/global.state";

Modal.setAppElement("#root");

interface createMenuModalProps {
  open: boolean;
  setOpenAddMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMenuModal = ({
  open,
  setOpenAddMenuModal,
}: createMenuModalProps) => {
  const [newMenu, setNewMenu] = useState<IMenu>({
    title: null,
    id: null,
    icon: null,
    rank: null,
    link: null,
    port: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const refresh = useGlobalState("refresh")[0];

  const closeModal = () => {
    setOpenAddMenuModal(false);
    setGlobalState("refresh", !refresh);
  };

  const handleSubmitCreateMenu = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const createdMenu = await createMenu(newMenu);
    if (createdMenu) {
      setOpenAddMenuModal(false);
      setGlobalState("refresh", !refresh);
    }
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
        <div className="title">Menu</div>
        <button className="icon-button" onClick={closeModal}>
          <FontAwesome.FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmitCreateMenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(event) =>
              setNewMenu({ ...newMenu, title: event.target.value })
            }
            value={newMenu.title ?? ""}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(event) =>
              setNewMenu({ ...newMenu, id: event.target.value })
            }
            value={newMenu.id ?? ""}
          />
          <input
            type="text"
            placeholder="Icon"
            onChange={(event) =>
              setNewMenu({ ...newMenu, icon: event.target.value })
            }
            value={newMenu.icon ?? ""}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(event) => {
              const re = /^[0-9\b]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                setErrorMessage(null);
                setNewMenu({
                  ...newMenu,
                  rank: event.target.value as unknown as number,
                });
              } else {
                setErrorMessage("Only numbers are allowed");
              }
            }}
            value={newMenu.rank ?? ""}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(event) =>
              setNewMenu({ ...newMenu, link: event.target.value })
            }
            value={newMenu.link ?? ""}
          />
          <input
            type="text"
            placeholder="Port"
            onChange={(event) => {
              const re = /^[0-9\b]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                setErrorMessage(null);
                setNewMenu({
                  ...newMenu,
                  port: event.target.value as unknown as number,
                });
              } else {
                setErrorMessage("Only numbers are allowed");
              }
            }}
            value={newMenu.port ?? ""}
          />
        </div>
        <div className="modal-footer">
          <div id="errorMessage">{errorMessage}</div>
          <button className="add-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMenuModal;
