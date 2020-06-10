const ChartEntity = require('../common/ChartEntity.class');

class FlowSequence extends ChartEntity{

    constructor({ previousNode = 'none', nextNode = 'none' }) {
        super();
        this.setPreviousNode(previousNode)
        this.setNextNode(nextNode);
    }

    setPreviousNode(previousNode) {
        this.previousNode = previousNode ? previousNode : this.throwError('Necessário informar o node ANTERIOR ao que o FlowSequence se conecta');
    }

    setNextNode(nextNode) {
        this.nextNode = nextNode ? nextNode : this.throwError('Necessário informar o node SEGUINTE ao que o FlowSequence se conecta');
    }

    linkToNode(){}
}

// teste = new FlowSequence({
//     previousNode: 'oi',
//     nextNode: 'tchau'
// });

// console.log(teste)