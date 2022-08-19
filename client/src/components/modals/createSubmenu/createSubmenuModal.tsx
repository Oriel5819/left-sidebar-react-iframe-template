import { useState } from "react";
import Modal from "react-modal";
import createSubmenu from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import * as FontAwesome from "react-icons/fa";
import { customStyles } from "../commonModalStyle";
import { ISubmenu } from "../../../types/types";

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
  const [newSubmenu, setNewSubmenu] = useState<ISubmenu>({
    title: null,
    id: null,
    rank: null,
    link: null,
  });
  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleSubmitCreateSubmenu = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const createdSubmenu = await createSubmenu(menuId, newSubmenu);
    if (createdSubmenu) {
      setGlobalState("refresh", !refresh);
      setOpenAddSubmenuModal(!openAddSubmenuModal);
    }
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
        <div className="title">Submenu</div>
        <button className="icon-button" onClick={closeModal}>
          <FontAwesome.FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmitCreateSubmenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(event) =>
              setNewSubmenu({ ...newSubmenu, title: event.target.value })
            }
            value={newSubmenu.title ?? ""}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(event) =>
              setNewSubmenu({ ...newSubmenu, id: event.target.value })
            }
            value={newSubmenu.id ?? ""}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(event) => {
              const re = /^[0-9\b]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                setErrorMessage(null);
                setNewSubmenu({
                  ...newSubmenu,
                  rank: event.target.value as unknown as number,
                });
              } else {
                setErrorMessage("Only numbers are allowed");
              }
            }}
            value={newSubmenu.rank ?? ""}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(event) =>
              setNewSubmenu({ ...newSubmenu, link: event.target.value })
            }
            value={newSubmenu.link ?? ""}
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

export default CreateSubmenuModal;
