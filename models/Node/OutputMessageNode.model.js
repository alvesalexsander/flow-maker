const Node = require('./Node.model');

class OutputMessageNode extends Node {
    // Node que representa um output específico e esperado da URA que seja interessante registrar.
    constructor({ name, stepMessage, expectedMessage }) {
        super({ name, stepMessage });
        this.setExpectedMessage(expectedMessage);
    }

    getExpectedMessage() {
        return this.expectedMessage;
    }

    setExpectedMessage(expectedMessage) {
        this.expectedMessage = expectedMessage ? expectedMessage : new Error('Necessário informar uma mensagem esperada');
        return this;
    }
}

module.exports = OutputMessageNode;

// Testes funcionais

// teste = new OutputMessageNode({
//     name: 'oi',
//     stepMessage: 'tchau',
//     expectedMessage: 'to te vendo'
// })

// console.log(teste);