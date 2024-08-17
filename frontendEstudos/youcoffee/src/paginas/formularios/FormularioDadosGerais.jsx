import { useEffect } from "react";
import styles from "./FormularioAlimentos.module.css";
import { useState } from "react";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import InputForm from "../../componentes/InputForm";
import { diretorias, locais } from "../../services/api";
import Radio from "../../componentes/Radio";
import BasicDatePicker from "../../utils/Data";
import TimePickerViewRenderers from "../../utils/Hora";
import BasicSelect from "../../utils/SelectMui";
import { useDispatch, useSelector } from "react-redux";
import { setDadoGeral } from "../../redux/pedidos/action";
import { toastPerdaDadosRedux, toastWarn } from "../../utils/Toast";
import "react-loading-skeleton/dist/skeleton.css";
import { LuAlertCircle } from "react-icons/lu";
import Loading from "../../componentes/Loading";
import ConexaoPerdida from "./ConexaoPerdida";

function FormularioDadosGerais() {
  const [diretoria, setDiretoria] = useState([]);
  const [local, setLocal] = useState([]);
  const [outros, setOutros] = useState(false);
  const [outroLocal, setOutroLocal] = useState("");
  const [observacoesPedido, setObservacoesPedido] = useState("");
  const [escolhaDiretoria, setEscolhaDiretoria] = useState(null);
  const [escolhaCentroCusto, setEscolhaCentroCusto] = useState("");
  const [escolhaEvento, setEscolhaEvento] = useState("");
  const [escolhaLocal, setEscolhaLocal] = useState(null);
  const [escolhaData, setEscolhaData] = useState("");
  const [escolhaTempo, setEscolhaTempo] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const navigate = useNavigate();
  const dadosTotalPedidos = useSelector((state) => state.dadosTotalPedidos);
  const [loading, setLoading] = useState(false);
  const [erroView, setErroView] = useState(false);

  function handleEnviarDadosGerais() {
    setLoading(true);
    let erros = [];
    if (!escolhaDiretoria?.idDiretoria) erros.push("Selecione a 'Diretoria'");
    if (!escolhaCentroCusto || escolhaCentroCusto === "")
      erros.push("Preencha o campo 'Centro de custo'");
    if (!escolhaEvento || escolhaEvento === "")
      erros.push("Preencha o campo 'Tipo de evento'");
    if (!escolhaData || escolhaData === "")
      erros.push("Preencha o campo 'Data'");
    if (!escolhaTempo || escolhaTempo === "")
      erros.push("Preencha o campo 'Hora'");
    if (
      !quantidadePessoas ||
      quantidadePessoas === "" ||
      quantidadePessoas === 0
    )
      erros.push(
        "Preencha o campo 'Qual a quantidade de pessoas' com um valor maior que zero"
      );
    if (!escolhaLocal) erros.push("Selecione o local");
    if (outros && (!outroLocal || outroLocal === ""))
      erros.push("Preencha o campo 'Outro local'");
    if (erros.length === 0) {
      const dataHorario = {
        data: escolhaData,
        horario: escolhaTempo,
      };
      const localEvento = {
        nomeLocalEvento: escolhaLocal?.nomeLocal,
        idLocalEvento: escolhaLocal?.idLocal,
        outroLocal: outroLocal,
      };

      const dadosGerais = {
        tipoPedido: dadosTotalPedidos?.dadosPedidos?.tipoPedido,
        diretoria: escolhaDiretoria,
        centrosCusto: escolhaCentroCusto,
        tipoEvento: escolhaEvento,
        localEvento: localEvento,
        observacaoPedido: observacoesPedido,
        dataHorarioEvento: dataHorario,
        quantidadePessoas: quantidadePessoas,
      };
      dispatch(setDadoGeral(dadosGerais));
      navigate(
        dadosGerais.tipoPedido === "PERSONALIZADO"
          ? "/formulario-alimentos"
          : "/pedido-padrao"
      );
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

  async function dadosBack() {
    setLoading(true);
    const existeTipoPedido = verificarDadosAnteriores();
    if (!existeTipoPedido) {
      toastPerdaDadosRedux();
      navigate("/historico");
    }
    const responses = await Promise.all([diretorias(), locais()]);
    setDiretoria(responses[0]?.status === 200 ? responses[0]?.data : null);
    setLocal(responses[1]?.status === 200 ? responses[1]?.data : null);
    if (!local || !diretoria) getDadosGeraisRedux();
  }

  useEffect(() => {
    if (JSON.stringify(diretoria) !== "[]" && JSON.stringify(local) !== "[]")
      getDadosGeraisRedux();
  }, [diretoria, local]);

  function verificarDadosAnteriores() {
    if (!dadosTotalPedidos?.dadosPedidos?.tipoPedido) return false;
    else return true;
  }

  function getDadosGeraisRedux() {
    if (
      JSON.stringify(dadosTotalPedidos?.dadosPedidos) !== "{}" &&
      local &&
      diretoria
    ) {
      const dados = dadosTotalPedidos?.dadosPedidos;
      if (diretoria && diretoria?.length > 0) {
        setEscolhaDiretoria({
          idDiretoria: dados?.diretoria?.idDiretoria,
          nomeDiretoria: dados?.diretoria?.nomeDiretoria,
        });
      }

      setEscolhaCentroCusto(dados?.centrosCusto);

      setSelectOption(dados?.localEvento?.idLocalEvento);
      setEscolhaLocal({
        idLocal: dados?.localEvento?.idLocalEvento,
        nomeLocal: dados?.localEvento?.nomeLocalEvento,
      });
      if (dados?.outroLocal !== "" && dados?.outroLocal) {
        setOutroLocal(dados?.outroLocal);
        setOutros(true);
      } else {
        setOutroLocal("");
        setOutros(false);
      }

      setEscolhaEvento(dados?.tipoEvento);

      setObservacoesPedido(dados?.observacaoPedido);

      setEscolhaData(dados?.dataHorarioEvento?.data);
      setEscolhaTempo(dados?.dataHorarioEvento?.horario);
      setQuantidadePessoas(dados?.quantidadePessoas);
    }
    setLoading(false);
  }

  useEffect(() => {
    dadosBack();
  }, []);

  function selectLocal(e) {
    const pegarDados = local.find((l) => l.idLocal === e.target.value);
    setEscolhaLocal({ ...pegarDados });
    setOutros(pegarDados.idLocal === 20 ? true : false);
    setSelectOption(e.target.value);
  }

  const dispatch = useDispatch();

  function setarData(e) {
    setEscolhaData(e);
    setEscolhaTempo("");
  }

  return (
    <div className={`${styles.page}`}>
      <Loading open={loading} />
      <section className={`${styles.section}`}>
        {local && diretoria ? (
          <div className={`${styles.enquadramento}`}>
            <div>
              <h2>Dados Gerais</h2>
              <h1>
                Para qual diretoria será o coffee?{" "}
                {erroView && !escolhaDiretoria && (
                  <span style={{ color: "red" }}>
                    <LuAlertCircle />
                  </span>
                )}
              </h1>

              {diretoria.length > 0 ? (
                diretoria.map((uni, index) => {
                  return (
                    <div key={index}>
                      <li style={{ marginBottom: "8px" }}>
                        <Radio
                          name="diretoriaNome"
                          type="radio"
                          value={uni?.idDiretoria}
                          checked={
                            escolhaDiretoria?.idDiretoria === uni?.idDiretoria
                          }
                          onChange={(e) =>
                            setEscolhaDiretoria({
                              idDiretoria: parseInt(e.target.value),
                              nomeDiretoria: uni?.nomeDiretoria,
                            })
                          }
                          texto={uni?.nomeDiretoria}
                        />
                      </li>
                    </div>
                  );
                })
              ) : (
                <div className={styles.atencao}>Aguardando Conexão</div>
              )}
            </div>

            <div>
              <h1>
                Centro de custo{" "}
                {erroView &&
                  (escolhaCentroCusto === "" || !escolhaCentroCusto) && (
                    <span style={{ color: "red" }}>
                      <LuAlertCircle />
                    </span>
                  )}
              </h1>
              <div className={`${styles.inputDados}`}>
                <InputForm
                  type={"text"}
                  value={escolhaCentroCusto}
                  placeholder={"Digite o centro de custo"}
                  onChange={(e) => setEscolhaCentroCusto(e.target.value)}
                  borderRadius={"10px"}
                  borderColor={"1px solid #A0A0A0"}
                  max={255}
                />
              </div>
              <p className={styles.atencao}>
                Atenção: Realize a verificação do seu centro de custo.
              </p>
            </div>

            <div>
              <h1>
                Tipo de Evento{" "}
                {erroView && (escolhaEvento === "" || !escolhaEvento) && (
                  <span style={{ color: "red" }}>
                    <LuAlertCircle />
                  </span>
                )}
              </h1>
              <div className={`${styles.inputDados}`}>
                <InputForm
                  type={"text"}
                  value={escolhaEvento}
                  placeholder={"Digite qual é o evento"}
                  onChange={(e) => setEscolhaEvento(e.target.value)}
                  borderRadius={"10px"}
                  borderColor={"1px solid #A0A0A0"}
                  max={50}
                />
              </div>
            </div>

            <div>
              <h1>
                Data e hora{" "}
                {erroView &&
                  (escolhaData === "" ||
                    !escolhaData ||
                    escolhaTempo === "" ||
                    !escolhaTempo) && (
                    <span style={{ color: "red" }}>
                      <LuAlertCircle />
                    </span>
                  )}
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "left",
                }}
              >
                <span style={{ marginRight: "11%" }}>
                  <BasicDatePicker
                    onChange={(e) => {
                      setarData(e);
                    }}
                    value={escolhaData}
                  />
                </span>
                <TimePickerViewRenderers
                  onChange={(e) => {
                    setEscolhaTempo(e);
                  }}
                  value={escolhaTempo}
                  disabled={!escolhaData || escolhaData === ""}
                  dataSelecionada={escolhaData}
                />
              </div>

              <p className={styles.atencao}>
                Atenção: O pedido deve ser realizado com <strong>24h</strong> de
                antecedência
              </p>
            </div>
            <div>
              <h1>
                Qual a quantidade de pessoas?{" "}
                {erroView &&
                  (!quantidadePessoas ||
                    quantidadePessoas === "" ||
                    quantidadePessoas === 0) && (
                    <span style={{ color: "red" }}>
                      <LuAlertCircle />
                    </span>
                  )}
              </h1>
              <input
                type="text"
                className={`${styles.inputTrue}`}
                onChange={(e) => {
                  let valor = e.target.value;
                  valor = valor.replace(/[^\d]/g, "");
                  setQuantidadePessoas(
                    parseInt(valor) ? parseInt(valor) : valor
                  );
                }}
                value={quantidadePessoas}
              />
              <span style={{ color: "#543A20", marginLeft: "2px", top: "1px" }}>
                pessoa (s)
              </span>
            </div>

            <div>
              <h1>
                Local{" "}
                {erroView &&
                  (!escolhaLocal ||
                    (outros && (!outroLocal || outroLocal === ""))) && (
                    <span style={{ color: "red" }}>
                      <LuAlertCircle />
                    </span>
                  )}
              </h1>

              <BasicSelect
                selectOption={selectOption}
                opcao={local}
                onChange={(e) => selectLocal(e)}
              />

              {outros && (
                <div
                  style={{ marginTop: "10px" }}
                  className={`${styles.inputDados}`}
                >
                  <InputForm
                    type={"text"}
                    value={outroLocal}
                    placeholder={"Digite o outro local"}
                    borderRadius={"10px"}
                    borderColor={"1px solid #A0A0A0"}
                    onChange={(e) => {
                      setOutroLocal(e.target.value);
                    }}
                    max={150}
                  />
                </div>
              )}
              <p className={styles.atencao}>
                {local.length > 0
                  ? "Atenção: Selecione a sala que será realizado o evento."
                  : "Aguardando Conexão"}
              </p>
            </div>

            <div>
              <h1>Observações:</h1>
              <div className={`${styles.inputDados}`}>
                <InputForm
                  type={"text"}
                  value={observacoesPedido}
                  borderRadius={"10px"}
                  borderColor={"1px solid #A0A0A0"}
                  onChange={(e) => setObservacoesPedido(e.target.value)}
                  placeholder={"Louças especiais, decoração, etc.."}
                  max={255}
                />
              </div>
            </div>

            <div style={{ textAlign: "right", marginTop: "50px" }}>
              <Button
                cor={"#9E184B"}
                corFont={"#EBE9E2"}
                text={"Próximo"}
                onClick={() => handleEnviarDadosGerais()}
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
      </section>
    </div>
  );
}

export default FormularioDadosGerais;
