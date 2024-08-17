import styles from './checkbox.module.css'

function CheckboxRadio({
  type,
  value,
  text,
  onChange,
  nome,
  key,
  checked,
  id,
  disabled,
  mudarCor,
}) {
  return (
    <label className={!disabled ? styles.clickable: ""} style={{ color: mudarCor , textAlign: "center", display: "flex", alignItems: "center", transition: "150ms linear" }} htmlFor={id}>
      <input className={styles.checkbox}
        checked={checked}
        type={type}
        value={value}
        onChange={onChange}
        name={nome}
        key={key}
        id={id}
        disabled={disabled}
      />
      <p style={{textAlign: "left", margin: 0}}>{text}</p>
    </label>
  );
}

export default CheckboxRadio;
