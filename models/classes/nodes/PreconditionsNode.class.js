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
}

module.exports = PreconditionsNode;

// Testes funcionais

// teste = new PreconditionsNode({
// });

// console.log(teste)