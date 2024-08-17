import styles from './radio.module.css'
function Radio({ type, value, onChange, name, texto, id, checked }) {
  return (
    <label className={styles.clickable} style={{textAlign: "center", display: "flex", alignItems: "center"}} htmlFor={id}>
      <input
        className={styles.radio}
        type={type}
        value={value}
        key={value}
        onChange={onChange}
        id={id}
        name={name}
        checked={checked}
      />
      <p style={{textAlign: "left", margin: 0}}>{texto}</p>
    </label>
  );
}

export default Radio;
