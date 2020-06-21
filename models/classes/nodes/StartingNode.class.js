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

    mapScenarios() {
        const promise = new Promise((resolve, reject) => {
            if (this.nextNode.targetNode) {
                resolve(this.nextNode.endFlowScenario([]));
            }
            else if (Array.isArray(this.nextNode)) {
                for (const node of this.nextNode) {
                    if (node.mapScenarios) {
                        resolve(node.mapScenarios([]));
                    }
                }
            }
            else {
                resolve(this.nextNode.mapScenarios([]));
            }
        })
        return promise;
    }
}

module.exports = StartingNode;