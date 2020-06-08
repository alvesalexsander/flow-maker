module.exports = class Node {
    stepMessage
    targetNode = false
    previousStep
    nextStep

    constructor(){
        if (this.stepMessage) {
            this.logStepMessage();
        }
     }

    logStepMessage(){
        return this.stepMessage;
    }
}