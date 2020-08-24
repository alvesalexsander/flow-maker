require('../../../index');

const Node = require('./Node.class');
const shortid = require('shortid');

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

    mapScenarios(prevStepMessages = [], prevExpectedMessages = [], nodeRoad = {}) {
        const promise = new Promise((resolve, reject) => {
            if (this.nextNode) {
                prevStepMessages.push(this.stepMessage);
                prevExpectedMessages.push(this.expectedMessage);
                nodeRoad[Object.keys(nodeRoad).length + 1 || 1] = this.getBasicInfo();

                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad) {
                        let nextNode = sessionStorage.getNode(thisNode.nextNode);

                        if (nextNode.targetNode) {
                            resolve(nextNode.endFlowScenario(prevStepMessages, prevExpectedMessages, nodeRoad));
                        }
                        resolve(nextNode.mapScenarios(prevStepMessages, prevExpectedMessages, nodeRoad));
                    },

                    Array(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad) {
                        let nextNodes = [];
                        for (const path of thisNode.nextNode) {
                            if (shortid.isValid(path)) {
                                nextNodes.push(sessionStorage.getNode(path));
                            }
                            else {
                                nextNodes.push(sessionStorage.getNode(path.id));
                            }
                        }

                        for (const node of nextNodes) {
                            let nodeStepMessage = [].concat(prevStepMessages);
                            let nodeExpectedMessages = [].concat(prevExpectedMessages);
                            let newRoad = { ...nodeRoad };
                            newRoad[Object.keys(nodeRoad).length + 1] = thisNode.getBasicInfo();

                            resolve(node.mapScenarios(nodeStepMessage, nodeExpectedMessages, nodeRoad));
                        }
                        // for (const node of thisNode.nextNode) {
                        //     if (node.mapScenarios) {

                        //     }
                        // }
                    }
                }
                const handleFunction = this.nextNode && this.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, this, prevExpectedMessages, nodeRoad);
            }
            else {
                console.log(`WARNING :: ${this.name} ('${this.type}') :: Unexpected end at 'mapScenarios' method / nextNode is ${this.nextNode}`);
                console.log(this);
            }
        })
        return promise;
    }
}

module.exports = StartingNode;