const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class OutputMessageNode extends Node {
    // Node que representa um output específico e esperado da URA que seja interessante registrar.
    expectedMessage

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        plugIn = valueDefault['plugIn'],
        plugOut = valueDefault['plugOut'],
        prevNode = valueDefault['prevNode'],
        nextNode = valueDefault['nextNode'],
        expectedMessage = valueDefault['expectedMessage'] }) {
        super({ name, stepMessage, plugIn, plugOut, prevNode, nextNode });
        this.set('expectedMessage', expectedMessage);
    }
}

module.exports = OutputMessageNode;