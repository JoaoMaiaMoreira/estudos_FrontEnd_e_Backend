import { IoAlertCircleOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import styles from "./senhaContem.module.css";

function SenhaContem({
  temNumero,
  temLetraMaiuscula,
  temLetraMinuscula,
  temOito,
}) {
  return (
    <div>
      <p style={{ fontSize: "16px", margin: "1px" }}>
        <IoAlertCircleOutline /> Sua senha deve conter:
      </p>
      <div className={`${styles.pai}`}>
        {!temNumero ? (
          <div className={`${styles.circulo}`}>
            <span>
              <FaCircle />
            </span>
            <p>Um Numero</p>
          </div>
        ) : (
          <div className={`${styles.check}`}>
            <span>
              {" "}
              <FaCheck />{" "}
            </span>{" "}
            <p> Um numero</p>
          </div>
        )}

        {!temLetraMaiuscula ? (
          <div className={`${styles.circulo}`}>
            <span>
              {" "}
              <FaCircle />{" "}
            </span>{" "}
            <p> Uma letra maiúscula</p>
          </div>
        ) : (
          <div className={`${styles.check}`}>
            <span>
              {" "}
              <FaCheck />{" "}
            </span>
            <p> Uma letra maiúscula</p>
          </div>
        )}

        {!temLetraMinuscula ? (
          <div className={`${styles.circulo}`}>
            <span>
              {" "}
              <FaCircle />{" "}
            </span>{" "}
            <p> Uma letra minúscula</p>
          </div>
        ) : (
          <div className={`${styles.check}`}>
            <span>
              {" "}
              <FaCheck />{" "}
            </span>
            <p> Uma letra minúscula</p>
          </div>
        )}

        {!temOito ? (
          <div className={`${styles.circulo}`}>
            <span>
              <FaCircle />
            </span>
            <p> 8 caracteres</p>
          </div>
        ) : (
          <div className={`${styles.check}`}>
            <span>
              <FaCheck />
            </span>
            <p>8 caracteres</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SenhaContem;
