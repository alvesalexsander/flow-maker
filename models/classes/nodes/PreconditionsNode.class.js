const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const OutputMessageNode = require('./OutputMessageNode.class');

const EventEmitter = require('../shared/EventEmitter.class');

class PreconditionsNode extends Node {
    // Node que representa a(s) pré-condições do fluxo (FlowMap) do ponto em diante
    preconditions

    constructor({
        name = valueDefault['name'],
        preconditions = valueDefault['preconditions'],
        prevNode = valueDefault['prevNode'] }) {
        super({ name });
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;
        delete this.plugOut;
        delete this.stepMessage;

        this.eventEmitter = new EventEmitter(this);
        this.eventEmitter.newEvent('preconditions', 'mountPreconditionsNodes');
        this.set('name', name);
        this.set('preconditions', preconditions);
        this.set('prevNode', prevNode);
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
                    prevNode: this.prevNode
                });
                delete precondition.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete precondition.plugIn;

                preconditionsNodes.push(precondition);
            }
            this.preconditionsNodes = preconditionsNodes;
            return true
        }
    }
}

module.exports = PreconditionsNode;