import { toast } from "react-toastify";

export function toastSuccess(texto) {
  return toast.success(texto, {
    position: "top-center",
  });
}

export function toastError(texto) {
  return toast.error(texto, {
    position: "top-center",
  });
}

export function toastWarn(texto) {
  if(!toast.isActive("TOAST_WARN")) {
  return toast.warn(texto, {
    position: "top-center", toastId: "TOAST_WARN"
  });
}
}

export function toastInfo(texto) {
  return toast.info(texto, {
    position: "top-center",
  });
}

export function toastErroConexao() {
  if(!toast.isActive("TOAST_ERRO_CONEXAO")) {
    return toast.error("Ocorreu um erro, verifique sua conexão e tente novamente", {
      position: "top-center", toastId: "TOAST_ERRO_CONEXAO"
    });
  }
}

export function toastLoginExpirado() {
  if(!toast.isActive("TOAST_LOGIN_EXPIRADO")) {
    return toast.warn("Login Expirou!", {
      position: "top-center", toastId: "TOAST_LOGIN_EXPIRADO"
    });
  }
}

export function toastPerdaDadosRedux() {
  if(!toast.isActive("TOAST_PERDA_REDUX")) {
    return toast.error("As informações foram perdidas, verifique sua conexão com a internet, e preencha as informações novamente", {
      position: "top-center", toastId: "TOAST_PERDA_REDUX"
    });
  }
}
