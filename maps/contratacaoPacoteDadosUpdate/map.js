require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const contratacaoPacoteDados = new FlowMap({ name: 'Contratação de Pacote de Dados', segment: 'Pré', scenarioPrefix: '08' });

module.exports = contratacaoPacoteDados;