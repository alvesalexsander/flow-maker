const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('./index');

const chalk = require('chalk');

let instance;

const instantiation = {
    Node: function () {
        try {
            instance = new Node({
                name: 'oi',
                stepMessage: '3'
            });
            instance.turnTargetNode();
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    StartingNode: function () {
        try {
            instance = new StartingNode({
                name: 'oi',
                fromFlow: 'oi'
            })
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    PreconditionsNode: function () {
        try {
            instance = new PreconditionsNode({
                name: 'instance',
                preconditions: [
                    'veio de #desambiguadorNaoRecebimentoDeConta',
                    'veio de #desambiguadorPagarConta'
                ],
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    OutputMessageNode: function () {
        try {
            instance = new OutputMessageNode({
                name: 'oi',
                stepMessage: 'tchau',
                expectedMessage: 'to te vendo'
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    SwitchNode: function () {
        try {
            instance = new SwitchNode({
                name: 'verifica se é conta digital',
                condition: 'É conta digital?',
                pathCases: ["Sim", "Não"]
            });

            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    DecisionNode: function () {
        try {
            instance = new DecisionNode({
                name: 'oi',
                stepMessage: 'tchau'
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false
        }
    },
    InvokerNode: function () {
        try {
            instance = new InvokerNode({
                name: 'oi',
                stepMessage: 'tchau',
                invokeFlow: 'any',
                pathAnswers: ['sim']
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
    failed = [];
    for (const each in instantiation) {
        if (instantiation[each]()) {
            console.log(chalk.bgGreen.black(`${each.toUpperCase()} :: INSTANTIATION TEST :: PASSED`))
            counter++;
        }
        else {
            failed.push(each);
        }
    }
    if (counter == total) {
        console.log(chalk.bgGreen.black(`${counter} / ${total} TESTS PASSED`));
        return true;
    }
    else {
        console.log(chalk.bgRed.black(`${total - counter} TESTS FAILED`));
        console.log(chalk.bgRed.black(`${failed.toString().toUpperCase()} TESTS FAILED`));
        return false;
    }
}