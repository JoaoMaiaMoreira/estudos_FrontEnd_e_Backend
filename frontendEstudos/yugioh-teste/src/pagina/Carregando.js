import imagem from ".//loading.gif";
import styles from "./Carregando.module.css";

function Carregando() {
  return (
    <div className={`${styles.centro}`}>
      <img src={imagem} alt="loading" />
    </div>
  );
}

export default Carregando;
