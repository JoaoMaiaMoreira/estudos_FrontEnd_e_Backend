import { useState } from "react";

function Titulo({ nome, cor }) {
  const [fala, setFala] = useState("I am back");
  const [inputTxt, setInputTxt] = useState("");

  function clica() {
    setFala(inputTxt);
  }

  const urlImg =
    "https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2018/08/Eminem-696x412.jpg";

  return (
    <div>
      <h1 style={{ color: cor }}>My names is {nome}</h1>

      <input
        value={inputTxt}
        onChange={(e) => {
          setInputTxt(e.target.value);
        }}
        type="text"
      />

      <button onClick={clica}> AAAAAAAAAAAA </button>
      <p style={{ fontSize: 120 }}>{fala}</p>
      <img width={500} src={urlImg} />
    </div>
  );
}

export default Titulo;
