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
        pathCases =[]}) {
        super({ name }); // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;

        this.set('condition', condition);;
        this.set('pathCases', pathCases);
        this.mountPathNodes();
    }

    mountPathNodes() {
        if (Array.isArray(this.pathCases)) {
            let caseNodes = [];
            for (let caso of this.pathCases) {
                caso = new DecisionNode({
                    name: `${caso}`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn,
                    prevNode: this.prevNode,
                });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete this.turnTargetNode;
                caseNodes.push(caso);
            }
            this.pathNodes = caseNodes;
            this.updatePrevNode();
            return this.pathNodes;
        }
    }

    getPath(pathName) {
        if (Array.isArray(this.pathNodes)) {
            return this.pathNodes.filter((path) => pathName.toLowerCase() == path.name.toLowerCase())[0];
        }
        return false;
    }

    updatePrevNode(){
        if(this.prevNode) {
            this.prevNode.set('nextNode', this.pathNodes);
        }
    }
}

module.exports = SwitchNode;