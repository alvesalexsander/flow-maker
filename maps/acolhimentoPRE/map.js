require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const acolhimentoPre = new FlowMap({ name: 'Acolhimento', segment: 'Pré', scenarioPrefix: '06' });

module.exports = acolhimentoPre;