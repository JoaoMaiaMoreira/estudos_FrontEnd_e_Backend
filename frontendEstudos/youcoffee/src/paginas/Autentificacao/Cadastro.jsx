import { useState } from "react";
import styles from "./AutentificacaoCadastro.module.css";
import cafe from "../../imagens/cafe.png";
import Input from "../../componentes/Input";
import xicara from "../../imagens/xicaraCafe.png";
import youxLogo from "../../imagens/youxLogo.png";
import Button from "../../componentes/Button";
import { cadastro, enviarEmail } from "../../services/api";
import InputSenha from "../../componentes/InputSenha";
import { useNavigate } from "react-router-dom";
import { toastWarn } from "../../utils/Toast";
import Loading from "../../componentes/Loading";
import SenhaContem from "../../utils/SenhaContem";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [querVerDois, setQuerVerDois] = useState(false);
  const [loading, setLoading] = useState(false);
  const [querVer, setQuerVer] = useState(false);
  const [temNumero, setTemNumero] = useState(false);
  const [temLetraMaiuscula, setTemLetraMaiuscula] = useState(false);
  const [temLetraMinuscula, setTemLetraMinuscula] = useState(false);
  const [temOito, setTemOito] = useState(false);

  const navigate = useNavigate();

  function dadoUserNome(e) {
    setNome(e.target.value);
  }

  function dadoEmail(e) {
    setEmail(e.target.value);
  }

  function dadoSenha(e) {
    setTemLetraMaiuscula(/[A-Z]/.test(e.target.value));
    setTemNumero(/\d/.test(e.target.value));
    setTemOito(e.target.value.length >= 8 ? true : false);
    setTemLetraMinuscula(/[a-z]/.test(e.target.value));
    setSenha(e.target.value);
  }

  async function handleAcessar() {
    setLoading(true)
    let erros = [];

    if(!nome || nome === '') erros.push("Preencha o campo nome")
    
    if(!email.includes("@youxgroup.com.br")) erros.push("E-mail inválido, utilize um e-mail com domínio @youxgroup.com.br")

    if(!temLetraMaiuscula || !temLetraMinuscula || !temNumero || !temNumero || !temOito) erros.push("Senha Inválida")

    if(senha !== confirmarSenha) erros.push("Senhas não coincidem")

    if(erros.length === 0) {
      try {
        const resposta = await cadastro(nome, email, senha);

        if (resposta) {
          toastWarn("Aguarde o envio do email de verificação")
          const solicitacao = "CONFIRMAR_EMAIL";
          await enviarEmail(email, solicitacao);
          navigate("/");
        }
        
      } catch(e) {
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

  function verSenha() {
    setQuerVer(!querVer);
  }

  function verSenhaDois() {
    setQuerVerDois(!querVerDois);
  }

  function handleVoltar() {
    navigate("/");
  }

  return (
    <div className={`${styles.page}`}>
      <Loading open={loading}/>
      <img src={cafe} alt="grão de café" className={`${styles.imagemCafe}`} />
      <img
        src={youxLogo}
        alt="Logo youx group"
        className={`${styles.imagemLogoYoux}`}
      />
      <div className={`${styles.container}`}>
        <section className={`${styles.sect}`}>
          <p className={`${styles.subTitulo}`}>Faça seu cadastro!</p>

          <div className={`${styles.tituloYouCoffee}`}>
            <h1>YouCoffee</h1>
          </div>
          <div className={`${styles.caixaAllInput}`}>
            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "60%"}}>Nome completo</p>
              <Input
                type="text"
                id="nome"
                placeholder="Digite seu nome completo"
                handleOnchange={(e) => dadoUserNome(e)}
                value={nome}
                cor="white"
                borderRa="100px"
                borda="2px solid #9E184B"
                max={50}
              />
            </div>

            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "60%"}}>E-mail YouX</p>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu e-mail YouX"
                handleOnchange={(e) => dadoEmail(e)}
                value={email}
                cor="white"
                borderRa="100px"
                borda="2px solid #9E184B"
                max={64}
              />
            </div>

            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "60%"}}>Senha</p>
              <InputSenha
                type={querVer ? "txt" : "password"}
                id="senha"
                placeholder="Digite sua senha"
                handleOnchange={(e) => dadoSenha(e)}
                value={senha}
                cor="white"
                borderRa="100px"
                borda="2px solid #9E184B"
                olho={querVer}
                mudarOlho={(e) => verSenha()}
              />
            </div>
            <div className={`${styles.caixaInput}`}>
              <p style={{ width: "60%"}}>Confirmar Senha </p>
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
          <div style={{width: "45%", display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
          <SenhaContem
            temLetraMaiuscula={temLetraMaiuscula}
            temLetraMinuscula={temLetraMinuscula}
            temNumero={temNumero}
            temOito={temOito}
          />
          </div>

          <div className={`${styles.buttonEdit}`}>
            <Button
              cor="#EBE9E2"
              corFont="#9E184B"
              email={email}
              senha={senha}
              text={"Voltar"}
              width={"45%"}
              onClick={(e) => handleVoltar(e)}
            />
            <Button
              cor="#9E184B"
              corFont="#EBE9E2"
              email={email}
              senha={senha}
              text={"Salvar"}
              width={"45%"}
              onClick={(e) => handleAcessar(e)}
            />
          </div>
        </section>
        <div className={`${styles.divImagem}`}></div>
      </div>
      <img
        src={xicara}
        alt="xicara de café"
        className={`${styles.imagemXicara}`}
      />
    </div>
  );
}
export default Cadastro;
