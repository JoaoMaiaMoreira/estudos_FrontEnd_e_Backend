import PedidoFinalActionTypes from "./action-type";

const inicialState = {
  pedidoFinal: {},
};

const finalPedidoReducer = (state = inicialState, action) => {
  switch (action.type) {
    case PedidoFinalActionTypes.DADOSFINAIS:
      return { ...state, pedidoFinal: action.payload };
    default:
      return state;
  }
};

export default finalPedidoReducer;
