import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "../pages/about/about";
import Home from "../pages/home/Home";
import Error from "../pages/error/error";
import "./App.css";
import axios from "axios";

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
      {/* <nav>
        {data.map((menu) => {
          return menu.submenus.map((submenu, index) => {
            return (
              <Link key={index} to={submenu.link}>
                {submenu.title}
              </Link>
            );
          });
        })}
      </nav> */}
      <Routes>
        <Route
          path="/"
          element={<Home menuTitle="Home" submenuTitle="Home" />}
        />
        {data
          .filter((menu) => menu.port === "3001")
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
