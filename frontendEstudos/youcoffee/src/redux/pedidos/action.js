import PedidosActionTypes from "./action-types";

export const setDadoGeral = (dadosGerais) => ({
  type: PedidosActionTypes.DADOSGERAIS,
  payload: dadosGerais,
});

export const setDadosAlimentos = (dadosAlimentos) => ({
  type: PedidosActionTypes.DADOSALIMENTOS,
  payload: dadosAlimentos,
});
