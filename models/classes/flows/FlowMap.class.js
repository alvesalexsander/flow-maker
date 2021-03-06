require('../../../index');
const shortid = require('shortid');
const write = require('write');
const xl = require('excel4node');

const Factory = require('../common/Factory.class');
const NodeRepository = require('../nodes/NodeRepository.class');

class FlowMap {
    factory = new Factory().createNodeFactory();
    nodeRepository = new NodeRepository();

    scenarios = {};
    outlets = [];

    constructor({ name = 'NewFlow', segment = 'CommonSegment', scenarioPrefix = 0 } = {}) {
        this.id = shortid.generate();
        this.name = name;
        this.segment = segment;
        this.scenarioPrefix = scenarioPrefix;
    }

    /**
     * 
     * @param {String} type Tipo do node a ser instanciado.
     * @param {object} params Parametros de instanciação do Node.
     */
    newNode(type, params) {
        try {
            const build = `build${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`;
            const newNode = this.factory[build](params);
            if (newNode) {
                newNode.flowmap = this.id;
                this.nodeRepository.addNode(newNode);
                if (newNode.type == 'StartingNode') {
                    this.inlet = newNode.id;
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
     * @param {String} data Valor da propriedade 'id' de um node ou nome do node.
     */
    queryNode(data) {
        for (const nodeId in this.nodeRepository) {
            let nodeObject = this.nodeRepository.getNode(nodeId);
            // console.log(node.hasOwnProperty('pathNodes'), node.type)
            if (nodeObject.id == data) {
                return this.nodeRepository[nodeObject.id];
            }
            if (nodeObject.name == data) {
                return this.nodeRepository[nodeObject.id];
            }
            if (nodeObject.hasOwnProperty('pathNodes')) {
                for (const path of nodeObject.pathNodes) {
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

    /**
     * Recebe como parametros arrays com pares de id ou objetos Node deste flowMap e os conecta sempre na ordem [fromNode, toNode]
     */
    linkChain() {
        for (const arg in arguments) {
            try{
                if (shortid.isValid(arguments[arg][0].id) && shortid.isValid(arguments[arg][0].id)){
                    this.linkNext(arguments[arg][0].id, arguments[arg][1].id);
                }
                else if(shortid.isValid(arguments[arg][0]) && shortid.isValid(arguments[arg][0])){
                    this.linkNext(arguments[arg][0], arguments[arg][1]);
                }
                else {
                    throw new Error(`FLOWMAP :: LINKCHAIN :: Argumento ${arguments[arg][0]} e ${arguments[arg][1]} deve ser do mesmo tipo. Aceita 'Node'(object) ou 'id'(string)`)
                }
            }
            catch(e) {
                console.log(e);

                // console.log(`FLOWMAP :: LINKCHAIN :: Error conectando os nodes ${arguments[arg][0]} e ${arguments[arg][1]}`);
            }
        }
    }

    /**
     * Conecta um Node a outro Node passando a propriedade id dos mesmos na ordem fromId->toId
     * @param {String} from O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode (atualiza 'nextNode' com o Node-Destino)
     * @param {String} to O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode (atualiza 'prevNode' com o Node-Anterior)
     */
    linkNext(from, to) {
        const updateNextNode = this.nextNodeRules(from, to);
        if (to.id && !from.id && typeof from === 'string' && shortid.isValid(from)) {
            // Se o destino(to) veio um objeto Node e o from veio um 'id', busca o Node com o 'id' from e conecta
            this.queryNode(from).set('nextNode', to.id);
            return;
        }
        else if (from.id && !to.id && typeof to === 'string' && shortid.isValid(to)) {
            // Se a origem(from) veio um objeto Node e o to veio um 'id', busca o Node com o 'id' to e conecta
            from.set('nextNode', this.queryNode(to).id);
            return;
        }
        else if (from.id && to.id) {
            // Se vieram dois objetos Node completos, conecta os dois.
            from.set('nextNode', to.id);
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
                this.queryNode(from).set('nextNode', this.queryNode(to).id);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * Alguns Nodes-Destinos possuem regras especiais para atribuição. Este método verifica se os nodes de uma operação possuem alguma regra especial 
     * e tratam corretamente estas regras para garantir a funcionalidade da operação.
     * @param {String} fromId O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como prevNode
     * @param {String} toId O valor da propriedade 'id' de um Objeto Node a ser conectado a outro como nextNode
     */
    nextNodeRules(fromId, toId) {
        const fromNodeType = this.queryNode(fromId).type;
        const toNodeType = this.queryNode(toId).type;
        const rules = {
            PreconditionsNode: (() => {
                if (fromNodeType == 'PreconditionsNode' && toNodeType == 'PreconditionsNode') {
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
                    return this.queryNode(toId).get('pathNodes').map((path) => path.id);
                }
                this.queryNode(toId).prevNode = this.queryNode(fromId);
                return this.queryNode(toId).get('pathNodes').map((path) => path.id);
                // return this.queryNode(toId).mountPathNodes();
            }),
        }
        if (rules.hasOwnProperty(toNodeType)) {
            return rules[toNodeType]();
        }
        return false;
    }

    /**
     * Inicia o processo de mapeamento de seus nodes a partir do seu startingNode.
     */
    mapScenarios() {
        if (this.inlet) {
            return scenarioTracker.startTracking(this.nodeRepository.getNode(this.inlet))
                .then(() => {
                    this.scenarios = scenarioStorage.extractScenarios();
                })
                .catch(error => console.log(error));
        }
    }

    /**
     * Imprime no terminal o cenários mapeados.
     */
    showScenarios() {
        setTimeout(() => {
            console.log(this.scenarios);
        }, 0);
    }

    /**
     * Imprime no terminal um sumário com informações úteis a respeito desde FlowMap
     */
    getSummary() {
        setTimeout(() => {
            const summary = {
                id: this.id,
                name: this.name,
                segment: this.segment,
                'number of nodes': this.getNodesCount() || '0',
                'number of scenarios': this.getScenariosCount() || '0'
            }
            console.log(summary);
            return summary;
        }, 0);
    }

    /**
     * Conta quantos cenários esse FlowMap possui e retorna o valor
     */
    getScenariosCount() {
        return Object.keys(this.scenarios).length;
    }

    /**
     * Conta quantos nodes este FlowMap possui
     */
    getNodesCount() {
        return Object.keys(this.nodeRepository).length;
    }

    /**
     * Recebe scenarioIndex como parametro e imprime no terminal o cenário do FlowMap com este index.
     * @param {string|number} scenarioIndex Posição do cénario no objeto de cenários deste objeto FlowMap.
     */
    inspectScenario(scenarioIndex){
        setTimeout(() => {
            if (this.scenarios[String(scenarioIndex)]){
                console.log(this.scenarios[String(scenarioIndex)]);
            }
            else {
                console.log(`FLOWMAP :: InspectScenario :: Cenário ${scenarioIndex} não encontrado.`)
            }
        }, 0);
    }

    /**
     * Exporta os cenários deste FlowMap para um arquivo .txt
     */
    exportScenariosToText() {
        setTimeout(() => {
            write.sync('./exportedScenarios/scenarios.txt', JSON.stringify(this.scenarios, null, 2));
        }, 0);
    }

    /**
     * Exporta os cenários deste FlowMap para um arquivo .xlsx
     */
    exportScenariosToExcel() {
        setTimeout(() => {
            const wb = new xl.Workbook(); // Instancia um novo Workbook
            // ------------------------------------------------------ Declaração de estilos -----------------------------------------------------
            const commonStyle = wb.createStyle({ // Cria os estilos para a celulas
                font: {
                    name: 'Calibri',
                },
                alignment: {
                    horizontal: 'left',
                    vertical: 'top',
                    wrapText: true
                },
                border: {
                    left: {
                        style: 'thin',
                        color: '#000000'
                    },
                    right: {
                        style: 'thin',
                        color: '#000000'
                    },
                    top: {
                        style: 'thin',
                        color: '#000000'
                    },
                    bottom: {
                        style: 'thin',
                        color: '#000000'
                    },
                }
            })
            const headerStyle = wb.createStyle({
                ...commonStyle,
                font: {
                    ...commonStyle.font,
                    bold: true,
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: '#DDDDDD'
                },
            })
            const scenarioStyle = wb.createStyle({
                ...commonStyle
            });
            const firstColumnsStyle = wb.createStyle({
                ...commonStyle,
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                },
            })
            // ---------------------------------------------------- Fim  Declaração de estilos -----------------------------------------------------

            const ws = wb.addWorksheet(`${this.name}`); // Cria nova página no Workbook

            // Array de colunas da página
            const firstRow = ['ID', 'Funcionalidade', 'Segmento', 'Dados de Entrada', 'Pré Condição', 'Resultado Esperado', 'Número', 'Data', 'Tester', 'Status',
                'Session ID', 'Observação', 'Encaminhado para', 'Corrigido', 'Status Reteste']

            firstRow.forEach(function (value, i) {
                ws.cell(1, i + 1).string(value).style(headerStyle);
            }); // Faz um loop no array 'firstRow' e formata a célula de cada coluna

            // Váriaveis para calculo dinâmico de width/height das células de precondicao e resultadoEsperado
            let precondicaoWidth = 0;
            let resultadoEsperadoWidth = 0;
            let precondicaoHeight = 0;
            let resultadoEsperadoHeight = 0;

            const zeroPadding = (num, places) => String(num).padStart(places, '0');

            for (const scenario in this.scenarios) {
                // Inicia um loop nos scenarios do FlowMap
                const columnData = {
                    id: this.scenarioPrefix ? `${this.scenarioPrefix + '.' + zeroPadding(scenario, 3)}` : scenario,
                    funcionalidade: this.name,
                    segmento: this.segment,
                    dadosDeEntrada: '',
                    preCondicao: this.scenarios[scenario]['precondition'].join('\n'),
                    resultadoEsperado: this.scenarios[scenario]['expectedResult']
                        .map((sentence) => `${this.scenarios[scenario]['expectedResult'].indexOf(sentence) + 1} - ${sentence}`)
                        .join('\n'),
                };

                for (const sentence of this.scenarios[scenario]['precondition']) {
                    // Descobre maior frase da precondicao e atribui a 'precondicaoWidth'/'precondicaoHeight'
                    if (sentence.length > precondicaoWidth) precondicaoWidth = sentence.length;
                    if (this.scenarios[scenario]['precondition'].length > precondicaoHeight) precondicaoHeight = this.scenarios[scenario]['precondition'].length;
                }
                for (const sentence of this.scenarios[scenario]['expectedResult']) {
                    // Descobre maior frase da precondicao e atribui a 'resultadoEsperadoWidth'/'resultadoEsperadoHeight'
                    if (sentence.length > resultadoEsperadoWidth) resultadoEsperadoWidth = sentence.length;
                    if (this.scenarios[scenario]['precondition'].length > resultadoEsperadoHeight) resultadoEsperadoHeight = this.scenarios[scenario]['precondition'].length;
                }

                // Formata a altura da linha de acordo com a maior altura entre 'precondicaoHeight' e 'resultadoEsperadoHeight'
                let highestHeight = Math.max(precondicaoHeight, resultadoEsperadoHeight);
                ws.row(parseInt(scenario) + 1).setHeight(highestHeight * 18);

                // Zera as váriaveis de altura para o cálculo no próximo loop
                precondicaoHeight = 0;
                resultadoEsperadoHeight = 0;

                let numColumn = 1;
                for (const column in columnData) {
                    numColumn <= 3 && ws.cell(parseInt(scenario) + 1, numColumn)
                        .string(columnData[column])
                        .style(firstColumnsStyle);
                    numColumn > 3 && ws.cell(parseInt(scenario) + 1, numColumn)
                        .string(columnData[column])
                        .style(scenarioStyle);
                    numColumn++;
                }
            }

            ws.column(1).setWidth(10);
            ws.column(2).setWidth(this.name.length);
            ws.column(3).setWidth(this.segment.length);
            ws.column(5).setWidth(precondicaoWidth / 1.8);
            ws.column(6).setWidth(resultadoEsperadoWidth / 2);
            ws.row(1).freeze();

            wb.write(`./exportedScenarios/${this.name} Scenarios.xlsx`);
            console.log(`FlowMap '${this.name}'(${this.id}) - ${this.segment} foi exportado para a pasta 'exportedScenarios' contendo ${this.getScenariosCount()} cenários de teste.`)
        }, 0);
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

}

module.exports = FlowMap;