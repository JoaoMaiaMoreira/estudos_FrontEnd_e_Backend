import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./modalfeedback.module.css";
import EnviarFeedBack from "./EnviarFeedBack";
import VisualisarFeedback from "./VisualizarFeedback";

function ModalFeedback({ texto, idPedido, conteudo, refreshTabela }) {
  const [open, setOpen] = useState(false);

  const fechar = () => {
    setOpen(false);
  };

  return (
    <>
      <td onClick={() => setOpen(true)} className={styles.clickable}>
        {texto}
      </td>
      <Modal open={open} onClose={fechar}>
        <Box className={`${styles.box}`}>
          {conteudo ? (
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <VisualisarFeedback idPedido={idPedido} fecharModal={fechar} />
            </div>
          ) : (
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <EnviarFeedBack
                idPedido={idPedido}
                fecharModal={fechar}
                refreshTabela={refreshTabela}
              />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ModalFeedback;
