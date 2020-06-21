const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('./index');
const valueDefault = require('../../integrityRequirements/valueDefault');

class NodeFactory {

    produces = ['Node', 'StartingNode', 'PreconditionsNode', 'OutputMessageNode', 'SwitchNode', 'DecisionNode', 'InvokerNode'];

    getParams({
        name = null,
        stepMessage = null,
        nextNode = null,
        // prevNode = null,
        expectedMessage = null,
        preconditions = [],
        condition = null,
        pathCases = [] }
    ) {
        return arguments[0];
    }

    buildNode() {
        return new Node(this.getParams(arguments[0] || {}));
    }

    buildStarting() {
        return new StartingNode(this.getParams(arguments[0] || {}));
    }

    buildPreconditions() {
        return new PreconditionsNode(this.getParams(arguments[0] || {}));
    }

    buildOutputMessage() {
        return new OutputMessageNode(this.getParams(arguments[0] || {}));
    }

    buildSwitch() {
        return new SwitchNode(this.getParams(arguments[0] || {}));
    }

    buildDecision() {
        return new DecisionNode(this.getParams(arguments[0] || {}));
    }

    buildInvoker() {
        return new InvokerNode(this.getParams(arguments[0] || {}));
    }

}

module.exports = NodeFactory;