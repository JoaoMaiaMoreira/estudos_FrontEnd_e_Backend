function Campo({ titulo, item }) {
  return (
    <div style={titulo != 'Quais?' ? {marginTop: "45px"} : {marginTop: "3px"}}>
      <h3 style={{fontSize: "18px", marginBottom: "3px", marginTop: 0}}>{titulo}</h3>
      <p style={{fontSize: "16px", marginTop: "3px", marginBottom: 0}}>{item}</p>
    </div>
  );
}

export default Campo;
