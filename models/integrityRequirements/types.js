const chalk = require('chalk');

function checkTypeIntegrity(propertyName, property) {
    // Recebe o nome de uma Propriedade e verifica se o tipo está de acordo com o esperado.

    types = {
        id: String,
        name: [ Number, String ],
        fromFlow: String,
        stepMessage: String,
        plugIn: String,
        plugOut: String,
        targetNode: Boolean,
        condition: String,
        conditions: Array,
        pathCases: Array,
        pathNodes: Array,
        expectedMessage: String,
        invokeFlow: String,
        pathAnswers: Array,
        previousNode: String,
        nextNode: String
    };

    if (!types[propertyName]) return;
    if (Array.isArray(types[propertyName])){
        for(const requirement of types[propertyName]){
            if (property.constructor == requirement) return true;
        }
    }
    if (property.constructor == types[propertyName]) {
        return true;
    }
    else {
        console.log(chalk.bgRed.black(`VERIFY INTEGRITY ERROR :: A Propriedade '${propertyName}'(${property}) não faz parte deste objeto ${this.type} ou não possui a tipagem esperada`));
        return false;
    }
}

module.exports = checkTypeIntegrity;