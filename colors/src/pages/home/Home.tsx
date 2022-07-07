import Blue from "../blue/Blue";
import Green from "../green/Green";
import Grey from "../grey/Grey";
import Red from "../red/Red";

interface homeProps {
  menuTitle: string;
  submenuTitle: string;
}

const Home = ({ menuTitle, submenuTitle }: homeProps) => {
  let home: string = "Home";

  return (
    <div>
      {submenuTitle.toLocaleLowerCase() === "red" && <Red />}
      {submenuTitle.toLocaleLowerCase() === "green" && <Green />}
      {submenuTitle.toLocaleLowerCase() === "blue" && <Blue />}
      {submenuTitle.toLocaleLowerCase() === "grey" && <Grey />}
    </div>
  );
};

export default Home;
