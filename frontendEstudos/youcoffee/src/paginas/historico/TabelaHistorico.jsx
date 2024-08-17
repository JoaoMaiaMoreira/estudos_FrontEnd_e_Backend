import { useEffect, useState } from "react";
import {
  buscarPedidos,
} from "../../services/api";
import { toastWarn } from "../../utils/Toast";
import styles from "./tabelaHistorico.module.css";
import ModalFeedback from "./Modal/ModalFeedback";
import { useNavigate } from "react-router-dom";
import { setDadoGeral, setDadosAlimentos } from "../../redux/pedidos/action";
import { useDispatch } from "react-redux";
import Loading from "../../componentes/Loading";

function TabelaHistorico({ dadosTabela, refreshTabela, loading}) {
  const [dadosTabelaPreenchida, setDadosTabelaPreenchida] = useState([]);
  const [loadingBusca, setLoadingBusca] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    preencherTabela();
  }, [dadosTabela]);

  function preencherTabela() {
    //isso aqui é muito massa =>

    const tabela = new Array(10)
      .fill({})
      .map(
        (a, index) => (a[index] = dadosTabela[index] ? dadosTabela[index] : {})
      );
    setDadosTabelaPreenchida([...tabela]);
  }

  async function visualisarPedido(id) {
    setLoadingBusca(true)
    try {
      const resposta = await buscarPedidos(id);
      if(resposta?.status === 200) {
      dispatch(setDadosAlimentos(resposta?.data));
      dispatch(setDadoGeral(resposta?.data));
      navigate(`/visualizar-pedido/${id}`);
      }
    } catch (e) {
      toastWarn(e.response.data.erros[0]);
    }
    setLoadingBusca(false)
  }

  return (
    <table className={`${styles.table}`}>
      <Loading open={loading || loadingBusca}/>
      <thead>
        <tr style={{ backgroundColor: "#9E184B33" }}>
          <th style={{width: "180px", minWidth: "100px"}}>Evento</th>
          <th style={{width: "150px", minWidth: "95px"}}>Data do Pedido</th>
          <th style={{width: "150px", minWidth: "95px"}}>Data do Evento</th>
          <th style={{width: "140px", minWidth: "95px"}}>Tipo do Pedido</th>
          <th style={{width: "160px", minWidth: "95px"}}>Feedback</th>
          <th style={{width: "220px", minWidth: "110px"}}>Detalhes do Pedido</th>
        </tr>
      </thead>
      <tbody>
        {dadosTabelaPreenchida.map((tabela, index) => {
          return (
            <tr key={index}>
              <td>{tabela.tipoEvento}</td>
              <td>{tabela.dataHoraPedido}</td>
              <td>{tabela.dataHoraEvento}</td>
              <td>{tabela?.tipoPedido}</td>
              {tabela.existeFeedback === undefined ? (
                <td></td>
              ) : (
                  <ModalFeedback
                    texto={tabela.existeFeedback ? "Visualizar" : "Dar Feedback"}
                    conteudo={tabela.existeFeedback}
                    idPedido={tabela.idPedido}
                    refreshTabela={refreshTabela}
                  />
              )}

              {tabela.tipoEvento === undefined ? (
                <td></td>
              ) : (
                <td
                  onClick={() => visualisarPedido(tabela.idPedido)}
                  className={styles.clickable}
                >
                  Visualizar
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TabelaHistorico;
