import styles from "./input.module.css";

function Input({
  label,
  type,
  id,
  placeholder,
  value,
  handleOnchange,
  cor,
  borderRa,
  borda,
  texto,
  max
}) {
  return (
    <>
      <input
        style={{
          borderRadius: borderRa,
          border: borda,
          backgroundColor: cor,
        }}
        className={`${styles.input}`}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnchange}
        maxLength={max}
      />
    </>
  );
}

export default Input;
