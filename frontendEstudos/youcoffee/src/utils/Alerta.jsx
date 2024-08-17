import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Alerta({ tipo, mensagem }) {
  return (
    <Stack sx={{ width: "27%", alignItems: "center" }} spacing={2}>
      <Alert severity={tipo}> {mensagem}</Alert>
    </Stack>
  );
}

export default Alerta;
