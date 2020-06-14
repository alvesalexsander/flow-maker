const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('../nodes/index');
const { FlowSequence } = require('./index');
const chalk = require('chalk');

let instance;

const instantiation = {
    FlowSequence: function () {
        try {
            node1 = new Node({
                name: 'oi',
                stepMessage: '3'
            });
            node2 = new SwitchNode({
                name: 'verifica se é conta digital',
                condition: 'É conta digital?',
                pathCases: ["Sim", "Não"]
            });
            instance = new FlowSequence({
                previousNode: node1,
                nextNode: node2
            });
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