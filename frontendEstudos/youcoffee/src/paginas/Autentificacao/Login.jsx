import { useState } from "react";
import styles from "./Autentificacao.module.css";
import cafe from "../../imagens/cafe.png";
import Input from "../../componentes/Input";
import xicara from "../../imagens/xicaraCafe.png";
import youxLogo from "../../imagens/youxLogo.png";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import MeuModal from "../../componentes/MeuModal";
import InputSenha from "../../componentes/InputSenha";
import Loading from "../../componentes/Loading";
import {
  toastWarn,
} from "../../utils/Toast";
import "react-toastify/dist/ReactToastify.css";
import logoLab from "../../imagens/logoLab.png";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [contador, setContador] = useState(0);
  const [querVer, setQuerVer] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function dadoEmail(e) {
    setEmail(e.target.value);
  }

  function dadoSenha(e) {
    setSenha(e.target.value);
  }

  function handleCadastrar() {
    navigate(`./quero-me-cadastrar`);
  }

  function verSenha() {
    setQuerVer(!querVer);
  }

  async function handleLogar(e) {
    setLoading(true)
    let erros = []
    if(!email || email === '') erros.push("Preecha o campo login")
    if(!senha || senha === '') erros.push("Preecha o campo senha")
    if(erros.length === 0){
      const resposta = await login(email, senha);
      if(resposta){
      navigate("/historico");
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

  function esterEggs() {
    setContador(contador + 1);
  }

  return (
    <div className={`${styles.page}`}>
      <Loading open={loading}/>
      <img
        src={contador >= 5 ? logoLab : youxLogo}
        alt="Logo youx group"
        className={`${styles.imagemLogoYoux}`}
      />

      <img
        src={cafe}
        alt="grão de café"
        className={`${styles.imagemCafe}`}
        onClick={(e) => esterEggs(e)}
      />
      <div className={`${styles.container}`}>
        <section className={`${styles.sect}`}>
          <p className={`${styles.subTitulo}`}>Acesse e faça seu pedido!</p>

          <div className={`${styles.tituloYouCoffee}`}>
            <h1>YouCoffee</h1>
          </div>

          <div className={`${styles.caixaAllInput}`}>
            <div className={`${styles.caixaInput}`}>
              <p style={{width: "25%"}}>Login </p>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu e-mail YouX"
                handleOnchange={(e) => dadoEmail(e)}
                value={email}
                texto="Login"
                max={64}
              />
            </div>

            <div className={`${styles.caixaInput}`}>
              <p style={{width: "25%"}}>Senha</p>
              <InputSenha
                type={querVer ? "txt" : "password"}
                id="senha"
                placeholder="Digite sua senha"
                handleOnchange={(e) => dadoSenha(e)}
                value={senha}
                texto="Senha"
                cor="white"
                borderRa="100px"
                borda="2px solid #9E184B"
                olho={querVer}
                mudarOlho={(e) => verSenha()}
              />
            </div>
          </div>

          <div className={`${styles.esqueciSenha}`}>
            <div style={{width: "49%", display: "flex", justifyContent: "flex-end"}}>
              <MeuModal tipo={"EMAIL"}/>
            </div>
            <div style={{width: "49%", display: "flex", justifyContent: "flex-end"}}>
              <MeuModal tipo={"SENHA"}/>
            </div>
          </div>

          <div className={`${styles.buttonEdit}`}>
              <Button
                cor="#EBE9E2"
                corFont="#9E184B"
                text={"Cadastrar"}
                width={"45%"}
                onClick={(e) => handleCadastrar(e)}
              />
              <Button
                cor="#9E184B"
                corFont="#EBE9E2"
                text={"Acessar"}
                width={"45%"}
                onClick={(e) => handleLogar(e)}
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
export default Login;
