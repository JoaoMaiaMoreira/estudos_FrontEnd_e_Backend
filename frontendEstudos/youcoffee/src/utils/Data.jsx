import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";


export default function BasicDatePicker({ onChange, value }) {

  function horaMinima() {
    const horario = new Date()
    const hora = horario.getHours()
    const minuto = horario.getMinutes()
    return (hora === 23 && minuto >= 30)
  }


  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
    >
      <DemoContainer components={["DatePicker"]} sx={{ width: 200 }}>
        <DatePicker
          onChange={onChange}
          value={value}
          label="Data do evento"
          format="DD/MM/YYYY"
          minDate={
            dayjs().add((horaMinima() ? 2 : 1), "day")}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
