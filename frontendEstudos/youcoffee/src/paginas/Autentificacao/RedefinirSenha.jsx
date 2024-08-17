import { useState, useEffect } from "react";
import styles from "./Autentificacao.module.css";
import cafe from "../../imagens/cafe.png";
import xicara from "../../imagens/xicaraCafe.png"
import youxLogo from "../../imagens/youxLogo.png";
import Button from "../../componentes/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { redefinirSenha } from "../../services/api";
import InputSenha from "../../componentes/InputSenha";
import { toastError,  toastWarn } from "../../utils/Toast";
import Loading from "../../componentes/Loading";
import SenhaContem from "../../utils/SenhaContem";

function RedefinirSenha() {
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const [querVer, setQuerVer] = useState(false);
  const [querVerDois, setQuerVerDois] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [temNumero, setTemNumero] = useState(false);
  const [temLetraMaiuscula, setTemLetraMaiuscula] = useState(false);
  const [temLetraMinuscula, setTemLetraMinuscula] = useState(false);
  const [temOito, setTemOito] = useState(false);

  useEffect(() => {
    if (location?.search?.split("=")[1]) {
      setToken(location?.search?.split("=")[1]);
    }
  }, []);

  function dadoSenha(e) {
    setTemLetraMaiuscula(/[A-Z]/.test(e.target.value));
    setTemNumero(/\d/.test(e.target.value));
    setTemOito(e.target.value.length >= 8 ? true : false);
    setTemLetraMinuscula(/[a-z]/.test(e.target.value));
    setSenha(e.target.value);
  }

  async function atualizarSenha() {
    setLoading(true)
    let erros = []
    if(!temLetraMaiuscula || !temLetraMinuscula || !temNumero || !temNumero || !temOito) erros.push("Senha Inválida")
    
    if(senha !== confirmarSenha) erros.push("Senha incorreta")
    
    if (erros.length === 0) {
      try {
        const resposta = await redefinirSenha(senha, token);
        if(resposta) navigate("/");
      } catch (e) {
        toastError(
          e?.response?.data?.erros[0] ? e.response.data.erros[0] : "Erro"
        );
      }
    } else {
      if(erros.length === 1) {
        toastWarn(erros[0])
      } else {
        const singular = (erros.length - 1 === 1) 
        toastWarn(`${erros[0]}, há ${singular ? "outro erro" : `outros ${erros.length -1} erros`}, verifique-o${!singular ? "s": ""} posteriormente`)
      }
    }
    setLoading(false)
  }

  function dadoConfirmarSenha(e) {
    setConfirmarSenha(e.target.value);
  }

  function cancelar() {
    navigate("/");
  }

  function verSenha() {
    setQuerVer(!querVer);
  }

  function verSenhaDois() {
    setQuerVerDois(!querVerDois);
  }

  return (
    <div className={`${styles.page}`}>
      <Loading open={loading}/>
      <div className={`${styles.imagemTopo}`}>
        <img
          src={youxLogo}
          alt="Logo youx group"
          className={`${styles.imagemLogoYoux}`}
        />

        <img src={cafe} alt="grão de café" className={`${styles.imagemCafe}`} />
      </div>
      <div className={`${styles.container}`}>
        <section className={`${styles.sect}`} style={{padding: "20px 20px 40px 20px"}}>
          <p style={{fontSize: "20px", marginBottom: "6px"}}> Crie uma nova senha</p>
          <div className={`${styles.tituloYouCoffee}`}>
            <h1>YouCoffee</h1>
          </div>
          <div className={`${styles.caixaAllInputSenha}`}>
            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "50%" }}>Nova senha</p>

              <InputSenha
                type={querVer ? "txt" : "password"}
                id="senha"
                placeholder="Digite sua senha"
                handleOnchange={(e) => dadoSenha(e)}
                value={senha}
                olho={querVer}
                mudarOlho={(e) => verSenha()}
              />
            </div>
            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "50%" }}>Confirmar senha</p>

              <InputSenha
                type={querVerDois ? "txt" : "password"}
                id="confirmarSenha"
                placeholder="Confirme sua senha"
                handleOnchange={(e) => dadoConfirmarSenha(e)}
                value={confirmarSenha}
                olho={querVerDois}
                mudarOlho={(e) => verSenhaDois()}
              />
            </div>
          </div>

          <div style={{width: "40%", display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
          <SenhaContem
            temLetraMaiuscula={temLetraMaiuscula}
            temLetraMinuscula={temLetraMinuscula}
            temNumero={temNumero}
            temOito={temOito}
          />
          </div>

          <div className={`${styles.buttonEdit}`} style={{ marginTop: "30px" }}>
            <Button
              cor="#EBE9E2"
              corFont="#9E184B"
              text={"Cancelar"}
              width={"45%"}
              onClick={(e) => cancelar(e)}
            />
              <Button
                cor="#9E184B"
                corFont="#EBE9E2"
                text={"Atualizar"}
                width={"45%"}
                onClick={(e) => atualizarSenha(e)}
              />
          </div>
        </section>
      </div>
      <img
        src={xicara}
        alt="xicara de café"
        className={`${styles.imagemXicara}`}
      />
    </div>
  );
}
export default RedefinirSenha;
