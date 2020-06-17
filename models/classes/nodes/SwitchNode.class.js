const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const DecisionNode = require('./DecisionNode.class');
const EventEmitter = require('../shared/EventEmitter.class');

class SwitchNode extends Node {
    // Node que representa uma decisão condicional.
    condition
    pathCases = []
    pathNodes = []

    constructor({
        name,
        condition,
        pathCases,
        prevNode}) {
        super({ name });
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;
        delete this.stepMessage;

        this.set('condition', condition);;
        this.set('pathCases', pathCases);
        this.mountPathCasesNodes()
    }

    /**
     * [SwitchNode]
     * @observable Monta array na propriedade 'pathNodes' a partir de 'pathCases'
     */
    mountPathCasesNodes() {
        if (Array.isArray(this.pathCases)) {
            let caseNodes = [];
            for (let caso of this.pathCases) {
                caso = new DecisionNode({
                    name: `${this.name}(${caso})`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn,
                    prevNode: this.prevNode,
                });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete this.turnTargetNode;
                caseNodes.push(caso);
            }
            this.pathNodes = caseNodes;
            return this.pathNodes;
        }
    }

    setNextNode(node){
        super.setNextNode(node);
        this.mountPathCasesNodes()
        this.prevNode = node;
        this.prevNode.nextNode = this.pathNodes;

    }

    setPrevNodeSwitchNode() {
        for (const node of this.pathNodes) {
            node.prevNode = this.prevNode;
        }
    }
}

module.exports = SwitchNode;