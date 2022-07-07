import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  showSidebar: false, // to show or hide the sidebar left menu
  openMenuId: "",
  open: false,
  port: "",
  link: "",
  requestErrorMessage: "",
  refresh: false,
});

export { setGlobalState, useGlobalState };
