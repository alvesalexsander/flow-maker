const shortid = require('shortid');
const valueDefault = require('../../integrityRequirements/valueDefault');

const ChartEntity = require('../common/ChartEntity.class');

class Node extends ChartEntity {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    name
    stepMessage
    plugIn
    plugOut
    nextNode
    prevNode
    targetNode = false;

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        plugIn = valueDefault['plugIn'],
        plugOut = valueDefault['plugOut'] }) {
        super();
        this.type = this.constructor.name;
        this.set('id', shortid.generate());
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('plugIn', plugIn);
        this.set('plugOut', plugOut);
    }

    turnTargetNode() {
        this.targetNode && this.targetNode == false(this.targetNode = true);
    }

    isTargetNode() {
        return this.targetNode ? this.targetNode : false
    }

    setNextNode(node) {
        
    }
    
    setPreviousNode(node) {

    }
}

module.exports = Node;