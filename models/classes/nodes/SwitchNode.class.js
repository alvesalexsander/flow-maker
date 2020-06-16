const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const DecisionNode = require('./DecisionNode.class');
const EventEmitter = require('../shared/EventEmitter.class');

class SwitchNode extends Node {
    // Node que representa uma decisão condicional.
    condition
    pathCases = []// Observable?
    pathNodes// Observable? // Array de DecisionNodes para serem explorados por FlowSequences

    constructor({
        name = valueDefault['name'],
        condition = valueDefault['condition'],
        pathCases = valueDefault['pathCases'],
        plugIn = valueDefault['plugIn'],
        prevNode = valueDefault['prevNode']}) {
        super({ name });
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;
        delete this.plugOut;
        delete this.stepMessage;

        // this.eventEmitter.newEvent('pathCases', 'mountPathCasesNodes');
        // this.eventEmitter.newEvent('prevNode', 'setPrevNodeSwitchNode');

        this.set('condition', condition);
        this.set('plugIn', plugIn);
        this.set('prevNode', prevNode);
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
            return true
        }
    }

    setNextNode(node){
        super.setNextNode(node);
        this.mountPathCasesNodes()
    }

    setPrevNodeSwitchNode() {
        for (const node of this.pathNodes) {
            node.prevNode = this.prevNode;
        }
    }
}

module.exports = SwitchNode;