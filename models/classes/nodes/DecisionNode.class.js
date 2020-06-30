const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class DecisionNode extends Node {

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        expectedMessage = valueDefault['expectedMessage'],
        // prevNode = valueDefault['prevNode'],
        nextNode = valueDefault['nextNode'] }) {
        super({ name, stepMessage, expectedMessage, /* prevNode, */ nextNode });
        delete this.targetNode;
        delete this.turnTargetNode;
    }
}

module.exports = DecisionNode;