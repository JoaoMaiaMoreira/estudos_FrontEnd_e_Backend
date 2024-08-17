package joao.exception;

public class PedidoNaoEncontradoExeception extends RuntimeException {
    public PedidoNaoEncontradoExeception() {
        super("Pedido nao encontrado");
    }
}
