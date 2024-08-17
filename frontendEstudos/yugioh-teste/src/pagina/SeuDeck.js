import { useState, useEffect } from "react";
import Carregando from "./Carregando";

function SeuDeck(props) {
  const [Loading, setLoading] = useState(false);
  const [dadoRecebido, setDadoRecebido] = useState(null);

  useEffect(() => {
    setDadoRecebido(props.dadoRecebido);
  }, [props.dadoRecebido]);

  console.log("ta chegando na pagina 2", dadoRecebido);

  const [deckUsuario, setDeckUsuario] = useState([]);

  //   useEffect(() => {
  //     buscarCarta();
  //   }, []);

  //   async function buscarCarta() {
  //     setLoading(true);
  //     const respostaCartas = await fetch(
  //       "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const respostaCartaLista = await respostaCartas.json();
  //     console.log("API >>>", respostaCartaLista.data[0]);
  //     setDeckUsuario(respostaCartaLista.data[0]);
  //     console.log("DeckUsuario >>>", deckUsuario);
  //     setLoading(false);
  //   }

  //   function Carta() {
  //     const arrayDeck = Array.isArray(deckUsuario) ? deckUsuario : [deckUsuario];
  //     console.log("arrayDeck :>> ", arrayDeck);

  //     if (arrayDeck.length === 0) {
  //       return <p>Erro</p>;
  //     }

  return (
    <div>
      <p>Ta passando {dadoRecebido}</p>

      {/* {arrayDeck.map((card, index) => (
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
        ))} */}
    </div>
  );
}

//   return <div>{Loading ? <Carregando /> : <Carta />}</div>;

export default SeuDeck;
