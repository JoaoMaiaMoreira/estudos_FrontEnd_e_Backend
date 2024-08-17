import { Link } from "react-router-dom";

function Inicio() {
  // const [temaDark, setTemaDark] = useState(false);

  // function tema(e) {
  //   e.preventDefault();
  //   console.log("Cor");
  //   setTemaDark(!temaDark);
  // }

  return (
    <div>
      <p>DeckList Yu-Gi-Oh!</p>
      <Link to="/deck"> Cartas </Link>
      {/* <button onClick={(e) => tema(e)}>Dark theme</button> */}

      <div>
        <Link to="seuDeck"> Seu Deck</Link>
      </div>
    </div>
  );
}

export default Inicio;
