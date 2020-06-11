const Flow = require('./Flow.class');

const OutputMessageNode = require('../nodes/OutputMessageNode.class')

class FlowSequence extends Flow {
    previousNode
    nextNode

    constructor({ previousNode = 'empty', nextNode = 'empty' }) {
        super();
        teste = new OutputMessageNode({
            expectedMessage: 'oi'
        })
        console.log(teste.constructor);
        this.set('previousNode', previousNode);
        this.set('nextNode', nextNode);
    }
}

teste = new FlowSequence({
    previousNode: 'oi',
    nextNode: 'oi'
});

console.log(teste);