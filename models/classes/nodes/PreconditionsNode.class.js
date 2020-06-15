const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class PreconditionsNode extends Node {
    // Node que representa a(s) pré-condições do fluxo (FlowMap) do ponto em diante
    conditions

    constructor({
        name = valueDefault['name'],
        conditions = valueDefault['conditions'] }) {
        super({ name });
        this.set('conditions', conditions);
    }

    setConditions(conditions) {
        // Setter para 'this.conditions'
        this.conditions = Array.isArray(conditions) && conditions.length >= 1 ? conditions : this.throwError(`Necessário, no mínimo, um array com UM elemento para conditions em ${this.type}(${this.id})`);
    }

    mountPreconditionNodes() {
        if (Array.isArray(this.pathCases)) {
            let caseNodes = [];
            for (let caso of this.pathCases) {
                caso = new DecisionNode({
                    name: `${this.name}(${caso})`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn
                });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete this.turnTargetNode;
                caseNodes.push(caso);
            }
            this.pathNodes = caseNodes;
            return true
        }
    }
}

module.exports = PreconditionsNode;