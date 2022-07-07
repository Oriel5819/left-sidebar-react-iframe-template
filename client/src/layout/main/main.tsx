import * as React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useGlobalState } from "../../state/global.state";
import "./main.css";

const Main = () => {
  const [link, setLink] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("");
  const [loading, setloading] = React.useState<boolean>(true);
  const PORT = useGlobalState("port")[0];

  React.useEffect(() => {
    if (localStorage.getItem("link") && localStorage.getItem("port")) {
      setLink(JSON.parse(localStorage.getItem("link") || ""));
      setPort(JSON.parse(localStorage.getItem("port") || ""));
    } else {
      setLink("");
      setPort("3001");
    }
  }, [useGlobalState("link")[0], useGlobalState("port")[0]]);

  const hiddenSpinner = () => {
    setloading(false);
  };

  return (
    <div className="main">
      {loading ? (
        <div className="spinner">
          <PulseLoader color="#1c8195" loading={loading} size={10} />
        </div>
      ) : null}
      <iframe
        src={"http://localhost:" + port + "/" + link}
        frameBorder="0"
        onLoad={hiddenSpinner}
        height="100%"
      />
    </div>
  );
};

export default Main;
