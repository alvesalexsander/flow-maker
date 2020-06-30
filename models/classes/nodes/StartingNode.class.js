const valueDefault = require('../../integrityRequirements/valueDefault');

const Node = require('./Node.class');

class StartingNode extends Node {
    // Node inicial de um fluxo (FlowMap)
    fromFlow

    constructor({
        name,
        stepMessage,
        prevNode,
        nextNode,
        fromFlow }) {
        super({ name, stepMessage, prevNode, nextNode });
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

    mapScenarios(prevStepMessages = []) {
        const promise = new Promise((resolve, reject) => {
            const handles = {
                commonNode(prevStepMessages, thisNode) {
                    prevStepMessages.push(thisNode.stepMessage);
                    if (thisNode.nextNode.targetNode) {
                        resolve(thisNode.nextNode.endFlowScenario(prevStepMessages));
                    }
                    resolve(thisNode.nextNode.mapScenarios(prevStepMessages));
                },
    
                Array(prevStepMessages, thisNode) {
                    for (const node of thisNode.nextNode) {
                        if (node.mapScenarios) {
                            prevStepMessages.push(thisNode.stepMessage);
                            resolve(node.mapScenarios(prevStepMessages));
                        }
                    }
                }
            }
            const handleFunction = this.nextNode.constructor.name == 'Array' ? handles['Array'] : handles['commonNode']
            handleFunction(prevStepMessages, this);
            // if (this.nextNode.targetNode) {
            //     prevStepMessages.push(this.stepMessage);
            //     resolve(this.nextNode.endFlowScenario(prevStepMessages));
            // }
            // else if (Array.isArray(this.nextNode)) {
            //     for (const node of this.nextNode) {
            //         if (node.mapScenarios) {
            //             prevStepMessages.push(this.stepMessage);
            //             resolve(node.mapScenarios(prevStepMessages));
            //         }
            //     }
            // }
            // else {
            //     prevStepMessages.push(this.stepMessage);
            //     resolve(this.nextNode.mapScenarios(prevStepMessages));
            // }
        })
        return promise;
    }
}

module.exports = StartingNode;