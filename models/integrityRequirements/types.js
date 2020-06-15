function checkTypeIntegrity(propertyName, property) {
    // Recebe o nome de uma Propriedade e verifica se o tipo está de acordo com o esperado.
    const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('../classes/nodes/index');

    types = {
        id: String,
        fromFlow: [String],
        name: [Number, String],
        stepMessage: String,
        plugIn: String,
        plugOut: String,
        targetNode: Boolean,
        condition: String,
        conditions: Array,
        pathCases: Array,
        pathNodes: Array,
        expectedMessage: String,
        invokeFlow: String,
        pathAnswers: Array,
        previousNode: [Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode],
        nextNode: [Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode],
        prevNode: this.nextNode
    };

    if (!types[propertyName]) return;
    if (Array.isArray(types[propertyName])) {
        for (const requirement of types[propertyName]) {
            if (property.constructor == requirement) return true;
        }
    }
    if (property.constructor == types[propertyName]) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = checkTypeIntegrity;