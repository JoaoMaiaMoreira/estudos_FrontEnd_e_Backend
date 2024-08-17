import ReactPlayer from "react-player";
import styles from "./SpaceX.module.css";
import Bloco from "../componentes/Bloco";
import spaceXImg1 from "../img/spaceXImg1.jpg";
import spaceXImg2 from "../img/spaceXImg2.jpg";
import spaceXImg3 from "../img/spaceXImg3.jpg";

function SpaceX() {
  return (
    <div className={`${styles.body}`}>
      <div style={{ width: "100%", height: "500px", marginTop: "0" }}>
        <Bloco
          titulo={"STARSHIP'S THIRD FLIGHT TEST"}
          subTitulo={"UPCOMING LAUNCH"}
          fundo={spaceXImg1}
        />

        <Bloco
          titulo={"STARLINK MISSION"}
          subTitulo={"UPCOMING LAUNCH"}
          fundo={spaceXImg2}
        />

        <h1>{texto}</h1>
        <Bloco
          titulo={"STARLINK MISSION"}
          subTitulo={"UPCOMING LAUNCH"}
          fundo={spaceXImg3}
        />
      </div>
    </div>
  );
}

export default SpaceX;
