const ChartEntity = require('../common/ChartEntity.class');

class Node extends ChartEntity{
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    name
    stepMessage
    linkIn
    linkOut
    targetNode = false;

    constructor({ name='', stepMessage='', linkIn='', linkOut=''}) {
        super();
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('linkIn', linkIn);
        this.set('linkOut', linkOut);
        this.type = this.constructor.name;
    }

    turnTargetNode() {
        if (this.targetNode) {
            this.targetNode = true;
        }
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