const shortid = require('shortid');

class Node {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    id
    name
    stepMessage
    expectedMessage
    nextNode
    // prevNode
    targetNode = false;

    constructor({
        name,
        stepMessage,
        expectedMessage,
        // prevNode,
        nextNode }) {
        this.type = this.constructor.name;
        this.set('id', shortid.generate());
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('expectedMessage', expectedMessage);
        // this.set('prevNode', prevNode);
        this.set('nextNode', nextNode);
        return this;
    }

    turnTargetNode() {
        if (this.targetNode == false) {
            this.targetNode = true;
            return this;
        }
    }

    isTargetNode() {
        return this.targetNode ? this.targetNode : false
    }

    next() {
        if (this.nextNode) {
            return this.nextNode;
        }
        else {
            return false;
        }
    }

    /* prev() {
        if (this.prevNode) {
            return this.prevNode;
        }
        else {
            return false;
        }
    } */

    mapScenarios(prevStepMessages, prevExpectedMessages) {
        if (prevStepMessages && this.nextNode) {
            try {
                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages) {
                        prevStepMessages.push(thisNode.stepMessage);
                        prevExpectedMessages.push(thisNode.expectedMessage);
                        if (thisNode.nextNode.targetNode) {
                            thisNode.nextNode.endFlowScenario(prevStepMessages, prevExpectedMessages);
                        }
                        else {
                            thisNode.nextNode.mapScenarios(prevStepMessages, prevExpectedMessages);
                        }
                    },

                    Array(prevStepMessages, thisNode, prevExpectedMessages) {
                        for (const node of thisNode.nextNode) {
                            let nodeStepMessage = [].concat(prevStepMessages);
                            let nodeExpectedMessages = [].concat(prevExpectedMessages);
                            nodeStepMessage.push(thisNode.stepMessage);
                            nodeExpectedMessages.push(thisNode.expectedMessage);
                            node.mapScenarios(nodeStepMessage, nodeExpectedMessages);
                        }
                    }
                }
                const handleFunction = this.nextNode && this.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, this, prevExpectedMessages);
            }
            catch (error) {
                console.log(`ERROR :: ${this.name} ('${this.type}') :: `);
                console.log(error);
            }
        }
        else {
            console.log(`WARNING :: ${this.name} ('${this.type}') :: Unexpected end at 'mapScenarios' method / nextNode is ${this.nextNode}`);
            console.log(this);
        }
    }

    endFlowScenario(prevStepMessages, prevExpectedMessages) {
        if (this.targetNode == true) {
            prevStepMessages.push(this.stepMessage);
            prevExpectedMessages.push(this.expectedMessage);
            prevStepMessages = prevStepMessages.filter(stepMessage => stepMessage);
            prevExpectedMessages = prevExpectedMessages.filter(expectedMessage => expectedMessage);
            const testScenario = {
                precondition: prevStepMessages,
                expectedResult: prevExpectedMessages
            }
            // const testScenario = prevStepMessages.filter((stepMessage) => stepMessage);
            scenarioStorage.pushNewScenarios(testScenario);
        }
    }

    set(property, value) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, atribui um novo valor.
        if (typeof property == 'string') {
            this[property] = value;
            return this;
        }
    }

    get(property) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, retorna o seu valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            return this[property];
        }
    }

    setNextNode(node) {
        if (node.type == 'PreconditionsNode') {
            const nextNodes = [];
            for (const path of node.preconditionsNodes) {
                nextNodes.push(path.id);
            }
            this.nextNode = nextNodes;
            return;
        }
        else if (node.type == 'SwitchNode') {
            const nextNodes = [];
            for (const path of node.pathNodes) {
                nextNodes.push(path.id);
            }
            this.nextNode = nextNodes;
            return;
        }
        else {
            this.nextNode = node.id;
        }
    }
}

module.exports = Node;