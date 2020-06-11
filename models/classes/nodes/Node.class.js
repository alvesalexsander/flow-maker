const ChartEntity = require('../common/ChartEntity.class');

class Node extends ChartEntity{
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    name
    stepMessage
    plugIn
    plugOut
    targetNode = false;

    constructor({ name='', stepMessage='', plugIn='', plugOut=''}) {
        super();
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('plugIn', plugIn);
        this.set('plugOut', plugOut);
        this.type = this.constructor.name;
    }

    turnTargetNode() {
        // if (this.targetNode) {
        //     this.targetNode = true;
        // }
        this.targetNode && this.targetNode == false (this.targetNode = true);
    }

    isTargetNode() {
        return this.targetNode ? this.targetNode : false
    }
}

module.exports = Node;

// Testes funcionais

// teste = new Node({
//     name: 'oi',
//     stepMessage: '3'
// });

// console.log(teste.isTargetNode());
// teste.turnTargetNode();

// console.log(teste);