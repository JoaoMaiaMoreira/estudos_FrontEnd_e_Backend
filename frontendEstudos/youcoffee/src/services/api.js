import axios from "axios";

import {
  toastErroConexao,
  toastLoginExpirado,
  toastSuccess,
  toastWarn,
} from "../utils/Toast";

const backend = axios.create({
  // baseURL: "http://192.168.3.101:8080/api",
  // baseURL: "http://192.168.24.41:8080/api",
  // baseURL: "http://192.168.25.136:8080/api"
  // baseURL: "http://192.168.1.42:8080/api"
  // baseURL: "http://192.168.25.72:8080/api",
  baseURL: "http://192.168.24.129:8080/api",
});

async function get(url) {
  armazenarToken(url);

  try {
    return await backend.get(url);
  } catch (e) {
    if (e.response?.status === 403) {
      toastLoginExpirado();
      setTimeout(() => {
        window.location.href = "http://192.168.24.41:3000";
        return null;
      }, 2000);
    } else if (e.response?.status === 400) {
      toastWarn(e.response?.data?.erros[0]);
      return null;
    } else {
      toastErroConexao();
      return null;
    }
  }
}

async function post(url, corpo) {
  armazenarToken(url);
  try {
    return await backend.post(url, corpo);
  } catch (e) {
    if (e.response?.status === 403) {
      toastLoginExpirado();
      setTimeout(() => {
        window.location.href = "http://192.168.24.41:3000";
        return null;
      }, 2000);
    } else if (e.response?.status === 400) {
      toastWarn(e.response?.data?.erros[0]);
      return null;
    } else {
      toastErroConexao();
      return null;
    }
  }
}

export async function login(login, senha) {
  const corpoRequisicao = {
    login: login,
    senha: senha,
  };
  const respostaDoBackend = await post("/auth/login", corpoRequisicao);
  localStorage.setItem("token", respostaDoBackend?.data?.token);
  if (respostaDoBackend) toastSuccess("Login bem sucedido!");
  return respostaDoBackend;
}

function armazenarToken(url) {
  if (url.includes("/auth")) {
    delete backend.defaults.headers.common["Authorization"];
  } else {
    const novoToken = localStorage.getItem("token");
    backend.defaults.headers.Authorization = "Bearer " + novoToken;
  }
}

export async function cadastro(nome, email, senha) {
  const corpoRequisicao = {
    nomeCompleto: nome,
    login: email,
    senha: senha,
  };

  const respostaDoBackend = await post("/auth/registrar", corpoRequisicao);
  if (respostaDoBackend) toastSuccess("Cadastro Realizado!");
  return respostaDoBackend;
}

export async function enviarEmail(email, solicitacao) {
  const corpoRequisicao = {
    email: email,
    solicitacao: solicitacao,
  };

  const respostaDoBackend = await post("/auth/email", corpoRequisicao);
  if (respostaDoBackend) {
    toastSuccess(
      `Email de ${
        solicitacao === "CONFIRMAR_EMAIL"
          ? "verificação de email"
          : "redefinição de senha"
      } enviado, verifique sua caixa de entrada`
    );
  }
  return respostaDoBackend;
}

export async function confirmarEmail(token) {
  const corpoRequisicao = {
    token: token,
  };

  const respostaDoBackend = await post(
    "/auth/confirmar-email",
    corpoRequisicao
  );

  if (respostaDoBackend) toastSuccess("Email verificado!");

  return respostaDoBackend;
}

export async function buscarNomeUsuario() {
  const respostaDoBackend = await get(`/usuarios`);
  return respostaDoBackend;
}

export async function tamanhoCoffee(solicitacao) {
  const respostaDoBackend = await get(
    `/tamanhos-youcoffee?solicitacao=${solicitacao}`
  );
  return respostaDoBackend;
}

export async function diretorias() {
  const respostaDoBackend = await get(`/diretorias`);
  return respostaDoBackend;
}

export async function locais() {
  const respostaDoBackend = await get(`/locais-evento`);
  return respostaDoBackend;
}

export async function alimentosDado() {
  const respostaDoBackend = await get(`/alimentos`);

  return respostaDoBackend;
}

//enviar todas as escolhas para o backend

export async function enviarPedido(pedido) {
  const respostaDoBackend = await post("/pedidos", pedido);
  if (respostaDoBackend) toastSuccess("Pedido Realizado!");
  return respostaDoBackend;
}

export async function redefinirSenha(senha, token) {
  const corpoRequisicao = {
    novaSenha: senha,
    token: token,
  };

  const respostaDoBackend = await post(
    "/auth/redefinir-senha",
    corpoRequisicao
  );

  if (respostaDoBackend) toastSuccess("Senha atualizada!");
  return respostaDoBackend;
}

export async function buscarPedidos(id) {
  const respostaDoBackend = await get(`/pedidos/${id}`);
  return respostaDoBackend;
}

export async function pegarFeedback(id) {
  const respostaDoBackend = await get(`/pedidos/feedback?pedido=${id}`);
  return respostaDoBackend;
}

export async function buscarTabela(pagina) {
  const respostaDoBackend = await get(
    `/pedidos?pagina=${pagina}&&itens-por-pagina=10`
  );
  return respostaDoBackend;
}

export async function mandarFeedback(descricao, tipoFeedback, idPedido) {
  const corpoRequisicao = {
    descricao: descricao,
    tipoFeedback: tipoFeedback,
    idPedido: idPedido,
  };
  const respostaDoBackend = await post("/pedidos/feedback", corpoRequisicao);
  if (respostaDoBackend) toastSuccess("Feedback realizado!");
  return respostaDoBackend;
}
