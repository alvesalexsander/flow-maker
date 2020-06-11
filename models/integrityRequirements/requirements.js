function checkRequirements(property) {
    requirements = {
        id: () => typeof this[property] == 'string',
        name: () => typeof this[property] == 'string',
        stepMessage: () => typeof this[property] == 'string',
        plugIn: () => typeof this[property] == 'string',
        plugOut: () => typeof this[property] == 'string',
        targetNode: () => typeof this[property] == 'boolean',
        condition: () => typeof this[property] == 'string',
        pathCases: () => this[property].length >= 2,
        pathNodes: () => this[property].length >= 2,
        expectedMessage: () => typeof this[property] == 'string',
        invokeFlow: () => typeof this[property] == 'string',
        pathAnswers: () => Array.isArray(this[property])
    };

    return requirements[property];
}
module.exports = checkRequirements;