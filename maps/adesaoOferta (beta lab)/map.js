require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const adesaoOferta = new FlowMap({ name: 'Adesão de Oferta', segment: 'Pré', scenarioPrefix: '07' });

module.exports = adesaoOferta;