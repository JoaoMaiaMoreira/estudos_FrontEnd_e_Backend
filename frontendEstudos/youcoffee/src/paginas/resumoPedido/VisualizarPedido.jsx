import styles from "./resumoPedido.module.css";
import InformacoesResumo from "./informacoesResumo";
import Button from "../../componentes/Button";
import {useNavigate} from "react-router-dom";
function VisualizarPedido() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.page}`}>
      <section className={`${styles.section}`}>
        <div className={`${styles.enquadramento}`}>
         <InformacoesResumo tipoResumo={"GET"}/>
        </div>
        <div style={{display: "flex", marginBottom: "70px", justifyContent: "left", marginLeft: "10%", marginRight: "10%"}}>
          <Button
            cor="#F2F4F8"
            corFont="#9E184B"
            text={"voltar"}
            onClick={(e) => {e.preventDefault(); navigate("/historico")}}
          />
        </div>
      </section>
    </div>
  );
}

export default VisualizarPedido;
