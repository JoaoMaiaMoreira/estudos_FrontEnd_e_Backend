import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginacao({ totalPagina, onPaginaChange }) {
  function chamarPaginacao(e, numeroPaginacao) {
    onPaginaChange(numeroPaginacao);
  }

  return (
    <Stack spacing={1}>
      <Pagination
        count={totalPagina}
        variant="outlined"
        onChange={chamarPaginacao}
      />
    </Stack>
  );
}
