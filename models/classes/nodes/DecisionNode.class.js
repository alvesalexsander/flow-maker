const Node = require('./Node.class');

class DecisionNode extends Node {

    constructor({ name, stepMessage, linkIn, linkOut }) {
        super({ name, stepMessage, linkIn, linkOut});
        delete this.targetNode;
    }
}

module.exports = DecisionNode;

// Testes funcionais

/* let teste = new DecisionNode({
    name: 'oi',
    stepMessage: 'tchau'
}) */

// console.log(teste);