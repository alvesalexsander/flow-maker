const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('../classes/nodes/index');

const types = {
    id: String,
    fromFlow: [String],
    name: [Number, String],
    stepMessage: String,
    plugIn: String,
    plugOut: String,
    targetNode: Boolean,
    condition: String,
    preconditions: Array,
    pathCases: Array,
    pathNodes: Array,
    expectedMessage: String,
    invokeFlow: String,
    pathAnswers: Array,
    // previousNode: [Node || StartingNode || PreconditionsNode || OutputMessageNode || SwitchNode || DecisionNode || InvokerNode || String],
    // nextNode: Node || StartingNode || PreconditionsNode || OutputMessageNode || SwitchNode || DecisionNode || InvokerNode || String,
    // prevNode: Node || StartingNode || PreconditionsNode || OutputMessageNode || SwitchNode || DecisionNode || InvokerNode || String
};

function checkTypeIntegrity(propertyName, property) {
    // Recebe o nome de uma Propriedade e verifica se o tipo está de acordo com o esperado.
    

    // types = {
    //     id: String,
    //     fromFlow: [String],
    //     name: [Number, String],
    //     stepMessage: String,
    //     plugIn: String,
    //     plugOut: String,
    //     targetNode: Boolean,
    //     condition: String,
    //     preconditions: Array,
    //     pathCases: Array,
    //     pathNodes: Array,
    //     expectedMessage: String,
    //     invokeFlow: String,
    //     pathAnswers: Array,
    //     previousNode: [Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode, String],
    //     nextNode: [Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode, String],
    //     prevNode: [Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode, String]
    // };

    if (!types[propertyName]) return true;
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

module.exports = {checkTypeIntegrity, types};