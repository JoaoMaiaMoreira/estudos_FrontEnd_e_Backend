import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carregando from "./Carregando";

function Informacoes() {
  // const id = useParams();
  const location = useLocation();

  const [Loading, setLoading] = useState(false);

  const id = location.pathname.split("/").pop();

  console.log("ta chegando na pagina 2", id);

  const [cartaExibida, setcartaExibida] = useState({});

  console.log("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id);

  useEffect(() => {
    console.log("oi");
    buscarCarta();
  }, []);

  async function buscarCarta() {
    setLoading(true);
    const respostaCartas = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respostaCartaLista = await respostaCartas.json();
    console.log("object :>> ", respostaCartaLista);
    setcartaExibida(respostaCartaLista.data[0]);
    console.log("v :>> ", cartaExibida);
    setLoading(false);
  }

  function Carta() {
    return (
      <section>
        <p>{cartaExibida?.name}</p>
        <div>
          {" "}
          <img
            src={
              cartaExibida?.card_images?.length
                ? cartaExibida?.card_images[0].image_url
                : ""
            }
            width={"25%"}
            height={"25%"}
          />{" "}
        </div>
        <p>{cartaExibida?.desc}</p>
        <p>Id: {cartaExibida?.id}</p>
        <p>
          Edicao:{" "}
          {cartaExibida?.card_sets?.length
            ? cartaExibida?.card_sets[0].set_name
            : ""}{" "}
        </p>

        <p>
          Numero:{" "}
          {cartaExibida?.card_sets?.length
            ? cartaExibida?.card_sets[0].set_code
            : ""}{" "}
        </p>

        <p>
          Raridade:{" "}
          {cartaExibida?.card_sets?.length
            ? cartaExibida?.card_sets[0].set_rarity
            : ""}{" "}
        </p>
      </section>
    );
  }

  return <div>{Loading ? <Carregando /> : <Carta />}</div>;
}

export default Informacoes;
