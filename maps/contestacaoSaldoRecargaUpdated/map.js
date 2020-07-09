require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const contestacaoSaldoRecarga = new FlowMap({ name: 'Contestação Saldo Recarga', segment: 'Pré', scenarioPrefix: '05' });

module.exports = contestacaoSaldoRecarga;