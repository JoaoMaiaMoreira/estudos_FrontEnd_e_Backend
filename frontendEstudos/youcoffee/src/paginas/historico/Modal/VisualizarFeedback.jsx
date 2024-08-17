import { pegarFeedback } from "../../../services/api";
import { useState, useEffect } from "react";
import styles from "./modalfeedback.module.css";
import Button from "../../../componentes/Button";
import Loading from "../../../componentes/Loading";

function VisualisarFeedback({ idPedido, fecharModal }) {
  const [dados, setDados] = useState({});
  const emojis = [
    { emoji: "😣", opniao: "Muito ruim", tipoFeedback: 1 },
    { emoji: "🙁", opniao: "Ruim", tipoFeedback: 2 },
    { emoji: "😐", opniao: "Razoável", tipoFeedback: 3 },
    { emoji: "🙂", opniao: "Bom", tipoFeedback: 4 },
    { emoji: "😍", opniao: "Muito bom", tipoFeedback: 5 },
  ];
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dadosBackEnd();
  }, []);

  function paraFechar() {
    fecharModal();
  }

  async function dadosBackEnd() {
      const resposta = await pegarFeedback(idPedido);
      if(resposta?.status === 200) {
        setDados(resposta?.data)
      } else setDados(null)
    setLoading(false)
  }

  return (
    <div>
      <Loading open={loading} />
      <div className={`${styles.titulo}`}>
        <h1>Feedback</h1>
        <p>Sua experiência foi:</p>
      </div>
      <div className={`${styles.imojis}`}>
        {emojis.map((e, index) => {
          return (
            <div className={`${styles.containerEmoji}`} key={index}>
              <div
                className={`${styles.emojiBordaVisu}`}
                style={
                  e.tipoFeedback === dados?.idTipoFeedback
                    ? {
                        borderRadius: "50%",
                        border: "2px solid #9E184B",
                      }
                    : { borderRadius: "50%", border: "2px solid trasparent" }
                }
              >
                <span key={e.tipoFeedback} value={e.tipoFeedback}>
                  {e.emoji}
                </span>
              </div>
              <p
                style={
                  e.tipoFeedback === dados?.idTipoFeedback
                    ? {
                        color: "#9E184B",
                      }
                    : { color: "Black" }
                }
              >
                {e.opniao}
              </p>
            </div>
          );
        })}
      </div>
      {dados ? 
        <p className={`${styles.razoesParaNota}`}>{dados?.descricaoFeedback}</p> :
        <p className={`${styles.razoesParaNota}`} style={{display: "flex", justifyContent: "center", alignItems: "center"}}><span style={{color: "#9E184B", fontWeight: "bold"}}>Erro de conexão</span></p>
       }
      <Button
        cor="#F2F4F8"
        corFont="#9E184B"
        text={"Fechar"}
        onClick={() => paraFechar()}
      />
    </div>
  );
}

export default VisualisarFeedback;
