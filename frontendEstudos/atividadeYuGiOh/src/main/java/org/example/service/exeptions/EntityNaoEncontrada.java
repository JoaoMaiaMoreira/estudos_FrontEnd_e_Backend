package org.example.service.exeptions;

public class EntityNaoEncontrada extends RuntimeException{
    public EntityNaoEncontrada(String message) {
        super(message);
    }
}
