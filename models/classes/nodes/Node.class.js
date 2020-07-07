const shortid = require('shortid');
const cloneDeep = require('lodash.clonedeep');

class Node {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    id
    name
    description
    stepMessage
    expectedMessage
    nextNode
    alts = []
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

    noStepMessage() {
        delete this.stepMessage;
        return this;
    }

    noExpectedMessage() {
        delete this.expectedMessage;
        return this;
    }

    noMessage() {
        delete this.stepMessage;
        delete this.expectedMessage;
        return this;
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

    mapScenarios(prevStepMessages, prevExpectedMessages, nodeRoad) {
        if (prevStepMessages && this.nextNode) {
            try {
                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad) {
                        prevStepMessages.push(thisNode.stepMessage);
                        prevExpectedMessages.push(thisNode.expectedMessage);
                        nodeRoad[Object.keys(nodeRoad).length + 1] = thisNode.getBasicInfo();

                        if (thisNode.nextNode.targetNode) {
                            thisNode.nextNode.endFlowScenario(prevStepMessages, prevExpectedMessages, nodeRoad);
                        }
                        else {
                            thisNode.nextNode.mapScenarios(prevStepMessages, prevExpectedMessages, nodeRoad);
                        }
                    },

                    Array(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad) {
                        for (const node of thisNode.nextNode) {
                            let nodeStepMessage = [].concat(prevStepMessages);
                            let nodeExpectedMessages = [].concat(prevExpectedMessages);
                            let newRoad = { ...nodeRoad };
                            nodeStepMessage.push(thisNode.stepMessage);
                            nodeExpectedMessages.push(thisNode.expectedMessage);
                            newRoad[Object.keys(nodeRoad).length + 1] = thisNode.getBasicInfo();

                            node.mapScenarios(nodeStepMessage, nodeExpectedMessages, newRoad);
                        }
                    }
                }
                const handleFunction = this.nextNode && this.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, this, prevExpectedMessages, nodeRoad);
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

    endFlowScenario(prevStepMessages, prevExpectedMessages, nodeRoad) {
        if (this.targetNode == true) {
            prevStepMessages.push(this.stepMessage);
            prevExpectedMessages.push(this.expectedMessage);
            prevStepMessages = prevStepMessages.filter(stepMessage => stepMessage);
            prevExpectedMessages = prevExpectedMessages.filter(expectedMessage => expectedMessage);
            nodeRoad[Object.keys(nodeRoad).length + 1] = this.getBasicInfo();

            const testScenario = {
                precondition: prevStepMessages,
                expectedResult: prevExpectedMessages,
                nodeRoad
            }

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

    getBasicInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.type
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