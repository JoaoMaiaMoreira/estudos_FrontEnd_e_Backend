import { useState } from "react";
import InputForm from "./InputForm";
import styles from "../paginas/formularios/FormularioAlimentos.module.css";

function Observacoes({ value, onChange }) {
  return (
    <div className={`${styles.inputAlimento}`}>
      <InputForm
        type="text"
        placeholder={
          "Comentários, solicitações, opções para reposição de alimentos que possam não ter nos estabelecimentos, etc."
        }
        borderRadius={"10px"}
        borderColor={"1px solid #A0A0A0"}
        value={value}
        onChange={onChange}
        max={255}
      />
    </div>
  );
}

export default Observacoes;
