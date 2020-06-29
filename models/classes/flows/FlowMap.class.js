require('../../../index');
const shortid = require('shortid');

const Factory = require('../common/Factory.class');

class FlowMap {
    factory = new Factory().createNodeFactory();

    flowchartNodes = [];
    scenarios = {};
    outlets = [];

    constructor({ name = 'NewFlow', segment = 'CommonSegment' } = {}) {
        this.id = shortid.generate();
        this.name = name;
        this.segment = segment;
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
                    this.inlet = this.queryNode(newNode.id);
                    this.factory.buildStarting = () => console.log('NODEFACTORY :: StartingNode already created :: StartingNode production Closed.');
                    this.factory.produces = this.factory.produces.filter(product => product != 'StartingNode');
                    console.log('NODEFACTORY :: StartingNode created successfully :: StartingNode production Closed.');
                }
                return newNode;
            }
        }
        catch (e) {
            throw new Error(e)
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
                    else if (path.name == data) {
                        return path;
                    }
                }
            }
        }
        return false;
    }

    // // UNDER DEVELOPMENT
    // setOutlet(nodeName) {
    //     if (this.queryNode(nodeName)) {
    //         const outletNode = this.newNode('node', {
    //             name: `Outlet ${nodeName}`
    //         })
    //         this.linkNext(this.queryNode(nodeName), outletNode);
    //         this.outlets.push(outletNode);
    //         return true;
    //     }
    //     return false;
    // }

    // getOutlet(nodeName) {
    //     const outletNode = this.outlets.filter(outletName => nodeName == outletName)
    //     if (outletNode.length == 1) {
    //         return this.queryNode(outletNode[0]);
    //     }
    //     return false;
    // }

    // showOutlets() {
    //     console.log(this.outlets);
    // }

    // getInlet() {
    //     if (this.inlet) {
    //         return this.inlet;
    //     }
    // }

    /**
     * Conecta um Node a outro Node passando a propriedade id dos mesmos na ordem fromId->toId
     * @param {*} from String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode (atualiza 'nextNode' com o Node-Destino)
     * @param {*} to String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode (atualiza 'prevNode' com o Node-Anterior)
     */
    linkNext(from, to) {
        const updateNextNode = this.nextNodeRules(from, to);
        if (to.id && !from.id) {
            this.queryNode(from).set('nextNode', to);
            return;
        }
        else if (from.id && !to.id) {
            from.set('nextNode', this.queryNode(to));
            return;
        }
        else if (from.id && to.id) {
            from.set('nextNode', to);
            return;
        }
        if (updateNextNode) {
            try {
                this.queryNode(from).set('nextNode', updateNextNode);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                this.queryNode(from).set('nextNode', this.queryNode(to));
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * Alguns Nodes-Destinos possuem regras especiais para atribuição. Este método verifica se os nodes de uma operação possuem alguma regra especial 
     * e tratam corretamente estas regras para garantir a funcionalidade da operação.
     * @param {*} fromId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode
     * @param {*} toId String - O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode
     */
    nextNodeRules(fromId, toId) {
        const fromNodeType = this.queryNode(fromId).type;
        const toNodeType = this.queryNode(toId).type;
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
                if (fromNodeType == "DecisionNode") {
                    this.queryNode(toId).set('prevNode', this.queryNode(fromId));
                    return this.queryNode(toId).get('pathNodes');
                }
                this.queryNode(toId).prevNode = this.queryNode(fromId);
                return this.queryNode(toId).get('pathNodes');
                // return this.queryNode(toId).mountPathNodes();
            }),
        }
        if (rules.hasOwnProperty(toNodeType)) {
            return rules[toNodeType]();
        }
        return false;
    }

    mapScenarios() {
        if (this.inlet) {
            return this.inlet.mapScenarios()
                .then(() => {
                    this.scenarios = scenarioStorage.extractScenarios();
                    // console.log(this.scenarios);
                })
                .catch(error => console.log(error));
        }
    }

    showScenarios() {
        setTimeout(() => {
            console.log(this.scenarios);
        }, 0);
    }

    getScenarios() {
        return new Promise((resolve) => {
            resolve(this.mapScenarios());
        })
            .then((result) => {
                return this.scenarios;
            })
            .catch(error => console.log(error))
    }
}

module.exports = FlowMap;