const Node = require('./Node.model');

module.exports = class OutputMessageNode extends Node {

    constructor(message) {
        this.message = message ? message : new Error('Necessário informar uma mensagem esperada');
    }

    getExpectedOutput(){
        return this.message;
    }
}