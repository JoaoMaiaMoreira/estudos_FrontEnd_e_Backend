import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmarEmail } from "../../services/api";
import Loading from "../../componentes/Loading";
import { toastError, toastWarn } from "../../utils/Toast";

function ConfirmacaoEmail() {
  const [token, setToken] = useState("");
  const [primeiraRender, setPrimeiraRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    if (location?.search) {
      setToken(location?.search?.split("=")[1]);
    }
    setPrimeiraRender(true)
  }, []);

  useEffect(() => {
    if(primeiraRender) verificarEmail();
  }, [primeiraRender]);

  async function verificarEmail() {
    setPrimeiraRender(false)
    try {
      const resposta = await confirmarEmail(token);
      if(resposta) navigate(`/`);
      if(!resposta) toastWarn("Recarregue a pagina para tentar novamente")
    } catch(e) {
        toastError("Erro ao validar e-mail, verifique se é o ultimo link recebido por e-mail")
    }
    setLoading(false)
  }

  return <Loading open={loading}/>;
}

export default ConfirmacaoEmail;
