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
        const updateNextNode = this.nextNodeRules(fromId, toId);
        const updateThisNode = this.prevNodeRules(toId, fromId);
        if (updateNextNode) {
            this.queryNode(fromId).set('nextNode', updateNextNode);
        }
        else {
            this.queryNode(fromId).set('nextNode', this.queryNode(toId));
        }
        if (updateThisNode) {
            updateNextNode();
        }
        else {
            this.queryNode(toId).set('prevNode', this.queryNode(fromId));
        }
    }

    nextNodeRules(fromId, toId) {
        const nodeType = this.queryNode(toId).type;
        const rules = {
            PreconditionsNode: (() => {
                this.queryNode(toId).set('prevNode', this.queryNode(fromId));
                this.queryNode(fromId).nextNode = this.queryNode(toId).mountPreconditionsNodes();
                // .set('nextNode', this.queryNode(toId).mountPreconditionsNodes());
                // console.log(this.queryNode(fromId).nextNode)
                return this.queryNode(toId).mountPreconditionsNodes();
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

    prevNodeRules(toId, fromId) {
        const nodeType = this.queryNode(fromId).type;
        const rules = {
            PreconditionsNode: (() => {
                this.queryNode(toId).set('prevNode', this.queryNode(fromId).preconditionsNodes);
                this.queryNode(fromId).set('nextNode', this.queryNode(toId));
                this.queryNode(fromId).mountPreconditionsNodes();
            }),
            SwitchNode: (() => {
                return node.mountPathCasesNodes;
            })
        }

        if (rules.hasOwnProperty(nodeType)) {
            return rules[nodeType]();
        }
        return false;
    }

    refreshNodes() {
        for (const node of this.flowchartNodes) {
            try {
                this.queryNode(node.id).prevNode = Array.isArray(this.queryNode(this.queryNode(node.id).prevNode)) ?
                    (() => {
                        for (const condition of this.queryNode(this.queryNode(node.id).prevNode)) {
                            return this.queryNode(this.queryNode(node.id).prevNode[this.queryNode(node.id).prevNode.indexOf(condition)].id).mountNodes()
                        }
                    }) : this.queryNode(this.queryNode(node.id).prevNode);
                    this.queryNode(node.id).nextNode = Array.isArray(this.queryNode(this.queryNode(node.id).nextNode)) ?
                    (() => {
                        for (const condition of this.queryNode(this.queryNode(node.id).nextNode)) {
                            return this.queryNode(this.queryNode(node.id).nextNode[this.queryNode(node.id).nextNode.indexOf(condition)].id).mountNodes()
                        }
                    }) : this.queryNode(this.queryNode(node.id).nextNode);
            }
            catch (error){
                console.log(error);
            }
        }
    }
}

teste = new FlowMap();

teste.newNode('starting', { name: 'Inicio' });
teste.newNode('preconditions', {
    name: 'Precondicao',
    preconditions: ['#desambiguadorPagarConta', '#desambiguador2Via']
});
teste.newNode('node', { name: 'Fim' });
teste.flowchartNodes[2].turnTargetNode();


teste.linkNext(teste.flowchartNodes[0].id, teste.flowchartNodes[1].id);
teste.linkNext(teste.flowchartNodes[1].id, teste.flowchartNodes[2].id);


// console.log(teste.flowchartNodes[1].preconditionsNodes[0], 'dentro do flowmap')
teste.flowchartNodes[0].mapScenarios();

module.exports = FlowMap;