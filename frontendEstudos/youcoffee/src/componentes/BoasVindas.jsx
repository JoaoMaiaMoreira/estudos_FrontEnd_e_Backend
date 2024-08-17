import styles from "./boasVindas.module.css";
import xicara from "../imagens/xicaraCafe.png";

function BoasVindas() {
  return (
    <div className={`${styles.boasVindas}`}>
      <section className={`${styles.section}`}>
        <img
          src={xicara}
          alt="Xicara de café"
          className={`${styles.imagemLogoYoux}`}
        />

        <p>
          {" "}
          Olá, YouXer! Como vai? <br />
          Bora tornar seus coffee breaks mais especiais? Aqui estão algumas
          dicas rápidas, se liga ai! <br /> Antecedência é essencial: Faça seu
          pedido com pelo menos 24 horas de antecedência para garantirmos a
          qualidade que você merece! Tudo fresquinho na hora certa! <br />{" "}
          Feedback é crucial: Após o evento, compartilhe sua opinião para
          aprimorarmos nossos serviços.{" "}
        </p>
      </section>
    </div>
  );
}

export default BoasVindas;
