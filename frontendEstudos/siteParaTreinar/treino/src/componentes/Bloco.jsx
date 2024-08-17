import styles from "./bloco.module.css";
import spaceXImg1 from "../img/spaceXImg1.jpg";

function Bloco({ fundo, titulo, subTitulo, caminho, textoA }) {
  return (
    <div
      style={{ backgroundImage: `url(${fundo})` }}
      className={`${styles.body}`}
    >
      <div className={`${styles.saberMais}`}>
        <h2>{subTitulo}</h2>
        <h1>{titulo}</h1>
        <div
          style={{
            width: "164px",
            height: "54px",
            border: "2px solid white",
            padding: "0px, 30px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <a href={caminho}>Lear more</a>
        </div>
      </div>
    </div>
  );
}

export default Bloco;
