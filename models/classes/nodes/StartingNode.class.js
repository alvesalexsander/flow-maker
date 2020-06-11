const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class StartingNode extends Node {
    // Node inicial de um fluxo (FlowMap)
    fromFlow

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        fromFlow = valueDefault['fromFlow'] }) {
        super({ name, stepMessage });
        this.set('fromFlow', fromFlow);
        this.initialNode = this.fromFlow ? false : true;
        delete this.targetNode;
        delete this.turnTargetNode;
    }

    setFromFlow(fromFlow) {
        this.fromFlow = fromFlow ? fromFlow : null;
        this.initialNode = this.fromFlow ? false : true;
    }
}

module.exports = StartingNode;

// Testes funcionais

// teste = new StartingNode({
//     name: 'oi',
//     fromFlow: 'oi'
// })

// console.log(teste);