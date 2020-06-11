const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class DecisionNode extends Node {

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        plugIn = valueDefault['plugIn'],
        plugOut = valueDefault['plugOut'] }) {
        super({ name, stepMessage, plugIn, plugOut });
        delete this.targetNode;
        delete this.turnTargetNode;
    }
}

module.exports = DecisionNode;