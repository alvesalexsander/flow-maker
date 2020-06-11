const Node = require('./Node.class');

class DecisionNode extends Node {

    constructor({ name, stepMessage, plugIn, plugOut }) {
        super({ name, stepMessage, plugIn, plugOut});
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