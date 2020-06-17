const shortid = require('shortid');

class Node {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    id
    name
    stepMessage
    nextNode
    prevNode
    targetNode = false;

    constructor({
        name,
        stepMessage,
        prevNode,
        nextNode }) {
        this.type = this.constructor.name;
        this.set('id', shortid.generate());
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('prevNode', prevNode);
        this.set('nextNode', nextNode);
    }

    turnTargetNode() {
        if (this.targetNode == false) {
            this.targetNode = true;
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

    prev() {
        if (this.prevNode) {
            return this.prevNode;
        }
        else {
            return false;
        }
    }

    mapScenarios(prevStepMessages) {
        if (prevStepMessages) {
            if (this.nextNode.targetNode) {
                prevStepMessages.push(this.stepMessage);
                this.nextNode.endFlowScenario(prevStepMessages);
            }
            else if (Array.isArray(this.nextNode)) {
                for (const node of this.nextNode) {
                    let nodeStepMessage = [].concat(prevStepMessages);
                    nodeStepMessage.push(this.stepMessage);
                    node.mapScenarios(nodeStepMessage);
                }
            }
            else {
                prevStepMessages.push(this.stepMessage);
                if (this.nextNode.mapScenarios) {
                    this.nextNode.mapScenarios(prevStepMessages);
                }
            }
        }
    }

    endFlowScenario(prevStepMessages) {
        if (this.targetNode == true) {
            prevStepMessages.push(this.get('stepMessage'));
            console.log(prevStepMessages)
        }
    }

    set(property, value) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, atribui um novo valor.
        if (typeof property == 'string') {
            this[property] = value;
        }
    }

    get(property) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, retorna o seu valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            return this[property];
        }
    }
}

module.exports = Node;