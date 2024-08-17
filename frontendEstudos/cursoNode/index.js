const usuario = {};

function obterUsuario() {
  usuario = {
    id: 1,
    nome: "carlinhos",
    dataNascimento: new Date(),
    numero: 9999999,
  };
}

console.log(usuario);

function obterNumero(usuarioNumero) {}

function obterNome(usuarioNome) {}

const numero = obterNumero(usuario.id);
const nome = obterNome(usuario.nome);

console.log("o nome é", nome);
console.log("o numero é", numero);
