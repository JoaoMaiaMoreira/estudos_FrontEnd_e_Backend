import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carregando from "./Carregando";

function UserDeck() {
  // const id = useParams();

  const location = useLocation();

  const [Loading, setLoading] = useState(false);

  const id = location.pathname.split("/").pop();

  console.log("ta chegando na pagina 2", id);

  const [deckUsuario, setDeckUsuario] = useState([]);

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
    console.log("API >>>", respostaCartaLista.data[0]);
    // const cardImages =
    //   respostaCartaLista.data[0]?.card_images || [];
    // console.log("cardImages >>> ", cardImages);
    setDeckUsuario(respostaCartaLista.data[0]);
    console.log("DeckUsuario >>>", deckUsuario);
    setLoading(false);

    // const deckUsuario = Object.keys(respostaCartaLista.data)
    //   .map((chave) => {
    //     const valor = deckUsuario[chave];

    //     if (typeof valor === "object") {
    //       return Object.values(valor);
    //     }
    //     return valor;
    //   })
    //   .reduce((acc, curr) => acc.concat(curr), []);

    // console.log(deckUsuario);
  }

  function Carta() {
    const arrayDeck = Array.isArray(deckUsuario) ? deckUsuario : [deckUsuario];
    console.log("arrayDeck :>> ", arrayDeck);

    if (arrayDeck.length === 0) {
      return <p>Erro</p>;
    }

    return (
      <div>
        {arrayDeck.map((card, index) => (
          <section key={index}>
            <div>
              {" "}
              <img
                src={
                  card?.card_images?.length
                    ? card?.card_images[0].image_url
                    : ""
                }
                width={"25%"}
                height={"25%"}
                alt={`Carta ${index + 1}`}
              />{" "}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return <div>{Loading ? <Carregando /> : <Carta />}</div>;
}

export default UserDeck;
