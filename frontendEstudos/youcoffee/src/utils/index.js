export const formataData = (data) => {
  if(!data || data === '') return ''
  else {
    const dateData = new Date(data)
    const dia = dateData.getDate() >= 10 ? dateData.getDate() : `0${dateData.getDate()}`;
    const mes =
      dateData.getMonth() >= 10 ? dateData.getMonth() + 1 : `0${dateData.getMonth() + 1}`;
    return `${dia}/${mes}/${dateData.getFullYear()}`;
  }
};
  
export const formataTempo = (tempo) => {
  if(!tempo || tempo === '') return ''
  else {
    const dateTempo = new Date(tempo)
    const hora =
      dateTempo.getHours() >= 10 ? dateTempo.getHours() : `0${dateTempo.getHours()}`;
    const minuto =
      dateTempo.getMinutes() >= 10 ? dateTempo.getMinutes() : `0${dateTempo.getMinutes()}`;
    return `${hora}:${minuto}`;
  }
};