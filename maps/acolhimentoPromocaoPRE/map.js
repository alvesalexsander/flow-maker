require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const acolhimentoPromocaoPre = new FlowMap({ name: 'Acolhimento (apenas promoção)', segment: 'Pré', scenarioPrefix: '06' });

module.exports = acolhimentoPromocaoPre;