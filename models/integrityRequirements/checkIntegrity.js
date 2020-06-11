const checkType = require('./types');
const checkRequirements = require('./requirements');

const chalk = require('chalk');

function checkIntegrity(propertyName, property) {
    if (!checkType(propertyName, property)) {
        console.log(chalk.bgRed.black(`FAIL :: VERIFY TYPES :: Object ${this.type} ID: ${this.id} \t| '${propertyName}' ERROR `));
        return false;
    }
    if (!checkRequirements(propertyName, property)) {
        console.log(chalk.bgRed.black(`FAIL :: VERIFY REQUIREMENT :: Object ${this.type} ID: ${this.id} \t| '${propertyName}' ERROR `));
        return false;
    }
    return true;
}

module.exports = checkIntegrity;