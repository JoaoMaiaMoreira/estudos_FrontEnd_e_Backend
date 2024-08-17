import styles from "./resumoPedido.module.css";
import InformacoesResumo from "./informacoesResumo";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { enviarPedido } from "../../services/api";
import { useEffect, useState } from "react";
import { toastWarn } from "../../utils/Toast";
import Loading from "../../componentes/Loading";
import { formataData, formataTempo } from "../../utils";

function ResumoPedido() {
  const [bebida, setBebida] = useState([]);
  const [comida, setComida] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dadosTotalPedidos = useSelector((state) => state.dadosTotalPedidos);

  useEffect(() => {
    const alimento =
      dadosTotalPedidos?.dadosPedidosAlimentos?.informacoesAlimento
        ?.alimentoPedido;
    setBebida(alimento?.filter((bebida) => bebida?.idTipoAlimento === 2));
    setComida(alimento?.filter((comida) => comida?.idTipoAlimento === 1));
  }, []);

  async function enviarBackEnd(e) {
    e.preventDefault();
    setLoading(true);
    const bebidas =
      bebida?.map((b) => ({
        alimento: b?.idBebida,
        quantidade: b?.quantidade,
      })) || [];
    const comidas =
      comida?.map((c) => ({
        alimento: c?.idComida,
        quantidade: c?.quantidade,
      })) || [];
    const alimentos = [...bebidas, ...comidas];
    const dadosGerais = dadosTotalPedidos?.dadosPedidos;
    const dadosAlimentos = dadosTotalPedidos?.dadosPedidosAlimentos;

    const pedido = {
      tipoPedido: dadosGerais?.tipoPedido,
      tipoEvento: dadosGerais?.tipoEvento,
      quantidadePessoas: dadosGerais?.quantidadePessoas,
      diretoria: dadosGerais?.diretoria?.idDiretoria,
      centroCusto: dadosGerais?.centrosCusto,
      localEvento: dadosGerais?.localEvento?.idLocalEvento,
      tamanhoYouCoffee: dadosAlimentos?.tamanhoYouCoffee?.idTamanhoYouCoffee,
      alimentos: alimentos,
      dataEvento: formataData(dadosGerais?.dataHorarioEvento?.data?.$d),
      horarioEvento: formataTempo(dadosGerais?.dataHorarioEvento?.horario?.$d),
      //esses abaixo nao sao obrigatorios portanto se nao forao prenchidos passo null
      outroLocal:
        dadosGerais?.localEvento?.outroLocal?.trim()?.length > 0
          ? dadosGerais?.localEvento.outroLocal
          : null,
      restricaoAlimentar:
        dadosAlimentos?.informacoesAlimento?.restricaoAlimentar?.trim()
          ?.length > 0
          ? dadosAlimentos?.informacoesAlimento?.restricaoAlimentar
          : null,
      observacaoPedido:
        dadosGerais?.observacaoPedido?.trim()?.length > 0
          ? dadosGerais?.observacaoPedido
          : null,
      observacaoAlimento:
        dadosAlimentos?.informacoesAlimento?.observacaoAlimento?.trim()
          ?.length > 0
          ? dadosAlimentos?.informacoesAlimento?.observacaoAlimento
          : null,
      outrasComidas:
        dadosAlimentos?.informacoesAlimento?.outrasComidas?.trim()?.length > 0
          ? dadosAlimentos?.informacoesAlimento?.outrasComidas
          : null,
      outrasBebidas:
        dadosAlimentos?.informacoesAlimento?.outrasBebidas?.trim()?.length > 0
          ? dadosAlimentos?.informacoesAlimento?.outrasBebidas
          : null,
    };
    try {
      const respostaBack = await enviarPedido(pedido);
      if (respostaBack) {
        navigate("/historico");
      }
    } catch (e) {
      toastWarn(e.response.data.erros[0]);
    }
    setLoading(false);
  }

  return (
    <div className={`${styles.page}`}>
      <Loading open={loading} />
      <section className={`${styles.section}`}>
        <div className={`${styles.enquadramento}`}>
          <InformacoesResumo tipoResumo={"POST"} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "10%",
            marginLeft: "10%",
            marginBottom: "70px",
          }}
        >
          <Button
            cor="#F2F4F8"
            corFont="#9E184B"
            text={"voltar"}
            onClick={() =>
              navigate(
                dadosTotalPedidos?.dadosPedidos?.tipoPedido === "PERSONALIZADO"
                  ? "/formulario-alimentos"
                  : "/pedido-padrao"
              )
            }
          />
          <Button
            cor="#9E184B"
            corFont="#EBE9E2"
            text={"Solicitar meu YouCoffee"}
            width={"245px"}
            onClick={(e) => enviarBackEnd(e)}
          />
        </div>
      </section>
    </div>
  );
}

export default ResumoPedido;
