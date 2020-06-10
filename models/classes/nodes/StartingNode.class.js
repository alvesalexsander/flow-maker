const Node = require('./Node.class');

class StartingNode extends Node {
    // Node inicial de um fluxo (FlowMap)
    fromFlow

    constructor({ name, stepMessage, fromFlow }) {
        super({ name, stepMessage });
        delete this.targetNode;
        this.setFromFlow(fromFlow);
        this.initialNode = this.fromFlow ? false : true;
    }

    setFromFlow(fromFlow) {
        this.fromFlow = fromFlow ? fromFlow : null;
        
    }
}

module.exports = StartingNode;

// Testes funcionais

// teste = new StartingNode({
//     name: 'oi',
//     stepMessage: null,
//     fromFlow: 'oi'
// })

// console.log(teste);