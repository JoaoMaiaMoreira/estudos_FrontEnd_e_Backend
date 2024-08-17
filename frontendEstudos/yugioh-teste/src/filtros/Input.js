function Input({ type, name, placeholder, handleOnChange, value }) {
  return (
    <div>
      <label htmlFor="name"></label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default Input;
