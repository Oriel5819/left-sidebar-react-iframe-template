import React from "react";
import Footer from "../layout/footer/footer";
import Header from "../layout/header/header";
import Main from "../layout/main/main";
import Sidebar from "../layout/sidebar/sidebar";
import { useGlobalState } from "../state/global.state";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
