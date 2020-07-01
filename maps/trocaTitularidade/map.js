require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const trocaTitularidade = new FlowMap({ name: 'Troca Titularidade', segment: 'Pós-Pago Família', scenarioPrefix: '03' });

module.exports = trocaTitularidade;