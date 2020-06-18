const NodeFactory = require('../nodes/NodeFactory.class');

class Factory {
    node = new NodeFactory();

    constructor() {
        console.log('Factory instanciada.');
    }

    /**
     * Verifica se um objeto é produto de uma determinada Factory
     * @param {*} node Objeto - O objeto para saber se é produto da 'factoryName'
     * @param {*} factoryName String - Nome da factory que deseja saber se produz aquele Objeto 'node'
     */
    isProduct(node, factoryName) {
        if (this[factoryName]){
            return this[factoryName].produces.some((type) => node.constructor.name == type);
        }
        return false;
    }

}

module.exports = Factory;