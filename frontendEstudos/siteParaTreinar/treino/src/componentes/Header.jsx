function Header() {
  const headerCoisas = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT",
    "RIDESHARE",
    "STARSHIELD",
    "STARLINK",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        background: "transparent",
      }}
    >
      {headerCoisas.map((frase) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a style={{ fontSize: "14px" }}>{frase}</a>;
          </div>
        );
      })}
    </div>
  );
}

export default Header;
