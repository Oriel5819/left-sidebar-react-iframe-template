import React from "react";
import Airtel from "../airtel/Airtel";
import Orange from "../orange/Orange";

interface homeProps {
  menuTitle: string;
  submenuTitle: string;
}

const Home = ({ menuTitle, submenuTitle }: homeProps) => {
  return (
    <div>
      {submenuTitle.toLocaleLowerCase() === "airtel" && <Airtel />}
      {submenuTitle.toLocaleLowerCase() === "orange" && <Orange />}
    </div>
  );
};

export default Home;
