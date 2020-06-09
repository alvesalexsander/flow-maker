const Node = require('./Node.model');

class InvokerNode extends Node {
    // Node que pode invocar outros fluxos (FlowMap) ou serviços
    constructor({ name, stepMessage, invokeFlow, pathAnswers }) {
        super({ name, stepMessage });
        this.setInvokeFlow(invokeFlow);
        this.setPathAnswers(pathAnswers);
    }

    setInvokeFlow(invokeFlow) {
        // Setter para 'this.invokeFlow'
        this.invokeFlow = invokeFlow ? invokeFlow : new Error('Necessário informar um fluxo(FlowMap) ou serviço para invokeFlow');
        return this;
    }

    setPathAnswers(pathAnswers) {
        // Setter para 'this.pathAnswers'
        this.pathAnswers = Array.isArray(pathAnswers) && pathAnswers.length >= 2 ? pathAnswers : new Error('Necessário, no mínimo, um array com DOIS elementos para pathAnswers');
        return this;
    }
}

module.exports = InvokerNode;

// Testes funcionais

// teste = new InvokerNode({
//     name: 'oi',
//     stepMessage: 'tchau',
//     invokeFlow: 'any',
//     pathAnswers: ['sim', 'não']
// })

// console.log(teste);