const { Node, StartingNode, PreconditionsNode, OutputMessageNode, SwitchNode, DecisionNode, InvokerNode } = require('./models/classes/nodes/index');
// const StartingNode = require('./models/classes/nodes/StartingNodeRefactor.class');

let inicio = new StartingNode({
    name: 'Fluxo teste',
    fromFlow: '',
})

let precondicoes = new PreconditionsNode({
    name: 'desambiguadores importantes',
    preconditions: [
        '#desambiguadorPagarConta',
        '#desambiguadorContaDigital'],
    // prevNode: inicio
})

let switche = new SwitchNode({
    name: 'qtd faturas',
    condition: 'Faturas em aberto: ',
    pathCases: [1, 3]
})

let middleNode = new Node({
    name: 'middleNode',
    stepMessage: 'este é o middleNode'
})

let fim = new Node({
    name: 'node final',
    stepMessage: 'FIM',
})
fim.turnTargetNode();

let fim1 = new Node({
    name: 'node final1',
    stepMessage: 'FIM1',
})
fim1.turnTargetNode();

middleNode.setNextNode(fim);
switche.setNextNode(middleNode);
switche.pathNodes[0].setNextNode(middleNode);
switche.pathNodes[1].setNextNode(fim1);
precondicoes.setNextNode(switche);
inicio.setNextNode(precondicoes);


// PROBLEMA: ter que fazer a sequencia dos nodes na ordem inversa
// porque os objetos internos nao sao referencias dos externos
inicio.mapScenarios();