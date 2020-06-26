const { StartingNode, Node, SwitchNode, DecisionNode } = require('./index');

const { FlowMap } = require('../flows/index');

class SwitchTrackNode extends SwitchNode {

    condition
    trackCases = []
    trackNodes = []

    constructor({
        name,
        condition = '',
        trackCases = [],
        loop = 0
    }) {
        super({ name }); // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.

        this.set('condition', condition);
        this.set('trackCases', trackCases);
        this.set('loop', loop);
        this.mountPathNodes();

        delete this.turnTargetNode;
        delete this.updatePrevNode;
        delete this.pathCases;
        delete this.pathNodes;
    }

    mountPathNodes() {
        if (Array.isArray(this.trackCases)) {
            let caseNodes = [];
            if (this.trackCases.length > 2) console.log(`WARNING :: SwitchTrackNode (${this.id}) :: trackCases possui mais do que 2 elementos. Serão considerados apenas os 2 primeiros elementos do array`);
            for (let caso of this.trackCases) {
                caso = new DecisionNode({
                    name: `${caso}`,
                    stepMessage: `${this.condition} - ${caso}`,
                    plugIn: this.plugIn,
                    // prevNode: this.prevNode,
                });
                caso.parent = this.id;
                delete caso.targetNode; // 'this.targetNode' não faz sentido existir em um SwitchNode porque não deve ser um Objetivo Final de busca.
                delete this.turnTargetNode;
                caseNodes.push(caso);
            }
            this.trackNodes = caseNodes;
            return this.trackNodes;
        }
    }

    getPath(pathName) {
        if (Array.isArray(this.trackNodes)) {
            try {
                if(this.trackNodes.filter((path) => pathName.toLowerCase() == path.name.toLowerCase()).length == 1){
                    return this.trackNodes.filter((path) => pathName.toLowerCase() == path.name.toLowerCase())[0];
                }
                else {
                    throw new Error(` :: getPath :: Decisão de SwitchNode(${this.name}) com nome '${pathName}' não é válida.`);
                }
            }
            catch(e) {
                console.log(e);
                // console.log(`ERROR :: getPath :: Decisão de SwitchNode(${this.name}) com nome '${pathName}' não é válida.`);
            }
            
        }
        return false;
    }

    mapScenarios(prevStepMessages = []) {
        console.log('passou')
        if (this.loop > 0) {
            this.set('stepMessage', this.trackCases[0].stepMessage);
            this.set('nextNode', this.trackCases[0].nextNode);
            this.loop--;
            prevStepMessages.push(this.stepMessage);
            super.mapScenarios(prevStepMessages);
        }
        else {
            this.stepMessage = this.trackCases[1].stepMessage;
            this.set('nextNode', this.trackCases[0].nextNode);
            prevStepMessages.push(this.stepMessage);
            super.mapScenarios(prevStepMessages);
        }
    }

}

let testMap = new FlowMap({
    name: 'teste map'
});

let final = new Node({
    name: 'final',
    stepMessage: 'final'
}).turnTargetNode();

let teste = new SwitchTrackNode({
    name: 'teste', 
    trackCases: ['não', 'sim']
})
teste.getPath('sim').set('nextNode', final);


let start = new StartingNode({
    name:'start',
    stepMessage: 'start'
}).set('nextNode', teste);

teste.getPath('não').set('nextNode', start);

start.mapScenarios();
