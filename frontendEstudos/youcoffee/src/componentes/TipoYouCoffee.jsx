import Radio from "./Radio";
import styles from "../paginas/formularios/FormularioAlimentos.module.css";

function TipoYouCoffee({ tamanhoCoffees, handleOnchange, coffeeSelecionado }) {
  return (
    <>
      {tamanhoCoffees?.length > 0 ? (
        tamanhoCoffees?.map((cafe) => {
          return (
            <li key={cafe?.idTamanhoYouCoffee}>
              <Radio
                name="tamanhoYouCoffee"
                texto={cafe?.descricaoTamanhoYouCoffee}
                type="radio"
                value={cafe?.idTamanhoYouCoffee}
                checked={
                  coffeeSelecionado?.idTamanhoYouCoffee ===
                  cafe?.idTamanhoYouCoffee
                }
                onChange={(e) => {
                  handleOnchange(
                    parseInt(e.target.value),
                    cafe?.descricaoTamanhoYouCoffee
                  );
                }}
              />
            </li>
          );
        })
      ) : (
        <div className={styles.atencao}>Aguardando Conexão</div>
      )}
    </>
  );
}

export default TipoYouCoffee;
