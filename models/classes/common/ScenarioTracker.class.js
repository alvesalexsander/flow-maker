const shortid = require('shortid');

class ScenarioTracker {

    startTracking(prevStepMessages = [], prevExpectedMessages = [], nodeRoad = {}, startingNode) {
        const promise = new Promise((resolve, reject) => {
            if (startingNode.nextNode) {
                prevStepMessages.push(startingNode.stepMessage);
                prevExpectedMessages.push(startingNode.expectedMessage);
                nodeRoad[Object.keys(nodeRoad).length + 1 || 1] = startingNode.getBasicInfo();

                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad, tracker) {
                        let nextNode = sessionStorage.getNode(thisNode.nextNode);

                        if (nextNode.targetNode) {
                            resolve(tracker.endTrackingScenario(prevStepMessages, prevExpectedMessages, nodeRoad, nextNode));
                        }
                        resolve(tracker.keepTracking(prevStepMessages, prevExpectedMessages, nodeRoad, nextNode));
                    },

                    Array(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad, tracker) {
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

                            resolve(tracker.keepTracking(nodeStepMessage, nodeExpectedMessages, nodeRoad, node));
                        }
                        // for (const node of thisNode.nextNode) {
                        //     if (node.keepTracking) {

                        //     }
                        // }
                    }
                }
                const handleFunction = startingNode.nextNode && startingNode.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, startingNode, prevExpectedMessages, nodeRoad, this);
            }
            else {
                console.log(`WARNING :: ${startingNode.name} ('${startingNode.type}') :: Unexpected end at 'keepTracking' method / nextNode is ${startingNode.nextNode}`);
                console.log(startingNode);
            }
        })
        return promise;
    }

    keepTracking(prevStepMessages, prevExpectedMessages, nodeRoad, node) {
        if (prevStepMessages && node.nextNode) {
            try {
                const handles = {
                    commonNode(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad, tracker) {
                        let nextNode = sessionStorage.getNode(thisNode.nextNode);

                        prevStepMessages.push(thisNode.stepMessage);
                        prevExpectedMessages.push(thisNode.expectedMessage);
                        nodeRoad[Object.keys(nodeRoad).length + 1] = thisNode.getBasicInfo();

                        if (nextNode.targetNode) {
                            tracker.endTrackingScenario(prevStepMessages, prevExpectedMessages, nodeRoad, nextNode);
                        }
                        else {
                            tracker.keepTracking(prevStepMessages, prevExpectedMessages, nodeRoad, nextNode);
                        }
                    },

                    Array(prevStepMessages, thisNode, prevExpectedMessages, nodeRoad, tracker) {
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
                            nodeStepMessage.push(thisNode.stepMessage);
                            nodeExpectedMessages.push(thisNode.expectedMessage);
                            newRoad[Object.keys(nodeRoad).length + 1] = thisNode.getBasicInfo();

                            tracker.keepTracking(nodeStepMessage, nodeExpectedMessages, newRoad, node);
                        }
                    }
                }
                const handleFunction = node.nextNode && node.nextNode.constructor.name == 'Array' ? // Atribui handleFunction apenas se existe nextNode
                    handles['Array'] : handles['commonNode'] // handleFunction para tratar corretamente o comportamento de nextNode
                handleFunction(prevStepMessages, node, prevExpectedMessages, nodeRoad, this);
            }
            catch (error) {
                console.log(`ERROR :: ${node.name} ('${node.type}') :: `);
                console.log(error);
            }
        }
        else {
            console.log(`WARNING :: ${node.name} ('${node.type}') :: Unexpected end at 'keepTracking' method / nextNode is ${node.nextNode}`);
            console.log('Error at: ', node);
        }
    }

    endTrackingScenario(prevStepMessages, prevExpectedMessages, nodeRoad, targetNode) {
        if (targetNode.targetNode == true) {
            prevStepMessages.push(targetNode.stepMessage);
            prevExpectedMessages.push(targetNode.expectedMessage);
            prevStepMessages = prevStepMessages.filter(stepMessage => stepMessage);
            prevExpectedMessages = prevExpectedMessages.filter(expectedMessage => expectedMessage);
            nodeRoad[Object.keys(nodeRoad).length + 1] = targetNode.getBasicInfo();

            const testScenario = {
                precondition: prevStepMessages,
                expectedResult: prevExpectedMessages,
                nodeRoad
            }

            scenarioStorage.pushNewScenarios(testScenario);
        }
    }
    
}

module.exports = ScenarioTracker;