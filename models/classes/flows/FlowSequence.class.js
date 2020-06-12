const Flow = require('./Flow.class');

const OutputMessageNode = require('../nodes/OutputMessageNode.class');
let teste = new OutputMessageNode({
    expectedMessage: 'oi'
})

class FlowSequence extends Flow {
    previousNode
    nextNode

    constructor({ previousNode = 'empty', nextNode = 'empty' }) {
        super();
        this.set('previousNode', previousNode);
        this.set('nextNode', nextNode);
    }
}

module.exports = FlowSequence;