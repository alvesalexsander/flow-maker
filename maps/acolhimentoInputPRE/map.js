require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const acolhimentoInputPre = new FlowMap({ name: 'Acolhimento (apenas Input)', segment: 'Pré', scenarioPrefix: '06' });

module.exports = acolhimentoInputPre;