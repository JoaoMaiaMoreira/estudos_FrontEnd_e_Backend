import "./App.css";
import Login from "./paginas/Autentificacao/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./paginas/Autentificacao/Cadastro";
import FormularioAlimentos from "./paginas/formularios/FormularioAlimentos";
import RedefinirSenha from "./paginas/Autentificacao/RedefinirSenha";
import ConfirmacaoEmail from "./paginas/Autentificacao/ConfirmacaoEmail";
import FormularioDadosGerais from "./paginas/formularios/FormularioDadosGerais";
import Header from "./componentes/Header";
import BoasVindas from "./componentes/BoasVindas";
import { ToastContainer } from "react-toastify";
import ResumoPedido from "./paginas/resumoPedido/ResumoPedido";
import Historico from "./paginas/historico/Historico";
import VisualizarPedido from "./paginas/resumoPedido/VisualizarPedido";
import FormularioPadrao from "./paginas/formularios/FormularioPadrao";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose="3000" />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/quero-me-cadastrar" element={<Cadastro />} />
          <Route
            exact
            path="/definir-nova-senha"
            element={<RedefinirSenha />}
          />

          <Route
            exact
            path="/formulario-alimentos"
            element={
              <>
                <Header />
                <BoasVindas />
                <FormularioAlimentos />
              </>
            }
          />
          <Route
            exact
            path="/formulario-dados-gerais"
            element={
              <>
                <Header />
                <BoasVindas />
                <FormularioDadosGerais />
              </>
            }
          />

          <Route exact path="/confirmar-email" element={<ConfirmacaoEmail />} />

          <Route
            exact
            path="/historico"
            element={
              <>
                <Header />
                <Historico />
              </>
            }
          />

          <Route
            exact
            path="/resumo-do-pedido"
            element={
              <>
                <Header />
                <ResumoPedido />
              </>
            }
          />

          <Route
            exact
            path="/visualizar-pedido/:id"
            element={
              <>
                <Header />
                <VisualizarPedido />
              </>
            }
          />

          <Route
            exact
            path="/pedido-padrao"
            element={
              <>
                <Header /> <BoasVindas /> <FormularioPadrao />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
