import { Link } from "react-router-dom";
function Rota() {
  return (
    <nav>
      <div>
        <li>
          <Link to="/">Tela inicial</Link>
        </li>

        <li>
          <Link to="/deck"> Cartas </Link>
        </li>

        <li>
          <Link to="/informacoes/:id"> Informacoes</Link>
        </li>

        <li>
          <Link to="/userDeck/:id"> userDeck</Link>
        </li>

        <Link to="/seuDeck">Seu deck</Link>
      </div>
    </nav>
  );
}

export default Rota;
