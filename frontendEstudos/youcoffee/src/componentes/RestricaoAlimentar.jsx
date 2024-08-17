import { LuAlertCircle } from "react-icons/lu";
import Radio from "./Radio";
import { useState } from "react";
import InputForm from "./InputForm";
import styles from "../paginas/formularios/FormularioAlimentos.module.css";

function RestricaoAlimentar({
  quais,
  onChange,
  onChangeSet,
  restricoesAlimentar,
}) {
  return (
    <div>
      <h1>
        Há restrições alimentares?
        {quais && (restricoesAlimentar === "" || !restricoesAlimentar) && (
          <span style={{ marginLeft: "5px", color: "red" }}>
            <LuAlertCircle />
          </span>
        )}
      </h1>
      <ul style={{ display: "flex", margin: 0, padding: 0 }}>
        <li>
          <Radio
            name="restricao"
            texto={"Sim"}
            type="radio"
            value="SIM"
            checked={quais}
            onChange={onChange}
          />
        </li>
        <li style={{ marginLeft: "7px" }}>
          <Radio
            texto={"Não"}
            name="restricao"
            type="radio"
            value="NAO"
            checked={!quais}
            onChange={onChange}
          />
        </li>
      </ul>

      {quais && <p>Quais?</p>}

      {quais && (
        <div className={`${styles.inputAlimento}`}>
          <InputForm
            type="text"
            cor="white" // exibir o input "quais" se a variavel "quais" for true
            borderRadius={"10px"}
            borderColor={"1px solid #A0A0A0"}
            placeholder={"Especifique as restrições"}
            value={restricoesAlimentar}
            onChange={onChangeSet}
            max={255}
          />
        </div>
      )}
    </div>
  );
}

export default RestricaoAlimentar;
