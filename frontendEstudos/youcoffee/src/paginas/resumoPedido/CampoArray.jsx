function CampoArray({ titulo, itens }) {
  return (
    <div style={{marginTop: "45px"}}>
      <h3 style={{fontSize: "18px", marginBottom: "3px", marginTop: 0}}>{titulo}</h3>
      {itens?.map((item, index) => (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginTop: "6px"}} key={index}>
          <p style={{fontSize: "16px",  width:"49%", marginBottom: 0, marginTop: "6px"}}>{item.nomeAlimento}</p>
          <p style={{fontSize: "16px", fontWeight: "bold", width: "49%", marginBottom: 0, marginTop: "6px"}}>{item.quantidade} {item.quantidade === 1 ? "unidade" : "unidades"}</p>
        </div>
      )

      )}
    </div>
  );
}

export default CampoArray;
