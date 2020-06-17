const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class DecisionNode extends Node {

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        prevNode = valueDefault['prevNode'],
        nextNode = valueDefault['nextNode'] }) {
        super({ name, stepMessage, prevNode, nextNode });
        delete this.targetNode;
        delete this.turnTargetNode;
    }
}

module.exports = DecisionNode;