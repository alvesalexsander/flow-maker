const shortid = require('shortid');

const {checkTypeIntegrity} = require('../../integrityRequirements/types');
const checkRequirements = require('../../integrityRequirements/requirements');
const checkIntegrity = require('../../integrityRequirements/checkIntegrity');

class ChartEntity {
    id

    constructor() { }

    set(property, value) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, atribui um novo valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            this[property] = value;
            //console.log(`SET Property :: Object ${this.type} ID: ${this.id} \t| propertyName = ${property} \t| propertyValue = ${this[property]}`);
            this.verifyIntegrity(property, this[property]);
            if (this.eventEmitter) {
                this.eventEmitter.emitEvent(property);
            }
        }
        else {
            console.log(`SET ERROR :: Necessário que a Propriedade '${property}' seja do tipo STRING e EXISTA dentro de ${this.type}(${this.id})`);
        }
    }

    get(property) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, retorna o seu valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            return this[property];
        }
        else {
            this.throwError(`GET ERROR :: Necessário que a Propriedade '${property}' seja do tipo STRING e exista dentro de ${this.type}(${this.id})`);
        }
    }

    verifyIntegrity(propertyName, property) {
        checkIntegrity(propertyName, property);
        return true;
    }

    throwError(message) {
        throw new Error(message);
    }
}

module.exports = ChartEntity;