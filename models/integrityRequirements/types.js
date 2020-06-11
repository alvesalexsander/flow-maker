function checkTypeIntegrity(propertyName, property) {
    // Recebe o nome de uma Propriedade e verifica se o tipo está de acordo com o esperado.

    types = {
        id: String,
        name: String,
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
    if (property.constructor == types[propertyName]) {
        return true;
    }
    else {
        console.log(`VERIFY INTEGRITY ERROR :: A Propriedade '${propertyName}'(${property}) não faz parte deste objeto ${this.type} ou não possui a tipagem esperada`);
        return false;
    }
}

module.exports = checkTypeIntegrity;