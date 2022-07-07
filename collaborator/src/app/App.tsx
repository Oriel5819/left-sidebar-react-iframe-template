import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import "./App.css";

interface Menu {
  title: string;
  id: string;
  icon: string;
  rank: number;
  link: string;
  port: string;
  submenus: any[];
}

function App() {
  const [data, setData] = React.useState<Menu[]>([]);

  React.useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data } = await axios.get<Menu[]>("http://localhost:5000/menu");
    setData(data);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home menuTitle="Home" submenuTitle="Home" />}
        />
        {data
          .filter((menu) => menu.port === "3002")
          .map((menu) => {
            return menu.submenus.map((submenu, index) => {
              return (
                <Route
                  key={index}
                  path={submenu.link}
                  element={
                    <Home menuTitle={menu.title} submenuTitle={submenu.title} />
                  }
                />
              );
            });
          })}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
