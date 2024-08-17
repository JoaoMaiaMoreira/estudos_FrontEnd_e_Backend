import { IoExitOutline } from "react-icons/io5";
import youxLogo from "../imagens/youxLogo.png";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useState, useEffect } from "react";
import { buscarNomeUsuario } from "../services/api";
import { useDispatch } from "react-redux";
import { setDadoGeral, setDadosAlimentos } from "../redux/pedidos/action";

function Header() {
  
  const [nome, setNome] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    NomeUsuario();
  }, []);

  async function NomeUsuario() {
    try {
      const resposta = await buscarNomeUsuario();
      if(resposta?.status === 200) {
        const primeiroNome = resposta?.data?.nomeCompleto?.split(" ");
        const minusculas = primeiroNome[0].toLowerCase();
        setNome(minusculas[0].toUpperCase() + minusculas.substring(1));
      }
    } catch (e) {
    }
  }
  
  function limparTudoESair(e, path) {
    e.preventDefault()
    dispatch(setDadoGeral({}));
    dispatch(setDadosAlimentos({}));
    navigate(path);
  }

  return (
    <div>
      <div className={`${styles.header}`}>
        <img
        className={styles.clickable}
          alt="logo_youx"
          src={youxLogo}
          onClick={(e) => {e.preventDefault(); navigate("/historico")}}
        />
        <ul>
          <li style={{ fontSize: "28px" }}>{nome}</li>
          <li
            style={{ fontSize: "33px"}}
            className={styles.clickable}
            onClick={(e) => {
              limparTudoESair(e, "/")
            }}
          >
            <IoExitOutline />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
