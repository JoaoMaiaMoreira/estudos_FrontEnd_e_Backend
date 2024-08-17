import { useEffect, useState } from "react";
import styles from "../historico/historico.module.css";
import TabelaHistorico from "./TabelaHistorico";
import { buscarTabela } from "../../services/api";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import Paginacao from "./paginacao";
import { useDispatch } from "react-redux";
import { setDadoGeral, setDadosAlimentos } from "../../redux/pedidos/action";
import { RxReload } from "react-icons/rx";
import { toastError, toastWarn } from "../../utils/Toast";

function Historico() {
  const navigate = useNavigate();
  const [dadosTabela, setDadosTabela] = useState([]);
  const [paginacaoSelecionada, setPaginacaoSelecionada] = useState(1);
  const [totalPaginas, setTotalPagina] = useState(0);
  const [loadingTabela, setLoadingTabela] = useState(false);
  const dispatch = useDispatch();

  async function dadosBack() {
    setLoadingTabela(true);
    const resposta = await buscarTabela(paginacaoSelecionada);
    if (resposta) {
      setDadosTabela(resposta?.data?.pedidos);
      setTotalPagina(resposta?.data?.totalPaginas);
    }
  }

  useEffect(() => {
    refreshTabela();
  }, [paginacaoSelecionada]);

  useEffect(() => {
    dispatch(setDadoGeral({}));
    dispatch(setDadosAlimentos({}));
  }, []);

  function handlePaginaChange(numeroPaginacao) {
    setPaginacaoSelecionada(numeroPaginacao);
  }

  const refreshTabela = async () => {
    await dadosBack();
    setLoadingTabela(false);
  };

  const navigateDadosGerais = (tipoPedido) => {
    if (tipoPedido === "PERSONALIZADO" || tipoPedido === "PADRAO") {
      dispatch(setDadoGeral({ tipoPedido }));
      navigate("/formulario-dados-gerais");
    } else {
      toastError("Pedido Invalído");
    }
  };

  return (
    <div>
      <div className={`${styles.page}`}>
        <div
          style={{
            width: "54%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "40px",
            minWidth: "625px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "55%",
            }}
          >
            <Button
              cor="#9E184B"
              corFont="#EBE9E2"
              width={"250px"}
              text={"Novo Pedido Padrão"}
              onClick={(e) => {
                e.preventDefault();
                navigateDadosGerais("PADRAO");
              }}
            />
            <Button
              cor="#9E184B"
              width={"260px"}
              corFont="#EBE9E2"
              text={"Novo Pedido Personalizado"}
              onClick={(e) => {
                e.preventDefault();
                navigateDadosGerais("PERSONALIZADO");
              }}
            />
          </div>
        </div>
        <section className={`${styles.section}`}>
          <div style={{ display: "flex", marginLeft: "4%", marginRight: "4%" }}>
            <h1 style={{ textAlign: "left", color: "#9E184B", width: "100%" }}>
              Histórico de Pedidos
            </h1>
            <h1
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "black",
              }}
            >
              <button
                className={styles.refresh}
                onClick={(e) => {
                  e.preventDefault();
                  refreshTabela();
                }}
              >
                <RxReload />
              </button>
            </h1>
          </div>

          <TabelaHistorico
            dadosTabela={dadosTabela}
            refreshTabela={refreshTabela}
            loading={loadingTabela}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Paginacao
              totalPagina={totalPaginas}
              onPaginaChange={handlePaginaChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Historico;
