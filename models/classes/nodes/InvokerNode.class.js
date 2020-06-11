const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class InvokerNode extends Node {
    // Node que pode invocar outros fluxos (FlowMap) ou serviços
    invokeFlow
    pathAnswers

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        plugIn = valueDefault['plugIn'],
        plugOut = valueDefault['plugOut'],
        invokeFlow = valueDefault['invokeFlow'],
        pathAnswers = valueDefault['pathAnswers'] }) {
        super({ name, stepMessage, plugIn, plugOut });
        this.set('invokeFlow', invokeFlow);
        this.set('pathAnswers', pathAnswers);
    }
}

module.exports = InvokerNode;

// Testes funcionais

// teste = new InvokerNode({
//     name: 'oi',
//     stepMessage: 'tchau',
//     invokeFlow: 'any',
//     pathAnswers: ['sim']
// })

// console.log(teste);