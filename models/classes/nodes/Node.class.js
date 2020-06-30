const shortid = require('shortid');

class Node {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    id
    name
    stepMessage
    nextNode
    // prevNode
    targetNode = false;

    constructor({
        name,
        stepMessage,
        // prevNode,
        nextNode }) {
        this.type = this.constructor.name;
        this.set('id', shortid.generate());
        this.set('name', name);
        this.set('stepMessage', stepMessage);
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

    mapScenarios(prevStepMessages) {
        // console.log(`${this.type}`)
        if (prevStepMessages) {
            try {
                const handles = {
                    commonNode(prevStepMessages, thisNode) {
                        prevStepMessages.push(thisNode.stepMessage);
                        if (thisNode.nextNode.targetNode) {
                            thisNode.nextNode.endFlowScenario(prevStepMessages);
                        }
                        else {
                            thisNode.nextNode.mapScenarios(prevStepMessages);
                        }
                    },

                    Array(prevStepMessages, thisNode) {
                        for (const node of thisNode.nextNode) {
                            let nodeStepMessage = [].concat(prevStepMessages);
                            nodeStepMessage.push(thisNode.stepMessage);
                            node.mapScenarios(nodeStepMessage);
                        }
                    }
                }
                const handleFunction = this.nextNode && this.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, this);
            }
            catch (error) {
            console.log(`ERROR :: ${this.name} ('${this.type}') :: `);
            console.log(error);
        }
    }
}

endFlowScenario(prevStepMessages) {
    if (this.targetNode == true) {
        prevStepMessages.push(this.get('stepMessage'));
        const testScenario = prevStepMessages.filter((stepMessage) => stepMessage);
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