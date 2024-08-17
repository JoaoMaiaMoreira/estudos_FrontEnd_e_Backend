import styles from "./button.module.css";

function Button({ text, onClick, cor, corFont, width}) {
  return (
    <>
      <button
        style={{ backgroundColor: cor, color: corFont, width: width && width }}
        className={`${styles.button}`}
        onClick={onClick}
      >
        {" "}
        {text}
      </button>
    </>
  );
}

export default Button;
