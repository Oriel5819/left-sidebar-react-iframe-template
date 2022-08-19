import { useState } from "react";
import Modal from "react-modal";
import { editSubmenu } from "../../../services/submenu.services";
import { setGlobalState, useGlobalState } from "../../../state/global.state";
import { FaTimes } from "react-icons/fa";
import { customStyles } from "../commonModalStyle";
import { ISubmenu } from "../../../types/types";
Modal.setAppElement("#root");

interface UpdateSubmenuModalProps {
  menuId: string;
  submenuId: string;
  title: string;
  id: string;
  rank: number;
  link: string;
  openEditSubmenuModal: boolean;
  setOpenEditSubmenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSubmenuModal = ({
  menuId,
  submenuId,
  title,
  id,
  rank,
  link,
  openEditSubmenuModal,
  setOpenEditSubmenuModal,
}: UpdateSubmenuModalProps) => {
  const [updateSubmenu, setUpdateSubmenu] = useState<ISubmenu>({
    title,
    id,
    rank,
    link,
  });

  const refresh = useGlobalState("refresh")[0];
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleSubmitEditSubmenu = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    const updatedSubmenu = await editSubmenu(menuId, submenuId, updateSubmenu);

    if (updateSubmenu) {
      setOpenEditSubmenuModal(false);
      setGlobalState("refresh", !refresh);
    }
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
        <div className="title">Submenu</div>
        <button className="icon-button" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmitEditSubmenu}>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            onChange={(event) =>
              setUpdateSubmenu({ ...updateSubmenu, title: event.target.value })
            }
            value={updateSubmenu.title ?? ""}
          />
          <input
            type="text"
            placeholder="Id"
            onChange={(event) =>
              setUpdateSubmenu({ ...updateSubmenu, id: event.target.value })
            }
            value={updateSubmenu.id ?? ""}
          />
          <input
            type="text"
            placeholder="Rank"
            onChange={(event) => {
              const re = /^[0-9\b]+$/;
              if (event.target.value === "" || re.test(event.target.value)) {
                setErrorMessage(null);
                setUpdateSubmenu({
                  ...updateSubmenu,
                  rank: event.target.value as unknown as number,
                });
              } else {
                setErrorMessage("Only numbers are allowed");
              }
            }}
            value={updateSubmenu.rank ?? ""}
          />
          <input
            type="text"
            placeholder="Link"
            onChange={(event) =>
              setUpdateSubmenu({ ...updateSubmenu, link: event.target.value })
            }
            value={updateSubmenu.link ?? ""}
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
