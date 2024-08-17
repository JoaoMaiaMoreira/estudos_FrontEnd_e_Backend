import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Deck.module.css";
import Select from "../filtros/Select";
import Input from "../filtros/Input";
import {
  IoSearchOutline,
  IoTrashOutline,
  IoAddCircleSharp,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Carregando from "./Carregando";
// import Modal from "../filtros/Modal";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

import styleModal from "./Deck.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

function Deck() {
  const [cartasExibidas, setCartasExibidas] = useState([]);
  const [cartas, setCartas] = useState([]);
  const [tipoCard, setTipoCard] = useState([]);
  const [nomeCard, setNomeCard] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [escolha, setEscolha] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [cartasAdicionadas, setCartasAdicionadas] = useState([]);

  // navigate ai de baixo vai me auxiliar quando clicar me
  // encaminhar para outra pagina, que nela contem as informacoes de tal carta

  const navigate = useNavigate();

  // passei para cima para ser global a ideia é que quuando clicar no botao abra a informacoes do modal

  useEffect(() => {
    buscarCartas();
  }, []);

  useEffect(() => {
    console.log("tipos :>> ", tipos);
  }, [tipos]);

  async function buscarCartas() {
    const respostaCartas = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let respostaCartaLista = await respostaCartas.json();

    respostaCartaLista = respostaCartaLista.data.slice(0, 99);
    <IoSearchOutline />;
    console.log("respostaCartaLista :>> ", respostaCartaLista.length);
    const tiposRecebidos = respostaCartaLista?.map((carta) => carta?.type);

    const tiposSemRepetir = tiposRecebidos.filter((valor, indice) => {
      return tiposRecebidos.indexOf(valor) === indice;
    });

    setLoading(true);
    setTipos(["Todos", ...tiposSemRepetir]);
    setCartas(respostaCartaLista);
    setCartasExibidas(respostaCartaLista);
    //   {
    //     if(cartasExibidas === 0)
    //      setCartasExibidas(cartas);
    //     else{
    //         setCartasExibidas( cartas.filter((valor, indice, self) => {
    //                 return self.indexOf(valor) === indice;
    //            }));
    //     }{

    //   }

    // if(cartasExibidas = 0){
    //     setCartasExibidas = cartas
    // } else{
    //     setCartasExibidas = cartas.filter((valor, indice, self) => {
    //         return self.indexOf(valor) === indice;
    //       });
    // }
  }

  function filtrarCartas(filtro) {
    console.log("Ta filtrando: ", filtro);

    if (filtro === "Todos") {
      setTipoCard(cartas);
    } else {
      const cartasFiltradas = cartas.filter((valor, indice) => {
        return valor.type === filtro;
      });
      // setCartasExibidas(cartasFiltradas);
      setTipoCard(cartasFiltradas);
    }
    // aqui é da escolha do tipo de carta
  }

  function filtrarImagem(escolha) {
    console.log(escolha);
    setEscolha(escolha);
    // Aqui é o texto do input
  }

  function pesquisarTextoTipo(e) {
    e.preventDefault();
    console.log("chegou");
    console.log("escolha :>> ", escolha);

    const filtrandoCartas = cartas.filter((valor, indice) => {
      console.log("valor :>> ", valor);
      return valor.name.includes(escolha);
    });
    // setCartasExibidas(filtrandoCartas);
    setNomeCard(filtrandoCartas);

    if (nomeCard.length > 0) {
      const filtroDosTipos = tipoCard.filter((valor, indice) => {
        console.log("valor :>> ", valor);
        return valor.name.includes(escolha);
      });
      setCartasExibidas(filtroDosTipos);
      console.log("filtroDosTipos :>> ", filtroDosTipos);
    } else {
      setCartasExibidas(tipoCard);
    }
  }

  function informacoes(id) {
    console.log(id);
    navigate(`/informacoes/${id}`);
  }

  function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen}>Deck</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={`${styleModal.containerCartas}`}>
              {console.log("cartasAdicionadas :>> ", cartasAdicionadas)}
              {cartasAdicionadas.map((carta) => (
                <section className={`${styleModal.section}`}>
                  <div className={`${styleModal.img}`}>
                    <img
                      key={carta.id}
                      src={carta.image_url}
                      width={"70%"}
                      height={"70%"}
                      alt={`Carta`}
                    />
                  </div>
                  <button
                    className={`${styleModal.button}`}
                    onClick={() => BanCard(carta.id)}
                  >
                    <IoTrashOutline />
                  </button>
                </section>
              ))}
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  function BanCard(id) {
    // adicionadaComBan = cartasAdicionadas.filter((valor, indice) => {
    //   console.log("valor :>> ", valor);
    //   return valor.name.includes(escolha);

    setCartasAdicionadas((prevCartas) =>
      prevCartas.filter((carta) => carta.id !== id)
    );
  }

  function AdicionarModal(card) {
    setCartasAdicionadas((prevCartas) => [...prevCartas, card]);
    console.log("Adicionando na modal", card);
  }

  return (
    <div className={`${styles.deck}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          width: "100%",
        }}
      >
        <BasicModal />
        <h1 style={{ textAlign: "center" }}>DeckList</h1>
      </div>
      <div className={`${styles.deck_separa}`}>
        <Select
          name="TypeCard"
          Text="Tipo de carta para filtrar"
          options={tipos}
          handleOnChange={(tipo) => filtrarCartas(tipo)}
        />

        <button
          className={`${styles.deck_button}`}
          onClick={(e) => pesquisarTextoTipo(e)}
        >
          {" "}
          <IoSearchOutline />{" "}
        </button>

        <div className={`${styles.deck_input}`}>
          <Input
            type="text"
            placeholder="Nome da Carta"
            id="InputEscolha"
            name="InputEscolha"
            handleOnChange={(e) => filtrarImagem(e)}
          />
        </div>
      </div>

      <Link to="/" style={{ textAling: `left` }}>
        voltar
      </Link>

      <div className={`${styles.containerCartas}`}>
        {cartasExibidas.map((card) => (
          <section className={`${styles.section}`}>
            <div className={`${styles.img}`}>
              <div>
                {" "}
                {/* <Button onClick={handleOpen} > */}
                <img
                  onClick={(e) => informacoes(card.id)}
                  src={card.card_images[0].image_url}
                  alt={card.id}
                  width={"100%"}
                  height={300}
                />{" "}
                {/* </Button> */}
              </div>
            </div>
            <p>{card.name}</p>
            <button
              className={`${styles.deck_button2}`}
              onClick={(e) => AdicionarModal(card.card_images[0])}
            >
              <IoAddCircleSharp />
            </button>
          </section>
        ))}
        {!Loading && <Carregando />}
      </div>
    </div>
  );
}

export default Deck;
