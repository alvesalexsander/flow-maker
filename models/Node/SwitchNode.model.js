const Node = require('./Node.model');
const DecisionNode = require('./DecisionNode.model');

class SwitchNode extends Node {
    // Node que representa uma decisão condicional.
    pathNodes = []; // Array de DecisionNodes para serem explorados por FlowSequences

    constructor({ name, condition, pathCases }) {
        super({ name });
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        this.setCondition(condition);
        this.setPathCases(pathCases);
        this.mountPathCasesNodes();
    }

    mountPathCasesNodes(pathCases) {
        //Monta array na propriedade 'pathNodes' a partir de 'pathCases'
        if (Array.isArray(this.pathCases) && this.pathCases.length >= 2) {
            for (let caso of this.pathCases) {
                caso = new DecisionNode({ name: `${this.name}(${caso})`, stepMessage: `${this.condition} - ${caso}` });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                this.pathNodes.push(caso);
            }
        }
        else {
            new Error('Necessário, no mínimo, um array com DOIS elementos para pathCases');
        }
    }

    setCondition(condition) {
        // Setter para 'this.condition'
        this.condition = condition ? condition : new Error('Necessário informar condição para criar node do tipo Switch');
        return this;
    }

    setPathCases(pathCases) {
        // Setter para 'this.pathCases'
        this.pathCases = Array.isArray(pathCases) && pathCases.length >= 2 ? pathCases : new Error('Necessário, no mínimo, um array com DOIS elementos para pathCases');
        return this;
    }
}

module.exports = SwitchNode;

// Testes funcionais

// teste = new SwitchNode({
//     name: 'Verifica se o usuário é conta digital',
//     condition: 'É conta digital?',
//     pathCases: ['Sim', 'Não']
// });

// teste.setCondition('testando condição');
// teste.setPathCases(['testando1', 'testando2']);

// console.log(teste);