import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { formataData } from ".";

function getDataMinima() {
  let data = new Date()
  data.setDate(data.getDate() + 1)
  return formataData(data)
}

export default function TimePickerViewRenderers({ value, onChange, disabled, dataSelecionada }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]} sx={{ width: 200 }}>
        <TimePicker
          label="Horário do evento"
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          value={value}
          //deu errado pois bloqueia a hora independente do dia
          minTime={
            (getDataMinima() === formataData(dataSelecionada)) ?
            (dayjs().set("minute", new Date().getMinutes() + 30)) :
            null
            
        }
          onChange={onChange}
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
