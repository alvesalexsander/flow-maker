const Node = require('./Node.model');

module.exports = class Switch {
    
    constructor(condition, pathCases) {
        this.condition = condition ? condition : new Error('Necessário informar condição para criar node do tipo Switch');
        this.pathCases = Array.isArray(pathCases) && pathCases.length >= 2 ? pathCases : new Error('Necessário no mínimo um array com dois elementos para pathCases');
    }
}