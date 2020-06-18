const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const OutputMessageNode = require('./OutputMessageNode.class');

class PreconditionsNode extends Node {
    // Node que representa a(s) pré-condições do fluxo (FlowMap) do ponto em diante
    preconditions
    preconditionsNodes = []

    constructor({
        name,
        preconditions = [],
        prevNode }) {
        super({ name, prevNode });
        delete this.turnTargetNode;
        delete this.stepMessage;
        this.set('name', name);
        this.setPreconditions(preconditions);
    }

    setPreconditions(conditionsArray){
        this.preconditions = conditionsArray;
        this.mountPreconditionsNodes();
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
                precondition.parent = this.id;
                delete precondition.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete precondition.plugIn;

                preconditionsNodes.push(precondition);
            }
            this.preconditionsNodes = preconditionsNodes;
            this.updatePrevNode();
            return this.preconditionsNodes;
        }
    }

    setPreconditions(preconditions) {
        this.preconditions = preconditions;
        this.mountPreconditionsNodes();
    }

    updatePrevNode(){
        if(this.prevNode) {
            this.prevNode.set('nextNode', this.preconditionsNodes);
        }
    }
}

module.exports = PreconditionsNode;