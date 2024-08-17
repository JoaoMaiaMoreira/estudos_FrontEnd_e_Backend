import { useEffect } from "react";
import styles from "./FormularioAlimentos.module.css";
import { alimentosDado, tamanhoCoffee } from "../../services/api";
import { useState } from "react";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import CheckboxRadio from "../../componentes/CheckboxRadio";
import InputForm from "../../componentes/InputForm";
import Radio from "../../componentes/Radio";
import { useDispatch, useSelector } from "react-redux";
import { setDadosAlimentos } from "../../redux/pedidos/action";
import { toastError, toastPerdaDadosRedux, toastWarn } from "../../utils/Toast";
import Loading from "../../componentes/Loading";
import { LuAlertCircle } from "react-icons/lu";
import ConexaoPerdida from "./ConexaoPerdida";
import TipoYouCoffee from "../../componentes/TipoYouCoffee";
import RestricaoAlimentar from "../../componentes/RestricaoAlimentar";
import Observacoes from "../../componentes/Observacoes";

function FormularioAlimentos() {
  const [tamanhoCoffees, setTamanhoCoffees] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [coffeeSelecionado, setCoffeeSelecionado] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [quais, setQuais] = useState(false);
  const [isCheckedBebida, setIsCheckedBebida] = useState([]);
  const [renderRedux, setRenderRedux] = useState(-1);
  const [bebidasSelecionadas, setBebidasSelecionadas] = useState([]);

  const [outraEscolhaBebida, setOutraEscolhaBebida] = useState("");
  const [outroBebida, setOutroBebida] = useState(false);
  const [outroComida, setOutroComida] = useState(false);
  const [outraEscolhaComida, setOutraEscolhaComida] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [contador, setContador] = useState(0);
  const [comidas, setComidas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [comidasSelecionadas, setComidasSelecionadas] = useState([]);
  const [restricoesAlimentar, setRestricoesAlimentar] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroView, setErroView] = useState(false);

  const dadosTotalPedidos = useSelector((state) => state.dadosTotalPedidos);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function dadosBack() {
    setLoading(true);
    setRenderRedux(3);
    const existeDadosAnteriores = verificarDadosAnteriores();
    if (existeDadosAnteriores) {
      try {
        const responses = await Promise.all([
          tamanhoCoffee("PERSONALIZADO"),
          alimentosDado(),
        ]);
        setTamanhoCoffees(
          responses[1]?.status === 200 ? responses[0]?.data : null
        );
        const dadoAlimentos =
          responses[1]?.status === 200 ? responses[1]?.data : null;
        if (dadoAlimentos) {
          setIsChecked(
            new Array(
              dadoAlimentos.filter(
                (comida) => comida.idTipoAlimento === 1
              ).length
            ).fill(false)
          );

          setIsCheckedBebida(
            new Array(
              dadoAlimentos.filter(
                (bebida) => bebida.idTipoAlimento === 2
              ).length
            ).fill(false)
          );

          setBebidas(
            dadoAlimentos.filter((bebida) => bebida.idTipoAlimento === 2)
          );

          setComidas(
            dadoAlimentos.filter((comida) => comida.idTipoAlimento === 1)
          );

          setAlimentos(dadoAlimentos);
        } else {
          setIsChecked(null);
          setIsCheckedBebida(null);
          setBebidas(null);
          setComidas(null);
          setAlimentos(null);
          setLoading(false);
        }
      } catch (e) {
        setIsChecked(null);
        setIsCheckedBebida(null);
        setBebidas(null);
        setComidas(null);
        setAlimentos(null);
        setLoading(false);
      }
    } else {
      toastPerdaDadosRedux();
      navigate("/formulario-dados-gerais");
      setLoading(false);
    }
  }

  useEffect(() => {
    dadosBack();
  }, []);

  useEffect(() => {
    if (renderRedux === 0) setComidasSelecionadas([]);
    setBebidasSelecionadas([]);
    setOutroBebida(false);
    setOutroComida(false);
    setContador(0);
    setIsChecked(
      new Array(
        alimentos?.filter((comida) => comida?.idTipoAlimento === 1).length
      ).fill(false)
    );
    setIsCheckedBebida(
      new Array(
        alimentos?.filter((bebida) => bebida?.idTipoAlimento === 2).length
      ).fill(false)
    );
  }, [coffeeSelecionado]);

  useEffect(() => {
    if (
      JSON.stringify(alimentos) !== "[]" &&
      alimentos &&
      JSON.stringify(tamanhoCoffees) !== "[]" &&
      tamanhoCoffees &&
      renderRedux === 3
    ) {
      getDadosAlimentosRedux();
    }
    if (renderRedux === 2) {
      getDadosAlimentosReduxSegundoSet();
    }
  }, [alimentos, tamanhoCoffees, renderRedux, alimentos, tamanhoCoffees]);

  async function getDadosAlimentosRedux() {
    if (
      JSON.stringify(dadosTotalPedidos?.dadosPedidosAlimentos) !== "{}" &&
      tamanhoCoffees &&
      alimentos
    ) {
      const dados = dadosTotalPedidos?.dadosPedidosAlimentos;

      const tamanhoCoffee = dados?.tamanhoYouCoffee;

      const infoAlimento = dados?.informacoesAlimento;

      if (tamanhoCoffees && tamanhoCoffees?.length > 0 && tamanhoCoffee) {
        setCoffeeSelecionado({
          idTamanhoYouCoffee: parseInt(tamanhoCoffee?.idTamanhoYouCoffee),
          nomeTamanhoYouCoffee: tamanhoCoffee?.nomeTamanhoYouCoffee,
        });
      }

      if (
        infoAlimento?.restricaoAlimentar ||
        infoAlimento?.restricaoAlimentar !== ""
      ) {
        setRestricoesAlimentar(infoAlimento?.restricaoAlimentar);
        setQuais(true);
      } else {
        setQuais(false);
        setRestricoesAlimentar("");
      }
      setObservacoes(infoAlimento?.observacaoAlimento);
    }
    setRenderRedux(2);
  }

  function getDadosAlimentosReduxSegundoSet() {
    if (
      JSON.stringify(dadosTotalPedidos?.dadosPedidosAlimentos) !== "{}" &&
      tamanhoCoffees &&
      alimentos
    ) {
      const dados = dadosTotalPedidos?.dadosPedidosAlimentos;

      const infoAlimento = dados?.informacoesAlimento;

      if (
        !infoAlimento?.outrasComidas ||
        infoAlimento?.outrasComidas === "" ||
        coffeeSelecionado?.idTamanhoYouCoffee !== 3
      ) {
        setOutroComida(false);
        setOutroComida("");
      } else {
        setOutroComida(true);
        setOutraEscolhaComida(infoAlimento?.outrasComidas);
      }

      if (
        !infoAlimento?.outrasBebidas ||
        infoAlimento?.outrasBebidas === "" ||
        coffeeSelecionado?.idTamanhoYouCoffee !== 3
      ) {
        setOutroBebida(false);
        setOutroBebida("");
      } else {
        setOutroBebida(true);
        setOutraEscolhaBebida(infoAlimento?.outrasBebidas);
      }

      const comidasRedux = infoAlimento?.alimentoPedido?.filter(
        (alimentos) => alimentos.idTipoAlimento === 1
      );

      setComidasSelecionadas(comidasRedux);

      const bebidasRedux = infoAlimento?.alimentoPedido?.filter(
        (alimentos) => alimentos.idTipoAlimento === 2
      );

      setBebidasSelecionadas(bebidasRedux);
    }
    setRenderRedux(1);
  }

  useEffect(() => {
    if (
      renderRedux === 1 &&
      JSON.stringify(dadosTotalPedidos?.dadosPedidosAlimentos) !== "{}"
    ) {
      if (comidasSelecionadas?.length > 0) {
        let mudarValorChecked = isChecked;
        comidasSelecionadas?.map((comidaRedux) => {
          const indexComida = comidas
            .map((comida) => comida.idAlimento)
            .indexOf(parseInt(comidaRedux.idComida));
          mudarValorChecked = mudarValorChecked.map((item, index) =>
            index === indexComida ? !item : item
          );
          return comidaRedux;
        });
        setIsChecked(mudarValorChecked);
      }
      if (bebidasSelecionadas?.length > 0) {
        let mudarValorCheckedBebida = isCheckedBebida;
        bebidasSelecionadas?.map((bebidaRedux) => {
          const indexBebida = bebidas
            .map((bebida) => bebida.idAlimento)
            .indexOf(parseInt(bebidaRedux.idBebida));
          mudarValorCheckedBebida = mudarValorCheckedBebida.map((item, index) =>
            index === indexBebida ? !item : item
          );
          return bebidaRedux;
        });
        setIsCheckedBebida(mudarValorCheckedBebida);
      }
      setContador(comidasSelecionadas?.length);
      setRenderRedux(0);
    }
    setLoading(false);
  }, [comidasSelecionadas, bebidasSelecionadas, renderRedux]);

  function handleAlimentoSelecionado(e, indexP) {
    const mudarValorChecked = isChecked.map((item, index) =>
      index === indexP ? !item : item
    );

    setIsChecked(mudarValorChecked);

    const pegarDados = comidas.find(
      (c) => c.idAlimento === parseInt(e.target.value)
    );

    if (mudarValorChecked[indexP]) {
      setContador((prevContador) => prevContador + 1);
      if (
        coffeeSelecionado?.idTamanhoYouCoffee === 1 &&
        comidasSelecionadas.length < 2
      ) {
        const escolhaComida = {
          idComida: e.target.value,
          nomeAlimento: pegarDados.nomeAlimento,
          quantidade: 1,
          idTipoAlimento: 1,
        };
        setComidasSelecionadas([...comidasSelecionadas, escolhaComida]);
      }
      if (
        coffeeSelecionado?.idTamanhoYouCoffee === 2 &&
        comidasSelecionadas.length < 4
      ) {
        const escolhaComida = {
          idComida: e.target.value,
          nomeAlimento: pegarDados.nomeAlimento,
          quantidade: 1,
          idTipoAlimento: 1,
        };
        setComidasSelecionadas([...comidasSelecionadas, escolhaComida]);
      }
      if (coffeeSelecionado?.idTamanhoYouCoffee === 3) {
        const escolhaComida = {
          idComida: e.target.value,
          nomeAlimento: pegarDados.nomeAlimento,
          quantidade: 1,
          idTipoAlimento: 1,
        };
        setComidasSelecionadas([...comidasSelecionadas, escolhaComida]);
      }
    } else {
      setContador((prevContador) => prevContador - 1);

      const comidaId = comidas[indexP].idAlimento.toString();

      const indexOOf = comidasSelecionadas
        .map((c) => c.comida)
        .indexOf(comidaId);
      comidasSelecionadas.splice(indexOOf, 1);
    }
  }

  //procurar um meio para simplificar essas duas funcoes

  function handleBebidaSelecionada(e, indexP) {
    const mudarValorChecked = isCheckedBebida.map((item, index) =>
      index === indexP ? !item : item
    );

    setIsCheckedBebida(mudarValorChecked);

    const pegarDados = bebidas.find(
      (b) => b.idAlimento === parseInt(e.target.value)
    );

    if (mudarValorChecked[indexP]) {
      const escolhaBebida = {
        idBebida: e.target.value,
        nomeAlimento: pegarDados.nomeAlimento,
        quantidade: 1,
        idTipoAlimento: 2,
      };
      setBebidasSelecionadas([...bebidasSelecionadas, escolhaBebida]);
    } else {
      const bebidaId = bebidas[indexP].idAlimento.toString();

      const indexOOf = bebidasSelecionadas
        .map((b) => b.idBebida)
        .indexOf(bebidaId);

      bebidasSelecionadas.splice(indexOOf, 1);
      setBebidasSelecionadas(bebidasSelecionadas);
    }
  }

  function verificarDadosAnteriores() {
    if (
      JSON.stringify(dadosTotalPedidos?.dadosPedidos) === "{}" ||
      !dadosTotalPedidos?.dadosPedidos
    )
      return false;
    else return true;
  }

  function restricoesAlimentares(value) {
    if (value === "SIM") {
      setQuais(true);
    } else {
      setQuais(false);
      setRestricoesAlimentar("");
    }
  }

  function handleQuantidadeComida(value, index) {
    const comidaId = comidas[index].idAlimento.toString();

    const indexAlimentos = comidasSelecionadas
      .map((c) => c.idComida)
      .indexOf(comidaId);
    let addQuantidade = [...comidasSelecionadas];
    addQuantidade[indexAlimentos].quantidade =
      !value || value === "" ? "" : parseInt(value);
    setComidasSelecionadas(addQuantidade);
  }

  function handleQuantidadeBebida(value, index) {
    const bebidaId = bebidas[index].idAlimento.toString();
    const indexAlimentos = bebidasSelecionadas
      .map((b) => b.idBebida)
      .indexOf(bebidaId);
    let addQuantidade = [...bebidasSelecionadas];
    addQuantidade[indexAlimentos].quantidade =
      !value || value === "" ? "" : parseInt(value);
    setBebidasSelecionadas(addQuantidade);
  }

  function handleEnviarParaResumo(e) {
    setLoading(true);
    let erros = [];
    if (!coffeeSelecionado?.idTamanhoYouCoffee)
      erros.push("Selecione o tamanho do YouCoffee");
    if (quais && (restricoesAlimentar === "" || !restricoesAlimentar))
      erros.push("Preecha o campo 'quais' das restrições alimentares");
    if (comidasSelecionadas.length === 0 && !outroComida)
      erros.push("Selecione pelo menos um alimento (Comida)");
    if (outroComida && (!outraEscolhaComida || outraEscolhaComida === ""))
      erros.push("Preencha o campo outros das opções de bebidas");
    if (outroBebida && (!outraEscolhaBebida || outraEscolhaBebida === ""))
      erros.push("Preencha o campo outros das opções de bebidas");
    if (comidasSelecionadas.length > 0) {
      let quantidadeVazia = 0;
      for (let comida of comidasSelecionadas) {
        if (!comida?.quantidade || comida?.quantidade === "") quantidadeVazia++;
      }
      if (quantidadeVazia > 0)
        erros.push(
          `Há ${quantidadeVazia} ${
            quantidadeVazia === 1 ? "comida" : "comidas"
          } com quantidade igual a 0 ou não preenchida`
        );
    }
    if (bebidasSelecionadas.length > 0) {
      let quantidadeVazia = 0;
      for (let bebida of bebidasSelecionadas) {
        if (!bebida?.quantidade || bebida?.quantidade === "") quantidadeVazia++;
      }
      if (quantidadeVazia > 0)
        erros.push(
          `Há ${quantidadeVazia} ${
            quantidadeVazia === 1 ? "bebida" : "bebidas"
          } com quantidade igual a 0 ou não preenchida`
        );
    }
    if (erros.length === 0) {
      const informacoesAlimento = {
        alimentoPedido: [...bebidasSelecionadas, ...comidasSelecionadas],
        observacaoAlimento: observacoes,
        outrasBebidas:
          outroBebida && coffeeSelecionado?.idTamanhoYouCoffee === 3
            ? outraEscolhaBebida
            : "",
        outrasComidas:
          outroComida && coffeeSelecionado?.idTamanhoYouCoffee === 3
            ? outraEscolhaComida
            : "",
        restricaoAlimentar: restricoesAlimentar,
      };

      const dadosPedidoAlimento = {
        tamanhoYouCoffee: coffeeSelecionado,
        informacoesAlimento: informacoesAlimento,
      };

      dispatch(setDadosAlimentos(dadosPedidoAlimento));
      navigate("/resumo-do-pedido");
    } else {
      setErroView(true);
      if (erros.length === 1) {
        toastWarn(erros[0]);
      } else {
        const singular = erros.length - 1 === 1;
        toastWarn(
          `${erros[0]}, há ${
            singular ? "outro erro" : `outros ${erros.length - 1} erros`
          }, verifique-o${!singular ? "s" : ""} posteriormente`
        );
      }
    }
    setLoading(false);
  }

  const alterarCoffeeSelecionado = (
    idTamanhoYouCoffee,
    descrisaoTamanhoYouCoffee
  ) => {
    setCoffeeSelecionado({
      idTamanhoYouCoffee: idTamanhoYouCoffee,
      nomeTamanhoYouCoffee: descrisaoTamanhoYouCoffee,
    });
  };

  function voltarPagina() {
    const informacoesAlimento = {
      alimentoPedido: [...bebidasSelecionadas, ...comidasSelecionadas],
      observacaoAlimento: observacoes,
      outrasBebidas:
        outroBebida && coffeeSelecionado?.idTamanhoYouCoffee === 3
          ? outraEscolhaBebida
          : "",
      outrasComidas:
        outroComida && coffeeSelecionado?.idTamanhoYouCoffee === 3
          ? outraEscolhaComida
          : "",
      restricaoAlimentar: restricoesAlimentar,
    };

    const dadosPedidoAlimento = {
      tamanhoYouCoffee: coffeeSelecionado ? coffeeSelecionado : null,
      informacoesAlimento: informacoesAlimento,
    };

    dispatch(setDadosAlimentos(dadosPedidoAlimento));

    navigate("/formulario-dados-gerais");
  }

  return (
    <div>
      <Loading open={loading} />
      <div className={`${styles.page}`}>
        <section className={`${styles.section}`}>
          {tamanhoCoffees && alimentos ? (
            <div className={`${styles.enquadramento}`}>
              <div>
                <h2>Meu YouCoffee - Personalizado</h2>
                <h1>
                  Qual o tamanho do YouCoffee?
                  {erroView && !coffeeSelecionado?.idTamanhoYouCoffee && (
                    <span style={{ marginLeft: "5px", color: "red" }}>
                      <LuAlertCircle />
                    </span>
                  )}
                </h1>

                <TipoYouCoffee
                  tamanhoCoffees={tamanhoCoffees}
                  handleOnchange={alterarCoffeeSelecionado}
                  coffeeSelecionado={coffeeSelecionado}
                />
              </div>

              <div>
                <RestricaoAlimentar
                  quais={quais}
                  onChange={(e) => {
                    restricoesAlimentares(e.target.value);
                  }}
                  onChangeSet={(e) => {
                    setRestricoesAlimentar(e.target.value);
                  }}
                  restricoesAlimentar={restricoesAlimentar}
                />
              </div>

              <div>
                <h1>
                  Selecione a bebida e descreva a quantidade:
                  {erroView &&
                    ((outroBebida &&
                      (!outraEscolhaBebida || outraEscolhaBebida === "")) ||
                      bebidasSelecionadas
                        .map((b) => b?.quantidade)
                        .includes("")) && (
                      <span style={{ marginLeft: "5px", color: "red" }}>
                        <LuAlertCircle />
                      </span>
                    )}
                </h1>
                {alimentos.length > 0 ? (
                  <div>
                    {alimentos
                      ?.filter((bebida) => bebida.idTipoAlimento === 2)
                      ?.map((alimento, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 0,
                              marginTop: "6px",
                            }}
                            key={alimento.idAlimento}
                          >
                            <div
                              style={{
                                fontSize: "16px",
                                width: "49%",
                                marginBottom: "5px",
                              }}
                            >
                              <CheckboxRadio
                                checked={isCheckedBebida[index] === true}
                                type={"checkbox"}
                                id={alimento.idAlimento}
                                value={alimento?.idAlimento}
                                mudarCor={
                                  alimento.idTmnYouCoffeeMin >
                                    coffeeSelecionado?.idTamanhoYouCoffee ||
                                  !coffeeSelecionado
                                    ? " rgb(172, 170, 170)"
                                    : "black"
                                }
                                disabled={
                                  alimento.idTmnYouCoffeeMin >
                                    coffeeSelecionado?.idTamanhoYouCoffee ||
                                  !coffeeSelecionado
                                    ? true
                                    : false
                                }
                                text={alimento.nomeAlimento}
                                nome={"bebida"}
                                onChange={(e) =>
                                  handleBebidaSelecionada(e, index)
                                }
                              />
                            </div>

                            <div
                              style={{
                                fontSize: "16px",
                                width: "49%",
                                marginBottom: "5px",
                              }}
                            >
                              <label
                                className={
                                  isCheckedBebida[index]
                                    ? `${styles.labelFalse}`
                                    : `${styles.labelTrue}`
                                }
                              >
                                <input
                                  type="text"
                                  className={`${styles.inputTrue}`}
                                  disabled={!isCheckedBebida[index]}
                                  onChange={(e) => {
                                    let valor = e.target.value;
                                    valor = valor.replace(/[^\d]/g, "");
                                    handleQuantidadeBebida(valor, index);
                                  }}
                                  value={
                                    isCheckedBebida[index]
                                      ? bebidasSelecionadas.find(
                                          (b) =>
                                            parseInt(b.idBebida) ===
                                            parseInt(alimento.idAlimento)
                                        )?.quantidade
                                      : ""
                                  }
                                />
                                unidade(s) 1 unidade = 1 garrafa de
                                {alimento.idAlimento === 15 ||
                                alimento.idAlimento === 16
                                  ? " 500ml"
                                  : alimento.idAlimento === 17 ||
                                    alimento.idAlimento === 18 ||
                                    alimento.idAlimento === 20
                                  ? " 1 litro"
                                  : alimento.idAlimento === 19
                                  ? " 2 litros"
                                  : ""}
                              </label>
                            </div>
                          </div>
                        );
                      })}

                    <div
                      style={{
                        fontSize: "16px",
                        marginBottom: "15px",
                        marginTop: "5px",
                      }}
                    >
                      <CheckboxRadio
                        type={"checkbox"}
                        text={"Outros"}
                        checked={outroBebida}
                        onChange={() => setOutroBebida(!outroBebida)}
                        mudarCor={
                          coffeeSelecionado?.idTamanhoYouCoffee === 3
                            ? "black"
                            : " rgb(172, 170, 170)"
                        }
                        disabled={
                          coffeeSelecionado?.idTamanhoYouCoffee === 3
                            ? false
                            : true
                        }
                      />
                    </div>

                    {outroBebida && (
                      <div className={`${styles.inputAlimento}`}>
                        <InputForm
                          placeholder={"Descreva a bebida e quantidade"}
                          type={"text"}
                          value={outraEscolhaBebida}
                          borderRadius={"10px"}
                          borderColor={"1px solid #A0A0A0"}
                          onChange={(e) =>
                            setOutraEscolhaBebida(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.atencao}>Aguardando Conexão</div>
                )}

                <div>
                  <h1>
                    Selecione as opções de alimentos e suas quantidades:
                    {erroView &&
                      (comidasSelecionadas.length === 0 ||
                        !comidasSelecionadas ||
                        (outroComida &&
                          (!outraEscolhaComida || outraEscolhaComida === "")) ||
                        (coffeeSelecionado.idTamanhoYouCoffee === 3 &&
                          outroComida &&
                          (!outraEscolhaComida || outraEscolhaComida === "")) ||
                        comidasSelecionadas
                          .map((c) => c?.quantidade)
                          .includes("") ||
                        comidasSelecionadas
                          .map((c) => c?.quantidade)
                          .includes(0)) && (
                        <span style={{ marginLeft: "5px", color: "red" }}>
                          <LuAlertCircle />
                        </span>
                      )}
                  </h1>
                  {alimentos.length > 0 ? (
                    <div>
                      {alimentos
                        ?.filter((comida) => comida.idTipoAlimento === 1)
                        ?.map((alimento, index) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 0,
                                marginTop: "6px",
                              }}
                              key={alimento.idAlimento}
                            >
                              <div
                                style={{
                                  fontSize: "16px",
                                  width: "49%",
                                  marginBottom: "5px",
                                }}
                              >
                                <CheckboxRadio
                                  checked={isChecked[index] === true}
                                  type={"checkbox"}
                                  value={alimento?.idAlimento}
                                  text={alimento.nomeAlimento}
                                  nome={"alimentos"}
                                  onChange={(e) => {
                                    handleAlimentoSelecionado(e, index);
                                  }}
                                  mudarCor={
                                    !coffeeSelecionado
                                      ? "rgb(172, 170, 170)"
                                      : "black"
                                  }
                                  disabled={
                                    !coffeeSelecionado
                                      ? true
                                      : contador === 2 &&
                                        coffeeSelecionado?.idTamanhoYouCoffee ===
                                          1 &&
                                        isChecked[index] === false
                                      ? true
                                      : contador === 3 &&
                                        coffeeSelecionado?.idTamanhoYouCoffee ===
                                          2 &&
                                        isChecked[index] === false
                                      ? true
                                      : false
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  fontSize: "16px",
                                  width: "49%",
                                  marginBottom: "5px",
                                }}
                              >
                                <label
                                  className={
                                    isChecked[index]
                                      ? `${styles.labelFalse}`
                                      : `${styles.labelTrue}`
                                  }
                                >
                                  <input
                                    className={
                                      isChecked[index]
                                        ? `${styles.inputFalse}`
                                        : `${styles.inputTrue}`
                                    }
                                    type="text"
                                    disabled={!isChecked[index]}
                                    onChange={(e) => {
                                      let valor = e.target.value;
                                      valor = valor.replace(/[^\d]/g, "");
                                      handleQuantidadeComida(valor, index);
                                    }}
                                    value={
                                      isChecked[index]
                                        ? comidasSelecionadas.find(
                                            (c) =>
                                              parseInt(c.idComida) ===
                                              parseInt(alimento.idAlimento)
                                          )?.quantidade
                                        : ""
                                    }
                                  />
                                  unidade(s)
                                </label>
                              </div>
                            </div>
                          );
                        })}

                      <div
                        style={{
                          fontSize: "16px",
                          width: "49%",
                          marginBottom: "15px",
                          marginTop: "5px",
                        }}
                      >
                        <CheckboxRadio
                          type={"checkbox"}
                          text={"Outros"}
                          checked={outroComida}
                          onChange={() => setOutroComida(!outroComida)}
                          mudarCor={
                            coffeeSelecionado?.idTamanhoYouCoffee === 3
                              ? "black"
                              : " rgb(172, 170, 170)"
                          }
                          disabled={
                            coffeeSelecionado?.idTamanhoYouCoffee === 3
                              ? false
                              : true
                          }
                        />
                      </div>
                      {outroComida && (
                        <div className={`${styles.inputAlimento}`}>
                          <InputForm
                            type="text"
                            placeholder={"Descreva o alimento e quantidade"}
                            value={outraEscolhaComida}
                            borderRadius={"10px"}
                            borderColor={"1px solid #A0A0A0"}
                            onChange={(e) =>
                              setOutraEscolhaComida(e.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.atencao}>Aguardando Conexão</div>
                  )}
                </div>
                <h1>Observações:</h1>
                <Observacoes
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <ConexaoPerdida
              handleOnClick={(e) => {
                e.preventDefault();
                dadosBack();
              }}
            />
          )}
          {alimentos && tamanhoCoffees && (
            <div className={`${styles.voltarProximo}`}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  voltarPagina();
                }}
                cor={"#F2F4F8"}
                corFont={"#9E184B"}
                text={"Voltar"}
              />
              <Button
                onClick={(e) => {
                  handleEnviarParaResumo(e);
                }}
                cor={"#9E184B"}
                corFont={"#EBE9E2"}
                text={"Próximo"}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default FormularioAlimentos;
