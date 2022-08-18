import React from "react";
import * as FontAwesome from "react-icons/fa";
import { useGlobalState } from "../../../state/global.state";

interface AddMenuProps {
  openAddMenuModal: boolean;
  handleOpenAddMenuModal: () => void;
}

const AddMenuButton = ({
  openAddMenuModal,
  handleOpenAddMenuModal,
}: AddMenuProps) => {
  return (
    <div className="option">
      {useGlobalState("isAdministrator")[0] && (
        <button
          className="icon-button"
          id="add-button"
          style={
            openAddMenuModal
              ? { backgroundColor: "#1c8195" }
              : { backgroundColor: "#12171b" }
          }
          onClick={() => handleOpenAddMenuModal()}
        >
          {openAddMenuModal === true ? (
            <FontAwesome.FaTimes />
          ) : (
            <FontAwesome.FaPlus />
          )}
        </button>
      )}
    </div>
  );
};

export default AddMenuButton;
