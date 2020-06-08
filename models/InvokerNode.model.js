const Node = require('./Node.model');

module.exports = class InvokerNode extends Node {

    constructor(existingFlow, pathAnswers) {
        this.invokeFlow = existingFlow ? existingFlow : new Error('Necessário informar um Fluxo ou Serviço a ser invocado');
        this.pathAnswers = Array.isArray(pathAnswers) && pathAnswers.length >= 1 ? pathAnswers : new Error('Necessário no mínimo um array com um elemento para pathAnswers');
    }
}