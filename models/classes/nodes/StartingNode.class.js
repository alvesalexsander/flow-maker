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
            if (this.nextNode.targetNode) {
                prevStepMessages.push(this.stepMessage);
                resolve(this.nextNode.endFlowScenario(prevStepMessages));
            }
            else if (Array.isArray(this.nextNode)) {
                for (const node of this.nextNode) {
                    if (node.mapScenarios) {
                        prevStepMessages.push(this.stepMessage);
                        resolve(node.mapScenarios(prevStepMessages));
                    }
                }
            }
            else {
                prevStepMessages.push(this.stepMessage);
                resolve(this.nextNode.mapScenarios(prevStepMessages));
            }
        })
        return promise;
    }
}

module.exports = StartingNode;