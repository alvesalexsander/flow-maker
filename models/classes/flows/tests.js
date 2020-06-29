const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('../nodes/index');
const { FlowMap } = require('./index');
const chalk = require('chalk');

let instance;

const instantiation = {
    FlowSequence: function () {
        try {
            instance = new FlowMap({
                name: 'Teste FlowMap',
                segment: 'Pós Pago'
            })
            testeStarting = instance.newNode('starting', {
                name: 'Teste StartingNode Instantiation',
                stepMessage: 'Iniciando Teste'
            });
            instance.newNode('starting', {
                name: 'Teste StartingNode Instantiation2',
            });
            testeTarget = instance.newNode('node', {
                name: 'Teste Node Instantiation',
                stepMessage: 'Finalizando Teste'
            });
            instance.queryNode('Teste Node Instantiation').turnTargetNode();

            instance.linkNext(testeStarting.id, testeTarget.id);

            instance.mapScenarios();
            instance.showScenarios();
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
}

testInstantiation();

function testInstantiation() {
    total = Object.keys(instantiation).length;
    counter = 0;
    for (const each in instantiation) {
        if (instantiation[each]()) {
            console.log(chalk.bgGreen.black(`${each.toUpperCase()} INSTANTIATION TEST :: PASSED`))
            counter++;
        }
    }
    console.log(chalk.bgGreen.black(`${counter} / ${total} TESTS PASSED`))
}