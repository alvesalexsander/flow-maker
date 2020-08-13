require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const religa = new FlowMap({ name: 'Religa(Pós-Família)', segment: 'Pós-Pago Família', scenarioPrefix: '07' });

module.exports = religa;