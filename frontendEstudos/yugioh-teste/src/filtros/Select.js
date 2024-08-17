import styles from "./Select.module.css";

function Select({ name, options, handleOnChange }) {
  // const [categoriaSelect, setCategoriaSelect] = useState([])

  return (
    <div className={styles.sele}>
      <select
        name={name}
        id={name}
        onChange={(tipo) => handleOnChange(tipo.target.value)}
      >
        {/* onChange={(e) => setCategoriaSelect(e.target.value)} */}
        {/* <option value="Todas">Todas</option> */}
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
