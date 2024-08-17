import { Box, Modal } from "@mui/material";
import { useState } from "react";
import styles from "./meuModal.module.css";
import Input from "./Input";
import Button from "./Button.jsx";
import { enviarEmail } from "../services/api.js";
import "react-toastify/dist/ReactToastify.css";
import { toastWarn } from "../utils/Toast.jsx";
import Loading from "./Loading.jsx";

function MeuModal({tipo}) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function abrirModal() {
    setOpen(true);
  }

  function FecharModal() {
    setOpen(false);
  }

  async function mandarEmail() {
    setLoading(true)
    if(email !== "" && email){
      try {
        const solicitacao = tipo.toUpperCase() === "SENHA" ? "REDEFINIR_SENHA" : tipo.toUpperCase() === "EMAIL" ? "CONFIRMAR_EMAIL" : "ERRO";
        const resposta = await enviarEmail(email, solicitacao);
        if(resposta) setOpen(false);
      } catch (e) {
        toastWarn(e?.response?.data?.erros[0]);
      }
    } else {
      toastWarn("Preencha o campo 'E-mail'")
    }
    setLoading(false)
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div>
      <Loading open={loading}/>
      <span
        style={{ cursor: "pointer", fontSize: "14px", color: "#9E184B" }}
        onClick={abrirModal}
      >
        {" "}
        {tipo.toUpperCase() === "SENHA" ? "Esqueci senha" : tipo.toUpperCase() === "EMAIL" ? "Verificar e-mail" : "ERRO"}
      </span>
      <Modal open={open} onClose={FecharModal}>
        
          <Box className={`${styles.box}`}>
            <h1>{tipo.toUpperCase() === "SENHA" ? "Redefinir Senha" : tipo.toUpperCase() === "EMAIL" ? "Verificar E-mail" : "ERRO"}</h1>
            <p>
              Para {tipo.toUpperCase() === "SENHA" ? "redefinir sua senha" : tipo.toUpperCase() === "EMAIL" ? "verificar seu e-mail" : "ERRO"} informe o e-mail cadastrado no
              YouCoffee.
            </p>
            <p>
              Enviaremos um link com as instruções necessárias para seu e-mail.
            </p>

            <h2>E-mail:</h2>
            <div style={{display: "flex", width: "90%", marginLeft: "5%", marginRight: "5%", justifyContent: "flex-start"}}>
              <div className={`${styles.inputModal}`}>
                <Input
                  type={"email"}
                  id={"redefinirSenha"}
                  handleOnchange={(e) => handleEmail(e)}
                  cor={"#F2F4F8"}
                  borda={"2px solid #9E184B"}
                  borderRa={"100px"}
                  placeholder={"Digite seu email YouX"}
                  max={64}
                />
              </div>
            </div>
            <div className={`${styles.modalButton}`}>
              <Button
                cor="#F2F4F8"
                corFont="#9E184B"
                text={"Cancelar"}
                onClick={(e) => FecharModal(e)}
              />
              <Button
                cor="#9E184B"
                corFont="#EBE9E2"
                text={"enviar"}
                onClick={(e) => mandarEmail(e)}
              />
            </div>
          </Box>
        
      </Modal>
    </div>
  );
}

export default MeuModal;
