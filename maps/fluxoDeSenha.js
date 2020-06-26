require('../index');
const FlowMap = require('../models/classes/flows/FlowMap.class');

fluxoDeSenha = new FlowMap({ name: 'Fluxo de Senha' });

const startFluxoDeSenha = fluxoDeSenha.newNode('starting', {
    name: 'Inicia Fluxo de Senha',
});

const resultadoFluxoDeSenha = fluxoDeSenha.newNode('switch', {
    name: 'Resultado Fluxo de Senha',
    condition: 'Fluxo de Senha',
    pathCases: [
        'Sucesso (Senha Correta)',
        'Falha (no Serviço)',
        'Sucesso (Data + CPF)',
        'Falha (Data OU CPF)']
})

fluxoDeSenha.setOutlet('Sucesso (Senha Correta)');
fluxoDeSenha.setOutlet('Sucesso (Data + CPF)');

const perguntaQuerAlgoMais = fluxoDeSenha.newNode('switch', {
    name: 'Pergunta se o usuario quer algo mais',
    condition: 'Ajudo com algo mais?',
    pathCases: ['Sim', 'Não']
})

const desambiguador = fluxoDeSenha.newNode('node', {
    name: 'Usuário quer algo mais',
    stepMessage: 'Quer algo mais.'
}).turnTargetNode();

const direcionaATH = fluxoDeSenha.newNode('node', {
    name: "ATH",
    stepMessage: 'URA direciona para o ATH.'
}).turnTargetNode();

fluxoDeSenha.linkNext(startFluxoDeSenha.id, resultadoFluxoDeSenha.id);

fluxoDeSenha.linkNext(
    resultadoFluxoDeSenha.getPath('Sucesso (Senha Correta)').id,
    perguntaQuerAlgoMais.id);

fluxoDeSenha.linkNext(
    resultadoFluxoDeSenha.getPath('Falha (no Serviço)').id,
    perguntaQuerAlgoMais.id);

fluxoDeSenha.linkNext(
    resultadoFluxoDeSenha.getPath('Sucesso (Data + CPF)').id,
    perguntaQuerAlgoMais.id);

fluxoDeSenha.linkNext(
    resultadoFluxoDeSenha.getPath('Falha (Data OU CPF)').id,
    perguntaQuerAlgoMais.id);

fluxoDeSenha.linkNext(
    perguntaQuerAlgoMais.getPath('Sim').id,
    desambiguador.id);

fluxoDeSenha.linkNext(
    perguntaQuerAlgoMais.getPath('Não').id,
    direcionaATH.id);

function mount(flowMap) {
    for (const node of fluxoDeSenha.flowchartNodes) {
        flowMap.flowchartNodes.push(node);
    }
    for (const node of fluxoDeSenha.outlets) {
        flowMap.outlets.push(node);
    }
}

fluxoDeSenha.mapScenarios();
fluxoDeSenha.showScenarios();