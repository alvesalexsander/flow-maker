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
            console.log(instance)
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
    ObserverMethods: function () {
        try {
            instance = new SwitchNode({
                name: 'verifica se é conta digital',
                condition: 'É conta digital?',
                pathCases: ["Sim", "Não"]
            }); // Instancia semelhante a uma real

            instance1 = new SwitchNode({
                name: 'teste',
                condition: 'teste?',
                pathCases: ["Sim", "Não"]
            }); // Instancia semelhante a uma teste

            instance2 = new SwitchNode({
                name: 'teste1',
                condition: 'teste1?',
                pathCases: ["Sim", "Não"]
            }); // Instancia semelhante a uma teste

            instance3 = new SwitchNode({
                name: 'teste2',
                condition: 'teste2?',
                pathCases: ["Sim", "Não"]
            }); // Instancia semelhante a uma teste

            instance1.tchau = function () {
                // console.log(`Valeu mané, tamo junto! (${this.id})`);
            }
            instance2.tchau = function () {
                // console.log(`bye byeeeeee *---*! (${this.id})`);
            }
            instance3.tchau = function () {
                // console.log(`sayonara. (${this.id})`);
            } // Declara o metodo 'tchau' em todas as instancias teste. TODAS devem responder ao evento 'oi' para este callback

            instance1.seeYa = function () {
                // console.log(`até logo! (${this.id})`);
            }
            instance2.seeYa = function () {
                // console.log(`see you around, mate! (${this.id})`);
            } // Declara o metodo 'seeYa' para instancia1 e instancia2. ESTAS devem responder ao evento 'oi' para este callback

            instance1.pleaseStay = function () {
                // console.log(`fica mais um pouquinho... (${this.id})`);
            }
            instance3.pleaseStay = function () {
                // console.log(`please be... with me... <3 (${this.id})`);
                return 'pleaseStay concluido'
            }// Declara o metodo 'pleaseStay' para instancia1 e instancia2. ESTAS devem responder ao evento 'oi' para este callback

            instance3.eventEmitter.newEvent('oi', 'pleaseStay');

            instance.eventEmitter.newEvent('oi', 'tchau'); // Define o event 'oi' para o callback 'tchau'
            instance.eventEmitter.newEvent('oi', 'seeYa'); // Define o event 'oi' para o callback 'tchau'

            instance.eventEmitter.newEvent('pathCases', 'mountPathCasesNodes');
            // Tenta definir o event 'pathCases' para o callback 'mountPathCasesNodes', mas como já existe um evento com esses dados, não o faz.

            instance1.eventEmitter.subscribe(instance);
            instance2.eventEmitter.subscribe(instance);
            instance3.eventEmitter.subscribe(instance);
            // Instancias teste se inscrevem em 'instance'.

            instance.eventEmitter.newEvent('oi', 'pleaseStay'); // Define o event 'oi' para o callback 'pleaseStay'
            instance.eventEmitter.newEvent('asd', 'pleaseStay'); // Define o event 'oi' para o callback 'pleaseStay'


            // console.log('instance: ', instance.eventEmitter.events);
            // console.log('instance 1: ', instance1.eventEmitter.externalEvents);
            // console.log('instance 2: ', instance2.eventEmitter.externalEvents);
            // console.log('instance 3: ', instance3.eventEmitter.events);
            // console.log('instance 3: ', instance3.eventEmitter.externalEvents);

            try {
                instance.eventEmitter.emitEvent('oi'); // Instance envia um evento 'oi' e propaga a todos os seus 'observers'
            }
            catch (e) {
                console.log(e);
                return false
            }

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