const shortid = require('shortid');

const propertiesTypes = require('../../types/Nodes.types');

class ChartEntity {
    id

    constructor() {
        this.set('id', shortid.generate());
    }

    set(property, value) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, atribui um novo valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            this[property] = value;
            this.verifyTypeIntegrity(property);
        }
        else{
            this.throwError(`SET ERROR :: Necessário que a Propriedade'${property}' seja do tipo STRING e exista dentro de ${this.type}`);
        }
    }

    get(property) {
        // Verifica se o objeto instanciado possui a propriedade. Caso sim, retorna o seu valor.
        if (this.hasOwnProperty(property) && typeof property == 'string') {
            return this[property];
        }
        else {
            this.throwError(`GET ERROR :: Necessário que a Propriedade '${property}' seja do tipo STRING e exista dentro de ${this.type}`);
        }
    }

    verifyTypeIntegrity(property) {
        // Recebe o nome de uma Propriedade e verifica se o tipo está de acordo com o esperado.
        if (this[property].constructor == propertiesTypes[property]) { }
        else {
            this.throwError(`VERIFY INTEGRITY ERROR :: A Propriedade '${property}' não faz parte deste objeto ${this.type} ou não possui a tipagem esperada`);
        }
    }

    throwError(message) {
        throw new Error(message);
    }
}

module.exports = ChartEntity;