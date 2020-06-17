const NodeFactory = require('../nodes/NodeFactory.class');

class Factory {
    node = new NodeFactory();

    constructor(){
        console.log('Factory instanciada.');
    }

}

module.exports = Factory;