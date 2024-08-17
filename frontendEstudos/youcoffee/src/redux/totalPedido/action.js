import PedidoFinalActionTypes from "./action-type";

export const setDadoFinal = (dadoFinal) => ({
  type: PedidoFinalActionTypes.DADOSFINAIS,
  payload: dadoFinal,
});
