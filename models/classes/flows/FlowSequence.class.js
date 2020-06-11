const ChartEntity = require('../common/ChartEntity.class');

class FlowSequence extends ChartEntity{

    constructor({ previousNode = 'empty', nextNode = 'empty' }) {
        super();
        this.setPreviousNode(previousNode);
        this.setNextNode(nextNode);
    }

    setPreviousNode(previousNode) {
        this.previousNode = previousNode;
    }

    setNextNode(nextNode) {
        this.nextNode = nextNode;
    }
}

// teste = new FlowSequence({
//     previousNode: 'oi',
//     nextNode: 'tchau'
// });

// console.log(teste)