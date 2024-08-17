import styles from "./inputForm.module.css";

function InputForm({
  id,
  placeholder,
  value,
  onChange,
  disabled,
  borderRadius,
  borderColor,
  max
}) {
  return (
    <input
      style={{ borderRadius: borderRadius, border: borderColor }}
      className={`${styles.inputForm}`}
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={max}
    />
  );
}

export default InputForm;
