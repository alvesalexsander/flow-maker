const Node = require('./Node.class');

class InvokerNode extends Node {
    // Node que pode invocar outros fluxos (FlowMap) ou serviços
    invokeFlow
    pathAnswers

    constructor({ name, stepMessage, linkIn, linkOut, invokeFlow, pathAnswers }) {
        super({ name, stepMessage, linkIn, linkOut });
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