const shortid = require('shortid');
const valueDefault = require('../../integrityRequirements/valueDefault');

const ChartEntity = require('../common/ChartEntity.class');

const EventEmitter = require('../shared/EventEmitter.class');

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
        plugOut = valueDefault['plugOut'],
        prevNode = valueDefault['prevNode'],
        nextNode = valueDefault['nextNode'] }) {
        super();
        // this.eventEmitter = new EventEmitter(this);

        this.type = this.constructor.name;
        this.set('id', shortid.generate());
        this.set('name', name);
        this.set('stepMessage', stepMessage);
        this.set('plugIn', plugIn);
        this.set('plugOut', plugOut);
        this.set('prevNode', prevNode);
        this.set('nextNode', nextNode);
    }

    turnTargetNode() {
        if (this.targetNode == false) {
            this.targetNode = true;
        }
    }

    isTargetNode() {
        return this.targetNode ? this.targetNode : false
    }

    setPrevNode(node) {
        this.set('prevNode', node);
        switch (node.type) {
            case 'Node':
            case 'OutputMessageNode':
            case 'InvokerNode':
            case 'StartingNode':
                this.prevNode = node;
                break;
            case 'SwitchNode':
                this.prevNode = node.pathNodes;
                break;
            case 'PreconditionsNode':
                this.prevNode = node.preconditionsNodes;
                break;
        }

    }

    setNextNode(node) {
        this.set('nextNode', node);
        switch (node.type) {
            case 'Node':
            case 'OutputMessageNode':
            case 'InvokerNode':
                this.nextNode = node;
                break;
            case 'SwitchNode':
                this.nextNode = node.pathNodes;
                break;
            case 'PreconditionsNode':
                this.nextNode = node.preconditionsNodes;
                break;
        }
        let update = node.setPrevNode(this);
        // console.log(this.nextNode);
        if (update){
            this[update[0]] = update[1];
            // console.log(this.nextNode);
        }
    }

    updateNextNodeValues(values){
        this.nextNode = values;
    }

    mapScenarios(prevStepMessages) {
        // console.log(this.type)
        if (prevStepMessages) {
            if (this.stepMessage != undefined){
                if (this.nextNode.targetNode) {
                    prevStepMessages.push(this.stepMessage);
                    this.nextNode.endFlowScenario(prevStepMessages);
                }
                else if (Array.isArray(this.nextNode)) {
                    for (const node of this.nextNode) {
                        let nodeStepMessage = [].concat(prevStepMessages);
                        nodeStepMessage.push(this.stepMessage);
                        node.mapScenarios(nodeStepMessage);
                    }
                }
                else {
                    prevStepMessages.push(this.stepMessage);
                    this.nextNode.mapScenarios(prevStepMessages);
                }
            }
            else {
                if (this.nextNode.targetNode) {
                    this.nextNode.endFlowScenario(prevStepMessages);
                }
                else if (Array.isArray(this.nextNode)) {
                    for (const node of this.nextNode) {
                        let nodeStepMessage = [].concat(prevStepMessages);
                        node.mapScenarios(nodeStepMessage);
                    }
                }
                else {
                    this.nextNode.mapScenarios(prevStepMessages);
                }
            }
        }
        else{
            this.mapScenarios([]);
        }
    }

    endFlowScenario(prevStepMessages) {
        if (this.targetNode == true) {
            prevStepMessages.push(this.stepMessage);
            console.log(prevStepMessages);
        }
    }


    getNextNode() {
        if (this.nextNode) {
            return this.nextNode;
        }
        return false;
    }

    getPrevNode() {
        if (this.prevNode) {
            return this.prevNode;
        }
        return false;
    }

    updatePrevNodeDestination() {
        this.prevNode && this.prevNode.setNextNode(this);
    }

    updateNextNodeOrigin() {
        this.nextNode && this.nextNode.setPrevNode(this);
    }
}

module.exports = Node;