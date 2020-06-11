const {Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode} = require('./index');

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
            throw new Error(e);
        }
    },
    StartingNode: function() {
        try{
            instance = new StartingNode({
                name: 'oi',
                fromFlow: 'oi'
            })
        }
        catch (e) {
            throw new Error(e);
        }
    },
    PreconditionsNode: function() {
        try{
            instance = new PreconditionsNode({
                name: 'instance',
                conditions: [
                    'veio de #desambiguadorNaoRecebimentoDeConta',
                    'veio de #desambiguadorPagarConta'
                ]
            });
            return true;
        }

        catch (e) {
            throw new Error(e);
        }
    },
    OutputMessageNodeteste: function() {
        try{
            instance = new OutputMessageNode({
                name: 'oi',
                stepMessage: 'tchau',
                expectedMessage: 'to te vendo'
            });
            return true;
        }

        catch (e) {
            throw new Error(e);
        }
    },
    SwitchNode: function() {
        try{
            instance = new SwitchNode({
                name: 'verifica se é conta digital',
                condition: 'É conta digital?',
                pathCases: ["Sim", "Não"]
            });
            return true;
        }

        catch {
            throw new Error(e);
        }
    },
    DecisionNode: function() {
        try{
            instance = new DecisionNode({
                name: 'oi',
                stepMessage: 'tchau'
            });
            return true;
        }

        catch (e) {
            throw new Error(e);
        }
    },
    InvokerNode: function() {
        try{
            instance = new InvokerNode({
                name: 'oi',
                stepMessage: 'tchau',
                invokeFlow: 'any',
                pathAnswers: ['sim']
            });
            return true;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}

testInstantiation();

function testInstantiation() {
    for (const each in instantiation) {
        if (instantiation[each]()) { console.log(chalk.bgGreen.black(`${each.toUpperCase()} INSTANTIATION TEST :: PASSED`)) }
    }
}