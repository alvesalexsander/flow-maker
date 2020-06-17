const shortid = require('shortid');

const Factory = require('../common/Factory.class');

class FlowMap {
    factory = new Factory();

    flowchartNodes = [];

    constructor({ name = 'NewFlow' } = {}) {
        this.id = shortid.generate();
    }

    /**
     * 
     * @param {*} type Tipo do Node - Obrigatório
     * @param {*} params Parametros de instanciação do Node ()
     */
    newNode(type, params) {
        const build = `build${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`;
        const newNode = this.factory.node[build](params)
        this.flowchartNodes.push(newNode);
        return newNode;
    }

    queryNode(id) {
        for (const node of this.flowchartNodes) {
            if (node.id == id) {
                return this.flowchartNodes[this.flowchartNodes.indexOf(node)];
            }
        }
        return false;
    }

    linkNext(fromId, toId) {
        const update = this.nextNodeRules(this.queryNode(toId));
        if(update) {
            this.queryNode(fromId).set('nextNode', update);
        }
        else {
            this.queryNode(fromId).set('nextNode', this.queryNode(toId));
        }
        this.queryNode(toId).set('prevNode', this.queryNode(fromId));
    }

    nextNodeRules(node) {
        const nodeType = node.type;
        console.log(nodeType)
        const rules = {
            PreconditionsNode: (() => {
                return node.mountPreconditionsNodes();
            }),
            SwitchNode: (() => {
                return node.mountPathCasesNodes();
            })
        }

        if (rules.hasOwnProperty(nodeType)) {
            return rules[nodeType]();
        }
        return false;
    }
}

teste = new FlowMap();

teste.newNode('node', { name: 'Inicio' });
teste.newNode('preconditions', {
    name: 'Inicio',
    preconditions: ['#desambiguadorPagarConta', '#desambiguador2Via']
});
teste.newNode('node', { name: 'Fim' });


teste.linkNext(teste.flowchartNodes[0].id, teste.flowchartNodes[1].id);
console.log(teste.flowchartNodes);


module.exports = FlowMap;