const Node = require('./Node.model');

class DecisionNode extends Node {

    constructor({ name, stepMessage }) {
        super({ name, stepMessage });
        delete this.targetNode;
    }
}

module.exports = DecisionNode;

// Testes funcionais

// teste = new DecisionNode({
//     name: 'oi',
//     stepMessage: 'tchau'
// })

// console.log(teste);