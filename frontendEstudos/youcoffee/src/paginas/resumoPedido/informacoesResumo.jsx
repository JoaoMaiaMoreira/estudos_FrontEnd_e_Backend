import Campo from "../../componentes/Campo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CampoArray from "./CampoArray";
import { formataData, formataTempo } from "../../utils";
import { toastError } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";

function InformacoesResumo({ tipoResumo }) {
  const [dadosComida, setDadosComida] = useState({});
  const [dadosGerais, setDadosGerais] = useState({});
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [comidas, setComidas] = useState([]);
  const dadosTotalPedidos = useSelector((state) => state.dadosTotalPedidos);

  const navigate = useNavigate();

  useEffect(() => {
    if (verificaDadosAnteriores()) {
      setDadosComida(dadosTotalPedidos?.dadosPedidosAlimentos);
      setAlimentos(
        dadosTotalPedidos?.dadosPedidosAlimentos?.informacoesAlimento
          ?.alimentoPedido
      );
      setDadosGerais(dadosTotalPedidos?.dadosPedidos);
    } else {
      navigate("/historico");
    }
  }, [dadosTotalPedidos]);

  useEffect(() => {
    setBebidas(alimentos?.filter((bebida) => bebida.idTipoAlimento === 2));

    setComidas(alimentos?.filter((comida) => comida.idTipoAlimento === 1));
  }, [alimentos]);

  function verificaDadosAnteriores() {
    if (
      JSON.stringify(dadosTotalPedidos?.dadosPedidos) === "{}" ||
      !dadosTotalPedidos?.dadosPedidos ||
      JSON.stringify(dadosTotalPedidos?.dadosPedidosAlimentos) === "{}" ||
      !dadosTotalPedidos?.dadosPedidosAlimentos
    ) {
      toastError(
        tipoResumo.toUpperCase() === "POST"
          ? "Verifique sua conexão com a internet e tente realiazr o pedido novamente"
          : tipoResumo.toUpperCase() === "GET"
          ? "Verifique sua conexão com a intenet tente visualizar o pedido novamente"
          : "Verifique sua conexão com a internet, e tente novamente"
      );
      return false;
    } else return true;
  }

  return (
    <div>
      <h1 style={{ color: "#9E184B", fontSize: "28px", fontWeight: 500 }}>
        Resumo do pedido
      </h1>

      <Campo
        titulo={"Tipo do pedido:"}
        item={
          dadosGerais?.tipoPedido === "PERSONALIZADO"
            ? "Personalizado"
            : dadosGerais?.tipoPedido === "PADRAO"
            ? "Padrão"
            : dadosGerais?.tipoPedido
        }
      />

      <Campo
        titulo={"Diretoria:"}
        item={dadosGerais?.diretoria?.nomeDiretoria}
      />

      <Campo titulo={"Centro de custo:"} item={dadosGerais?.centrosCusto} />

      <Campo titulo={"Tipo de evento:"} item={dadosGerais?.tipoEvento} />

      <div
        style={{
          margin: "0px",
          width: "300px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Campo
          titulo={"Data:"}
          item={
            typeof dadosGerais?.dataHorarioEvento?.data == "string"
              ? dadosGerais?.dataHorarioEvento?.data
              : formataData(dadosGerais?.dataHorarioEvento?.data.$d)
          }
        />

        <Campo
          titulo={"Hórario:"}
          item={
            typeof dadosGerais?.dataHorarioEvento?.horario == "string"
              ? dadosGerais?.dataHorarioEvento?.horario
              : formataTempo(dadosGerais?.dataHorarioEvento?.horario.$d)
          }
        />
      </div>

      <Campo
        titulo={"Quantidade de pessoas:"}
        item={dadosGerais?.quantidadePessoas}
      />

      <Campo
        titulo={"Local:"}
        item={
          dadosGerais.localEvento?.idLocalEvento !== 20
            ? dadosGerais.localEvento?.nomeLocalEvento
            : dadosGerais.localEvento?.outroLocal
        }
      />

      <Campo
        titulo={"Observações:"}
        item={
          !dadosGerais.observacaoPedido || dadosGerais.observacaoPedido === ""
            ? "Nenhuma"
            : dadosGerais.observacaoPedido
        }
      />

      <Campo
        titulo={"Qual o tamanho do YouCoffe?"}
        item={dadosComida.tamanhoYouCoffee?.nomeTamanhoYouCoffee}
      />

      <Campo
        titulo={"Há restrições alimentares?"}
        item={
          dadosComida?.informacoesAlimento?.restricaoAlimentar === "" ||
          !dadosComida?.informacoesAlimento?.restricaoAlimentar ||
          dadosComida?.informacoesAlimento?.restricaoAlimentar.toUpperCase() ===
            "NENHUMA"
            ? "Não"
            : "Sim"
        }
      />
      {dadosComida?.informacoesAlimento?.restricaoAlimentar !== "" &&
        dadosComida?.informacoesAlimento?.restricaoAlimentar &&
        dadosComida?.informacoesAlimento?.restricaoAlimentar.toUpperCase() !==
          "NENHUMA" && (
          <Campo
            titulo={"Quais?"}
            item={dadosComida?.informacoesAlimento?.restricaoAlimentar}
          />
        )}

      {dadosGerais.tipoPedido &&
        dadosGerais.tipoPedido.toUpperCase() === "PERSONALIZADO" && (
          <>
            <div>
              {(bebidas && bebidas?.length > 0) ||
              (dadosComida?.informacoesAlimento?.outrasBebidas !== "" &&
                dadosComida?.informacoesAlimento?.outrasBebidas.toUpperCase() !==
                  "NENHUMA" &&
                dadosComida?.informacoesAlimento?.outrasBebidas) ? (
                <CampoArray titulo={"Bebida e quantidade:"} itens={bebidas} />
              ) : (
                <Campo titulo={"Bebida e quantidade:"} item={"Nenhuma"} />
              )}
              {dadosComida?.informacoesAlimento?.outrasBebidas !== "" &&
                dadosComida?.informacoesAlimento?.outrasBebidas.toUpperCase() !==
                  "NENHUMA" &&
                dadosComida?.informacoesAlimento?.outrasBebidas && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 0,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        width: "49%",
                        marginBottom: 0,
                      }}
                    >
                      Outros
                    </h3>
                    <p style={{ width: "49%", marginBottom: 0 }}>
                      {dadosComida?.informacoesAlimento?.outrasBebidas}
                    </p>
                  </div>
                )}
            </div>

            <div>
              <CampoArray
                titulo={"Opções de alimentos e suas quantidades:"}
                itens={comidas}
              />
              {dadosComida?.informacoesAlimento?.outrasComidas !== "" &&
                dadosComida?.informacoesAlimento?.outrasComidas.toUpperCase() !==
                  "NENHUMA" &&
                dadosComida?.informacoesAlimento?.outrasComidas && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 0,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        width: "49%",
                        marginBottom: 0,
                      }}
                    >
                      Outros
                    </h3>
                    <p style={{ width: "49%", marginBottom: 0 }}>
                      {dadosComida?.informacoesAlimento?.outrasComidas}
                    </p>
                  </div>
                )}
            </div>
          </>
        )}

      <Campo
        titulo={"Observações:"}
        item={
          !dadosComida?.informacoesAlimento?.observacaoAlimento ||
          dadosComida?.informacoesAlimento?.observacaoAlimento === ""
            ? "Nenhuma"
            : dadosComida?.informacoesAlimento?.observacaoAlimento
        }
      ></Campo>
    </div>
  );
}

export default InformacoesResumo;
