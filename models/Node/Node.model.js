class Node {
    // Node básico. Contém propriedades e metódos que podem ser extendidos por quase todos os outros Nodes.
    targetNode = false;

    constructor({ name, stepMessage }) {
        this.setName(name);
        if (stepMessage) {
            this.setStepMessage(stepMessage);
        }
        this.type = this.constructor.name;
    }

    turnTargetNode() {
        if (this.targetNode) {
            this.targetNode = true;
        }
        else {
            return
        }
        return this;
    }

    isTargetNode() {
        return this.targetNode ? this.targetNode : false
    }

    getName() {
        return this.name;
    }

    getStepMessage() {
        if (this.setStepMessage) {
            return this.stepMessage;
        }
    }

    setName(name) {
        this.name = name ? name : null;
        return this;
    }

    setStepMessage(stepMessage) {
        if (typeof stepMessage == 'string') {
            this.stepMessage = stepMessage ? stepMessage : null;
        }
        return this;
    }


}

module.exports = Node;

// Testes funcionais

// teste = new Node({
//     name: 'oi',
//     stepMessage: 'tchau'
// });

// console.log(teste.getName());
// console.log(teste.getStepMessage());
// console.log(teste.isTargetNode());
// teste.setName('setName TESTADO');
// teste.setStepMessage('setStepMessage TESTADO');
// teste.turnTargetNode();

// console.log(teste);