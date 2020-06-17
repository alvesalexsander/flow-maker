const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class OutputMessageNode extends Node {
    // Node que representa um output específico e esperado da URA que seja interessante registrar.
    expectedMessage

    constructor({
        name,
        stepMessage,
        prevNode,
        nextNode,
        expectedMessage}) {
        super({ name, stepMessage, prevNode, nextNode });
        this.set('expectedMessage', expectedMessage);
    }
}

module.exports = OutputMessageNode;