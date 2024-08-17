import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  onChange,

  opcao,

  selectOption,
}) {
  return (
    <Box sx={{ minWidth: 120}}>
      <FormControl sx={{ width: 200}}>
        <InputLabel id="local">Local</InputLabel>
        <Select value={selectOption} label="Local" onChange={onChange} disabled={!opcao || opcao?.length === 0}>
          {(opcao?.length !== 0 && opcao) && opcao.map((l, index) => (
            <MenuItem key={index} value={l?.idLocal}>
              {l?.nomeLocal}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
