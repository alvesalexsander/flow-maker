const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class StartingNode extends Node {
    // Node inicial de um fluxo (FlowMap)
    fromFlow

    constructor({
        name = valueDefault['name'],
        stepMessage = valueDefault['stepMessage'],
        prevNode = valueDefault['prevNode'],
        nextNode = valueDefault['nextNode'],
        fromFlow = valueDefault['fromFlow'] }) {
        super({ name, stepMessage, prevNode, nextNode });
        // this.eventEmitter = new EventEmitter(this);
        // this.eventEmitter.newEvent('prevNode', 'updatePrevNodeDestination');
        // this.eventEmitter.newEvent('nextNode', 'updateNextNodeOrigin');
        this.set('fromFlow', fromFlow);
        this.set('prevNode', this.prevNode);
        this.initialNode = this.fromFlow || this.prevNode ? false 
        : (() => {
            delete this.fromFlow && delete this.prevNode
            return true;
        })();
        delete this.targetNode;
        delete this.turnTargetNode;
    }

    setFromFlow(fromFlow) {
        this.fromFlow = fromFlow ? fromFlow : '';
        this.initialNode = this.fromFlow ? false : true;
    }

    // mapScenarios(){
    //     if(this.nextNode.targetNode){
    //         this.nextNode.endFlowScenario([this.stepMessage]);
    //     }
    //     else if (Array.isArray(this.nextNode)){
    //         for (const node of this.nextNode){
    //             node.mapScenarios([this.stepMessage])
    //         }
    //     }
    //     else{
    //         this.nextNode.mapScenarios([this.stepMessage]);
    //     }
    // }

    // setNextNode(node){
    //     this.set('nextNode', node);
    //     this.eventEmitter.externalEvents = [];
    //     this.eventEmitter.subscribe(node);
    // }
}

module.exports = StartingNode;