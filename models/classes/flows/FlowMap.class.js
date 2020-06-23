const shortid = require('shortid');

const Factory = require('../common/Factory.class');

class FlowMap {
    factory = new Factory().createNodeFactory();

    flowchartNodes = [];
    scenarios = {};

    constructor({ name = 'NewFlow' } = {}) {
        this.id = shortid.generate();
        this.name = name;
    }

    /**
     * 
     * @param {*} type Tipo do Node - Obrigatório
     * @param {*} params Parametros de instanciação do Node ()
     */
    newNode(type, params) {
        try {
            const build = `build${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`;
            const newNode = this.factory[build](params);
            if (newNode) {
                newNode.flowmap = this.id;
                this.flowchartNodes.push(newNode);
                if (newNode.type == 'StartingNode') {
                    this.startingNode = newNode;
                }
                return newNode;
            }
        }
        catch (e) {
            throw new Error(`NEWNODE :: Erro na criação de node. Verifique os parametros passados - type: '${type}', params: '${JSON.stringify(params)}`)
        }
    }

    /**
     * Localiza um Node pelo 'id' dentro do container de Nodes 'flowchartNode' criado neste FlowMap.
     * @param {*} data String - Valor da propriedade 'id' de um node ou nome do node.
     */
    queryNode(data) {
        for (const node of this.flowchartNodes) {
            // console.log(node.hasOwnProperty('pathNodes'), node.type)
            if (node.id == data) {
                return this.flowchartNodes[this.flowchartNodes.indexOf(node)];
            }
            if (node.name == data) {
                return this.flowchartNodes[this.flowchartNodes.indexOf(node)];
            }
            if (node.hasOwnProperty('pathNodes')) {
                for (const path of node.pathNodes) {
                    if (path.id == data) {
                        return path;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Conecta um Node a outro Node passando a propriedade id dos mesmos na ordem fromId->toId
     * @param {*} fromId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode (atualiza 'nextNode' com o Node-Destino)
     * @param {*} toId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode (atualiza 'prevNode' com o Node-Anterior)
     */
    linkNext(fromId, toId) {
        // const updateNextNode = this.nextNodeRules(fromId, toId);
        const updateNextNode = this.nextNodeRules(fromId, toId);
        const updatePrevNode = this.prevNodeRules(toId, fromId);
        if (updateNextNode) {
            try {
                this.queryNode(fromId).set('nextNode', updateNextNode);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                this.queryNode(fromId).set('nextNode', this.queryNode(toId));
            }
            catch (e) {
                console.log(e);
            }
        }
        /* if (updatePrevNode) {
            this.queryNode(toId).set('prevNode', updatePrevNode);
        }
        else {
            this.queryNode(toId).set('prevNode', this.queryNode(fromId));
        } */
    }

    /**
     * Alguns Nodes-Destinos possuem regras especiais para atribuição. Este método verifica se os nodes de uma operação possuem alguma regra especial 
     * e tratam corretamente estas regras para garantir a funcionalidade da operação.
     * @param {*} fromId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode
     * @param {*} toId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode
     */
    nextNodeRules(fromId, toId) {
        const fromNodeType = this.queryNode(fromId).type;
        const toNodeType = this.queryNode(toId).type
        const rules = {
            PreconditionsNode: (() => {
                if (fromNodeType == 'PreconditionsNode' && toNodeType == 'PreconditionsNode') {
                    // /* this.queryNode(toId).set('prevNode', this.queryNode(fromId));
                    // this.queryNode(fromId).nextNode = this.queryNode(fromId).mountPathNodes();
                    // return this.queryNode(toId).mountPathNodes(); */
                    const errorMessage = 'Error Linking PreconditionNode a outro PreconditionNode :: Por favor, unifique os dois nós de precondicao em um só.'
                    console.log(new Error(errorMessage))
                }
                this.queryNode(toId).set('prevNode', this.queryNode(fromId));
                return this.queryNode(toId).mountPathNodes();
            }),
            SwitchNode: (() => {
                if (fromNodeType == "PreconditionsNode") {
                    this.queryNode(toId).set('prevNode', this.queryNode(fromId));
                    this.queryNode(toId).mountPathNodes();
                }
                this.queryNode(toId).prevNode = this.queryNode(fromId);
                return this.queryNode(toId).mountPathNodes();
            }),
        }
        if (rules.hasOwnProperty(toNodeType)) {
            return rules[toNodeType]();
        }
        return false;
    }

    /**
     * Alguns Nodes-Anteriores possuem regras especiais para atribuição. Este método verifica se os nodes de uma operação possuem alguma regra especial 
     * e tratam corretamente estas regras para garantir a funcionalidade da operação.
     * @param {*} fromId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode
     * @param {*} toId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode
     */
    prevNodeRules(toId, fromId) {
        const fromNodeType = this.queryNode(fromId).type;
        const toNodeType = this.queryNode(toId).type
        const rules = {
            PreconditionsNode: (() => {
                if (toNodeType == 'SwitchNode') {
                    this.queryNode(fromId).nextNode = this.queryNode(toId).mountPathNodes();
                    this.queryNode(fromId).mountPathNodes();
                    return this.queryNode(toId).pathNodes;
                }
                if (fromNodeType == 'PreconditionsNode' && toNodeType == 'PreconditionsNode') {
                    this.queryNode(fromId).nextNode = this.queryNode(toId).mountPathNodes();
                    return this.queryNode(toId).pathNodes;
                }
                this.queryNode(fromId).set('nextNode', this.queryNode(toId));
                this.queryNode(fromId).mountPathNodes();
                return true;
            })
        }
        if (rules.hasOwnProperty(fromNodeType)) {
            return rules[fromNodeType]();
        }
        return false;
    }

    mapScenarios() {
        if (this.startingNode) {
            this.startingNode.mapScenarios()
                .then(() => {
                    this.scenarios = scenarioStorage.extractScenarios();
                    console.log(this.scenarios);
                })
                .catch(error => console.log(error));
        }
    }
}

// teste = new FlowMap();

// teste.newNode('starting', { name: 'Inicio' });
// teste.newNode('preconditions', { name: 'Precondicao', preconditions: ['#desambiguadorPagarConta', '#desambiguador2Via'] });

// teste.newNode('switch', { name: 'Verifica Conta Digital', condition: 'É conta Digital?', pathCases: ['Sim', 'Não'] });
// teste.newNode('node', { name: 'Fim' });
// teste.queryNode('Fim').turnTargetNode();

// 
// teste.linkNext(teste.queryNode('Inicio').id, teste.queryNode('Precondicao').id);

// teste.linkNext(teste.queryNode('Precondicao').id, teste.queryNode('Verifica Conta Digital').id);
// teste.linkNext(teste.queryNode('Verifica Conta Digital').getPath('Sim').id, teste.queryNode('Fim').id);
// teste.linkNext(teste.queryNode('Verifica Conta Digital').getPath('Não').id, teste.queryNode('Fim').id);



// // // teste.linkNext(teste.queryNode('Precondicao').id, teste.queryNode('Fim').id);
// // // console.log(teste.queryNode('Verifica Conta Digital'))

// teste.flowchartNodes[0].mapScenarios();

module.exports = FlowMap;