import styles from "./InputSenha.module.css";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

function InputSenha({
  type,
  id,
  placeholder,
  value,
  handleOnchange,
  texto,
  olho,
  mudarOlho,
}) {
  return (
    <div className={`${styles.input}`}>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnchange}
        maxLength={50}
      />
      <span style={{ width: "12%", textAlign: "end"}} className={styles.clickable} onClick={mudarOlho}> {olho ? <ImEye /> : <ImEyeBlocked />} </span>
    </div>
  );
}

export default InputSenha;
