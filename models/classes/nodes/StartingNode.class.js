const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class StartingNode extends Node {
    // Node inicial de um fluxo (FlowMap)
    fromFlow

    constructor({
        name,
        stepMessage,
        expectedMessage,
        prevNode,
        nextNode,
        fromFlow }) {
        super({ name, stepMessage, expectedMessage, prevNode, nextNode });
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

    mapScenarios(prevStepMessages = [], prevExpectedMessages = []) {
        const promise = new Promise((resolve, reject) => {
            if(this.nextNode){
                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages) {
                        prevStepMessages.push(thisNode.stepMessage);
                        prevExpectedMessages.push(thisNode.expectedMessage);
                        if (thisNode.nextNode.targetNode) {
                            resolve(thisNode.nextNode.endFlowScenario(prevStepMessages, prevExpectedMessages));
                        }
                        resolve(thisNode.nextNode.mapScenarios(prevStepMessages, prevExpectedMessages));
                    },
        
                    Array(prevStepMessages, thisNode, prevExpectedMessages) {
                        for (const node of thisNode.nextNode) {
                            if (node.mapScenarios) {
                                prevStepMessages.push(thisNode.stepMessage);
                                prevExpectedMessages.push(thisNode.expectedMessage);
                                resolve(node.mapScenarios(prevStepMessages, prevExpectedMessages));
                            }
                        }
                    }
                }
                const handleFunction = this.nextNode && this.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                        handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                    handleFunction(prevStepMessages, this, prevExpectedMessages);
            }
            else {
                console.log(`WARNING :: ${this.name} ('${this.type}') :: Unexpected end at 'mapScenarios' method / nextNode is ${this.nextNode}`);
                console.log(prevStepMessages);
            }
        })
        return promise;
    }
}

module.exports = StartingNode;