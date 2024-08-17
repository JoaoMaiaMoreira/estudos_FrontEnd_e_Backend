import Inicio from "./pagina/Inicio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Deck from "./pagina/Deck";
import Informacoes from "./pagina/Informacoes";
import UserDeck from "./pagina/UserDeck";
import SeuDeck from "./pagina/SeuDeck";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/deck" element={<Deck />} />
          <Route exact path="/informacoes/:id" element={<Informacoes />} />
          <Route exact path="/userDeck/:id" element={<UserDeck />} />
          <Route exact path="/seuDeck" element={<SeuDeck />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
