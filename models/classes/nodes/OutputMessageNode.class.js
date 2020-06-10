const Node = require('./Node.class');

class OutputMessageNode extends Node {
    // Node que representa um output específico e esperado da URA que seja interessante registrar.
    expectedMessage

    constructor({ name, stepMessage, linkIn, linkOut='', expectedMessage='' }) {
        super({ name, stepMessage, linkIn, linkOut });
        this.set('expectedMessage', expectedMessage);
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