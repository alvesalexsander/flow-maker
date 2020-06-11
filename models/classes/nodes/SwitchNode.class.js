const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');
const DecisionNode = require('./DecisionNode.class');

class SwitchNode extends Node {
    // Node que representa uma decisão condicional.
    condition
    pathCases// Observable?
    pathNodes// Observable? // Array de DecisionNodes para serem explorados por FlowSequences

    constructor({
        name = valueDefault['name'],
        condition = valueDefault['condition'],
        pathCases = valueDefault['pathCases'],
        plugIn = valueDefault['plugIn'] }) {
        super({ name });
        this.set('condition', condition);
        this.set('plugIn', plugIn);
        this.set('pathCases', pathCases);
        this.pathCases.length >= 2 ? 
            this.set('pathNodes', this.mountPathCasesNodes()) 
            : this.set('pathNodes', valueDefault['pathNodes']); //Observable
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.turnTargetNode;
        delete this.plugOut;
        delete this.stepMessage;
    }

    mountPathCasesNodes(pathCases) {
        //Monta array na propriedade 'pathNodes' a partir de 'pathCases'
        if (Array.isArray(this.pathCases) && this.pathCases.length >= 2) {
            let caseNodes = [];
            for (let caso of this.pathCases) {
                caso = new DecisionNode({
                    name: `${this.name}(${caso})`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete this.turnTargetNode;
                caseNodes.push(caso);
            }
            return caseNodes;
        }
    }
}

module.exports = SwitchNode;