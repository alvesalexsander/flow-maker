const Node = require('./Node.class');

class PreconditionsNode extends Node {
    // Node que representa a(s) pré-condições do fluxo (FlowMap) do ponto em diante
    constructor({ name, conditions }) {
        super({ name });
        this.setConditions(conditions);
    }

    setConditions(conditions) {
        // Setter para 'this.conditions'
        this.conditions = Array.isArray(conditions) && conditions.length >= 1 ? conditions : this.throwError('Necessário, no mínimo, um array com UM elemento para conditions');
        
    }
}

module.exports = PreconditionsNode;

// Testes funcionais

// teste = new PreconditionsNode({
//     name: 'oi',
//     conditions: ['tchau']
// });

// console.log(teste)