const Node = require('./Node.class');
const DecisionNode = require('./DecisionNode.class');

class SwitchNode extends Node {
    // Node que representa uma decisão condicional.
    condition
    pathCases
    pathNodes = []; // Array de DecisionNodes para serem explorados por FlowSequences


    constructor({ name='', stepMessage='', condition='', pathCases='', plugIn='' }) {
        super({ name });
        this.set('condition', condition);
        this.set('plugIn', plugIn);
        this.set('pathCases', pathCases);
        this.set('pathNodes', this.mountPathCasesNodes());
        delete this.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
        delete this.plugOut;
    }

    mountPathCasesNodes(pathCases) {
        //Monta array na propriedade 'pathNodes' a partir de 'pathCases'
        if (Array.isArray(this.pathCases) && this.pathCases.length >= 2) {
            let caseNodes = [];
            for (let caso of this.pathCases) {
                caso = new DecisionNode({
                    name: `${this.name}(${caso})`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn });
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                caseNodes.push(caso);
            }
            return caseNodes;
        }
        else {
            this.throwError('Necessário, no mínimo, um array com DOIS elementos para pathCases');
        }
    }

    setCondition(condition) {
        // Setter para 'this.condition'
        this.condition = condition ? condition : this.throwError('Necessário informar condição para criar node do tipo Switch');
    }

    setPathCases(pathCases) {
        // Setter para 'this.pathCases'
        this.pathCases = Array.isArray(pathCases) && pathCases.length >= 2 ? pathCases : this.throwError('Necessário, no mínimo, um array com DOIS elementos para pathCases');
    }
}

module.exports = SwitchNode;

// Testes funcionais

teste = new SwitchNode({
    name: 'Verifica se o usuário é conta digital',
    condition: 'É conta digital?',
    pathCases: ['Sim', 'Não'],
    plugIn: 'testePassarLinkIn'
});

// teste.setCondition('testando condição');
// teste.setPathCases(['testando1', 'testando2']);

console.log(teste);