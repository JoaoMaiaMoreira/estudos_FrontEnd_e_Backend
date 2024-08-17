import PedidosActionTypes from "./action-types";

const inicialState = {
  dadosPedidos: {},
  dadosPedidosAlimentos: {},
};

const pedidoReducer = (state = inicialState, action) => {
  switch (action.type) {
    case PedidosActionTypes.DADOSGERAIS:
      return { ...state, dadosPedidos: action.payload };
    case PedidosActionTypes.DADOSALIMENTOS:
      return {
        ...state,
        dadosPedidosAlimentos: action.payload,
      };
    default:
      return state;
  }
};

export default pedidoReducer;
