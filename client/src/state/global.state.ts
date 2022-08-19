import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  showSidebar: false, // to show or hide the sidebar left menu
  isAdministrator: false,
  openMenuId: "",
  open: false,
  port: 0,
  link: "",
  requestErrorMessage: "",
  refresh: false,
});

export { setGlobalState, useGlobalState };
