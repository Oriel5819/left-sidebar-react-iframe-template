import * as React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { setGlobalState, useGlobalState } from "../../state/global.state";

const Header = () => {
  const [userIsAdministrator, setUserIsAdministrator] = React.useState<boolean>(
    useGlobalState("isAdministrator")[0]
  );

  const [openSidebar, setOpenSidebar] = React.useState<boolean>(
    useGlobalState("showSidebar")[0]
  );

  const handleSidebar = () => {
    setGlobalState("showSidebar", !openSidebar);
    setOpenSidebar(!openSidebar);
  };

  console.log(useGlobalState("isAdministrator")[0]);

  return (
    <header className="header">
      <div className="left-header">
        <button className="left-header-button" onClick={handleSidebar}>
          {useGlobalState("showSidebar")[0] === true ? (
            <FontAwesomeIcon id="close-icon" icon={faClose} />
          ) : (
            <FontAwesomeIcon id="close-icon" icon={faBars} />
          )}
        </button>
      </div>
      <button
        onClick={() => {
          setGlobalState("isAdministrator", !userIsAdministrator);
          setUserIsAdministrator(!userIsAdministrator);
        }}
      >
        {userIsAdministrator ? "Administrator" : "IsNotAdministrator"}
      </button>
      <div className="right-header">
        <button>
          <FontAwesomeIcon id="rocketchat-icon" icon={faRocket} />
        </button>
        <button>
          <FontAwesomeIcon id="signout-icon" icon={faSignOutAlt} />
        </button>
      </div>
    </header>
  );
};

export default Header;
