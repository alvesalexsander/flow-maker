const Node = require('./Node.model');

module.exports = class StartingNode extends Node{
    fromFlow

    constructor(){
        this.initialNode = this.fromFlow ? false : true
    }
}