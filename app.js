require('./index');
const mountFluxoDeSenha = require('./maps/fluxoDeSenha');

const FlowMap = require('./models/classes/flows/FlowMap.class');

const teste = new FlowMap();
mountFluxoDeSenha(teste);
// Declaração de nodes
const starting = teste.newNode('starting', { name: 'INICIO' });
const precondicoes = teste.newNode('preconditions', { name: 'Precondicoes', preconditions: ['Testar #desambiguadorPagarConta', 'Testar #desambiguador2Via'] });
// teste.newNode('preconditions', { name: 'PrecondicoesTESTE', preconditions: ['Testar #desambiguadorPagarContaTESTE', 'Testar #desambiguador2ViaTESTE', ] });
const switche = teste.newNode('switch', { name: 'Obter Dados do Cliente', condition: 'Sucesso no billing-profile?', pathCases: ['Sim', 'Não'] });
const acolhimento = teste.newNode('node', { name: 'Acolhimento', stepMessage: 'URA Cognitiva atende a ligação' });
const contaDigital = teste.newNode('switch', { name: 'Verifica se é Conta Digital', condition: 'É Conta Digital?', pathCases: ['Sim', 'Não'] });
const enviaSMS = teste.newNode('node', {name: 'Envia fatura por SMS', stepMessage:'URA informa que enviou a fatura por SMS'});
const retido = teste.newNode('node', {name: 'Deu bom', stepMessage: 'URA Agradece a Ligação'}).turnTargetNode();
const falha = teste.newNode('node', {name: 'Deu ruim', stepMessage: 'URA informa que cliente precisa ser Conta Digital para enviar a fatura'}).turnTargetNode();
const naoIdentificado = teste.newNode('node', {name: 'Cliente não identificado', stepMessage: 'URA Não conseguiu validar o cliente'}).turnTargetNode();
const solicitaSMS = teste.newNode('node', {name: 'Cliente solicita envio por SMS', stepMessage: 'Quer fatura por SMS'});

// Operações de conexão/sequencialização de nodes
teste.linkNext(starting.id, switche.id);
teste.linkNext(switche.getPath('Sim').id, teste.queryNode('Precondicoes').id);
teste.linkNext(switche.getPath('Não').id, teste.queryNode('Inicia Fluxo de Senha').id);
teste.linkNext(teste.queryNode('Outlet Sucesso (Senha Correta)').id, retido.id);
teste.linkNext(teste.queryNode('Outlet Sucesso (Data + CPF)').id, retido.id);

teste.linkNext(precondicoes.id, solicitaSMS.id);

teste.linkNext(solicitaSMS.id, contaDigital.id);
teste.linkNext(contaDigital.getPath('Sim').id, enviaSMS.id);
teste.linkNext(enviaSMS.id, retido.id);
teste.linkNext(contaDigital.getPath('Não').id, falha.id);

// Mapeamento de cenários
teste.mapScenarios();
// teste.showScenarios();

console.log(teste.outlets);

// console.log(JSON.stringify(teste));