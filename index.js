const FlowMap = require('./models/classes/flows/FlowMap.class');
const ScenarioStorage = require('./models/classes/common/Scenario.storage');

global.scenarioStorage = new ScenarioStorage();

const teste = new FlowMap();

teste.newNode('starting', { name: 'INICIO' });
teste.newNode('preconditions', { name: 'Precondicoes', preconditions: ['Testar #desambiguadorPagarConta', 'Testar #desambiguador2Via', ] });
teste.newNode('preconditions', { name: 'PrecondicoesTESTE', preconditions: ['Testar #desambiguadorPagarContaTESTE', 'Testar #desambiguador2ViaTESTE', ] });
teste.newNode('switch', { name: 'Obter Dados do Cliente', condition: 'Sucesso no billing-profile?', pathCases: ['Sim', 'Não'] });
teste.newNode('node', { name: 'Acolhimento', stepMessage: 'URA Cognitiva atende a ligação' });
teste.newNode('switch', { name: 'Verifica se é Conta Digital', condition: 'É Conta Digital?', pathCases: ['Sim', 'Não'] });
teste.newNode('node', {name: 'Envia fatura por SMS', stepMessage:'URA informa que enviou a fatura por SMS'});
teste.newNode('node', {name: 'Deu bom', stepMessage: 'URA Agradece a Ligação'});
teste.queryNode('Deu bom').turnTargetNode();
teste.newNode('node', {name: 'Deu ruim', stepMessage: 'URA informa que cliente precisa ser Conta Digital para enviar a fatura'});
teste.queryNode('Deu ruim').turnTargetNode();
teste.newNode('node', {name: 'Cliente não identificado', stepMessage: 'URA Não conseguiu validar o cliente'});
teste.queryNode('Cliente não identificado').turnTargetNode();
teste.newNode('node', {name: 'Cliente solicita envio por SMS', stepMessage: 'Quer fatura por SMS'});

teste.linkNext(teste.queryNode('INICIO').id, teste.queryNode('Obter Dados do Cliente').id);
teste.linkNext(teste.queryNode('Obter Dados do Cliente').getPath('Sim').id, teste.queryNode('Precondicoes').id);
teste.linkNext(teste.queryNode('Obter Dados do Cliente').getPath('Não').id, teste.queryNode('Cliente não identificado').id);

teste.linkNext(teste.queryNode('Precondicoes').id, teste.queryNode('Cliente solicita envio por SMS').id);

teste.linkNext(teste.queryNode('Cliente solicita envio por SMS').id, teste.queryNode('Verifica se é Conta Digital').id);
teste.linkNext(teste.queryNode('Verifica se é Conta Digital').getPath('Sim').id, teste.queryNode('Envia fatura por SMS').id);
teste.linkNext(teste.queryNode('Envia fatura por SMS').id, teste.queryNode('Deu bom').id);
teste.linkNext(teste.queryNode('Verifica se é Conta Digital').getPath('Não').id, teste.queryNode('Deu ruim').id);

// teste.queryNode('INICIO').mapScenarios();

teste.mapScenarios();