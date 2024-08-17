import { combineReducers } from "redux";

import pedidoReducer from "./pedidos/reducer";

const rootReducer = combineReducers({ dadosTotalPedidos: pedidoReducer });

export default rootReducer;
