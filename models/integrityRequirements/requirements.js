const shortid = require('shortid');

function checkRequirements(propertyName, property) {
    // const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('../classes/nodes/index');
    // const allNodeTypes = require('../classes/nodes/index');
    const { types } = require('./types');

    // Checa a integridade em relação aos requisitos mínimos de cada propriedade
    // propertyName<string> - Nome da propriedade, usado para chamar props de 'requirements'
    // property<any> - Valor da propriedade

    requirements = {
        id: () => shortid.isValid(property),
        name: () => typeof property === 'string',
        fromFlow: () => typeof property == 'string',
        stepMessage: () => typeof property == 'string',
        plugIn: () => typeof property == 'string',
        plugOut: () => typeof property == 'string',
        targetNode: () => typeof property == 'boolean',
        condition: () => typeof property == 'string',
        preconditions: () => Array.isArray(property),
        pathCases: () => property.length >= 2,
        pathNodes: () => property.length >= 2,
        expectedMessage: () => typeof property == 'string',
        invokeFlow: () => typeof property == 'string',
        pathAnswers: () => Array.isArray(property),
        // previousNode: () => types['previousNode'],
        // nextNode: () => types['nextNode'],
        // prevNode: () => types['prevNode']
    };

    if (!requirements[propertyName]) return true;
    if (requirements[propertyName]() == true) {
        return true;
    }
    else {
        return false;
    }
}
module.exports = checkRequirements;