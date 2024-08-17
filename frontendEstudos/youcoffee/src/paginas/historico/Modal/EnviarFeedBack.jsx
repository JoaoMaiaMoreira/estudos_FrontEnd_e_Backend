import { useState } from "react";
import styles from "./modalfeedback.module.css";
import { mandarFeedback } from "../../../services/api";
import InputForm from "../../../componentes/InputForm";
import Button from "../../../componentes/Button";
import { toastError, toastWarn } from "../../../utils/Toast";
import Loading from "../../../componentes/Loading";

function EnviarFeedBack({ idPedido, fecharModal, refreshTabela }) {
  const [idFeedback, setIdFeedback] = useState(null);
  const [descricao, setDescricao] = useState("");
  const emojis = [
    { emoji: "😣", opniao: "Muito ruim", tipoFeedback: 1 },
    { emoji: "🙁", opniao: "Ruim", tipoFeedback: 2 },
    { emoji: "😐", opniao: "Razoável", tipoFeedback: 3 },
    { emoji: "🙂", opniao: "Bom", tipoFeedback: 4 },
    { emoji: "😍", opniao: "Muito bom", tipoFeedback: 5 },
  ];
  const [loading, setLoading] = useState(false);

  async function enviarDados() {
    setLoading(true);
    let erros = [];
    if (!idFeedback) erros.push("Selecione sua experiência com o YouCoffee");
    if (!descricao || descricao === "")
      erros.push("Preencha o campo 'Quais foram suas razôes para a nota'");
    if (erros.length === 0) {
      try {
        const resposta = await mandarFeedback(descricao, idFeedback, idPedido);
        if (resposta) {
          refreshTabela();
          fecharModal();
        }
      } catch (e) {
        toastError(e.response.data.erros[0]);
      }
    } else {
      if (erros.length === 1) {
        toastWarn(erros[0]);
      } else {
        toastWarn(`${erros[0]}, há outro erro, verifique-o posteriormente`);
      }
    }
    setLoading(false);
  }

  function descricaoFeedback(e) {
    setDescricao(e.target.value);
  }

  return (
    <>
      <Loading open={loading} />
      <div className={`${styles.titulo}`}>
        <h1>Feedback</h1>
        <p>Como foi sua experiência com o YouCoffe?</p>
      </div>
      <div className={`${styles.imojis}`}>
        {emojis.map((e, index) => {
          return (
            <div className={`${styles.containerEmoji}`} key={index}>
              <div
                style={
                  idFeedback === e.tipoFeedback
                    ? { border: "2px solid #9E184B" }
                    : { border: "2px solid transparent" }
                }
                className={`${styles.emojiBorda}`}
              >
                <span
                  key={e.tipoFeedback}
                  style={{ cursor: "pointer" }}
                  onClick={() => setIdFeedback(e.tipoFeedback)}
                >
                  {e.emoji}
                </span>
              </div>
              <p
                style={
                  e.tipoFeedback === idFeedback
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

      <div
        style={{
          width: "96%",
          height: "80px",
          borderRadius: "10px",
        }}
      >
        <p>Quais foram suas razões para a nota?</p>
        <InputForm
          borderRadius={"10px"}
          value={descricao}
          onChange={(e) => descricaoFeedback(e)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "70px",
          marginBottom: "7%",
        }}
      >
        <Button
          cor="#F2F4F8"
          corFont="#9E184B"
          text={"Fechar"}
          onClick={() => fecharModal()}
        />

        <Button
          cor="#9E184B"
          corFont="#EBE9E2"
          text={"Enviar"}
          onClick={(e) => enviarDados(e)}
        />
      </div>
    </>
  );
}

export default EnviarFeedBack;
