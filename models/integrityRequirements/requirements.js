const shortid = require('shortid');

function checkRequirements(propertyName, property) {
    // Checa a integridade em relação aos requisitos mínimos de cada propriedade
    requirements = {
        id: () => shortid.isValid(property),
        name: () => typeof property == 'string',
        stepMessage: () => typeof property == 'string',
        plugIn: () => typeof property == 'string',
        plugOut: () => typeof property == 'string',
        targetNode: () => typeof property == 'boolean',
        condition: () => typeof property == 'string',
        pathCases: () => property.length >= 2,
        pathNodes: () => property.length >= 2,
        expectedMessage: () => typeof property == 'string',
        invokeFlow: () => typeof property == 'string',
        pathAnswers: () => Array.isArray(property)
    };

    if (requirements[propertyName]() == true){
        return true;
    }
    else {
        return false;
    }
}
module.exports = checkRequirements;