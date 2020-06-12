const valueDefault = require('../../integrityRequirements/valueDefault');

const Flow = require('./Flow.class');

class FlowSequence extends Flow {
    previousNode
    nextNode

    constructor({ previousNode = valueDefault['previousNode'], nextNode = valueDefault['nextNode'] }) {
        super();
        this.set('previousNode', previousNode);
        this.set('nextNode', nextNode);
    }
}

module.exports = FlowSequence;