const Node = require('./Node.model');

module.exports = class Preconditions extends Node{

    constructor(conditions){
        this.conditions = conditions ? conditions : []
    }
}