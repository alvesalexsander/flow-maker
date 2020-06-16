const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const OutputMessageNode = require('./OutputMessageNode.class');

const EventEmitter = require('../shared/EventEmitter.class');

class PreconditionsNode extends Node {
    // Node que representa a(s) pré-condições do fluxo (FlowMap) do ponto em diante
    preconditions
    preconditionsNodes = []

    constructor({
        name = valueDefault['name'],
        preconditions = valueDefault['preconditions'],
        prevNode = valueDefault['prevNode'] }) {
        super({ name, prevNode });
        // this.eventEmitter = new EventEmitter(this);
        // this.eventEmitter.newEvent('prevNode', 'updatePrevNodeDestination');
        // this.eventEmitter.newEvent('nextNode', 'updateNextNodeOrigin');
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;
        delete this.plugOut;
        delete this.nextNode;
        delete this.stepMessage;

        // this.eventEmitter.newEvent('preconditions', 'mountPreconditionsNodes');
        // this.eventEmitter.newEvent('prevNode', 'setPrevNodePreconditions');
        // this.eventEmitter.newEvent('prevNode', 'updatePrevNodeDestination');

        this.set('name', name);
        this.setPrevNode(prevNode);
        this.setPreconditions(preconditions)
        // this.set('preconditions', preconditions);
    }

    setPreconditions(preconditions) {
        // Setter para 'this.preconditions'
        this.preconditions = Array.isArray(preconditions) && preconditions.length >= 1 ? preconditions : this.throwError(`Necessário, no mínimo, um array com UM elemento para preconditions em ${this.type}(${this.id})`);
    }

    mountPreconditionsNodes() {
        if (Array.isArray(this.preconditions)) {
            let preconditionsNodes = [];
            for (let precondition of this.preconditions) {
                precondition = new OutputMessageNode({
                    name: `Pré-condição '${precondition}'`,
                    stepMessage: `Testar condição: ${precondition}`,
                    expectedMessage: `Testar condição: ${precondition}`,
                    prevNode: this.prevNode,
                    nextNode: this.nextNode
                });
                delete precondition.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete precondition.plugIn;

                preconditionsNodes.push(precondition);
            }
            this.preconditionsNodes = preconditionsNodes;
            return true
        }
    }

    setPreconditions(preconditions) {
        this.preconditions = preconditions;
        this.mountPreconditionsNodes();
    }

    setNextNode(node) {
        super.setNextNode(node);
        this.mountPreconditionsNodes();
    }

    setPrevNode(node) {
        super.setPrevNode(node);
        this.mountPreconditionsNodes();
        return ['nextNode', this.preconditionsNodes];
    }

    getNextNode() {

    }

    getPrevNode() {
        if (this.prevNode) {
            return this.prevNode;
        }
        return false;
    }
}

module.exports = PreconditionsNode;