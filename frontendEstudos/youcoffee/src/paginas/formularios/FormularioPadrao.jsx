import { useEffect, useState } from "react";
import TipoYouCoffee from "../../componentes/TipoYouCoffee";
import { tamanhoCoffee } from "../../services/api";
import styles from "./FormularioAlimentos.module.css";
import RestricaoAlimentar from "../../componentes/RestricaoAlimentar";
import Observacoes from "../../componentes/Observacoes";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDadosAlimentos } from "../../redux/pedidos/action";
import Loading from "../../componentes/Loading";
function FormularioPadrao() {
  const [tamanhoCoffees, setTamanhoCoffees] = useState([]);
  const [dadosObservacoes, setDadosObservacoes] = useState([]);
  const [restricoesAlimentar, setRestricoesAlimentar] = useState("");
  const [coffeeSelecionado, setCoffeeSelecionado] = useState(null);
  const [quais, setQuais] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function dadosBack() {
    try {
      setLoading(true);
      const response = await tamanhoCoffee("PADRAO");
      setTamanhoCoffees(response.data);
      setLoading(false);
    } catch (e) {
      console.log("e :>> ", e);
    }
  }

  useEffect(() => {
    dadosBack();
    console.log("dadosObservacoes :>> ", dadosObservacoes);
  }, []);

  useEffect(() => {
    console.log("dadosObservacoes :>> ", dadosObservacoes);
    console.log("restricoesAlimentar :>> ", restricoesAlimentar);
  });

  function voltarPagina() {
    navigate("/formulario-dados-gerais");
  }

  function enviarParaResumo(e) {
    e.preventDefault();
    try {
      const dadosPadrao = {
        tamanhoYouCoffee: coffeeSelecionado,
        observacaoAlimento:
          dadosObservacoes.length > 0 ? dadosObservacoes : null,
        RestricaoAlimentar:
          restricoesAlimentar.length > 0 ? restricoesAlimentar : null,
      };
      dispatch(setDadosAlimentos(dadosPadrao));
      navigate("/resumo-do-pedido");
    } catch (e) {
      console.log("e :>> ", e);
    }
  }

  function restricoesAlimentares(value) {
    if (value === "SIM") {
      setQuais(true);
    } else {
      setQuais(false);
      setRestricoesAlimentar("");
    }
  }

  const alterarCoffeeSelecionado = (
    idTamanhoYouCoffee,
    descricaoTamanhoYouCoffee
  ) => {
    setCoffeeSelecionado({
      idTamanhoYouCoffee: idTamanhoYouCoffee,
      nomeTamanhoYouCoffee: descricaoTamanhoYouCoffee,
    });
  };

  return (
    <div>
      <Loading open={loading} />

      <div className={`${styles.page}`}>
        <section className={`${styles.section}`}>
          <div className={`${styles.enquadramento}`}>
            <h2>Meu YouCoffee</h2>
            <TipoYouCoffee
              tamanhoCoffees={tamanhoCoffees}
              handleOnchange={alterarCoffeeSelecionado}
              coffeeSelecionado={coffeeSelecionado}
            />
            <RestricaoAlimentar
              quais={quais}
              onChange={(e) => restricoesAlimentares(e.target.value)}
              onChangeSet={(e) => setRestricoesAlimentar(e.target.value)}
              restricoesAlimentar={restricoesAlimentar}
            />
            <h1>Observações:</h1>
            <div style={{ marginBottom: "60px" }}>
              <Observacoes
                value={dadosObservacoes}
                onChange={(e) => setDadosObservacoes(e.target.value)}
              />
            </div>
            {tamanhoCoffees && (
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
                    enviarParaResumo(e);
                  }}
                  cor={"#9E184B"}
                  corFont={"#EBE9E2"}
                  text={"Próximo"}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FormularioPadrao;
