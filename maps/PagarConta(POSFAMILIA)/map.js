require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const pagarConta = new FlowMap({ name: 'Pagar Conta(Pós-Família)', segment: 'Pós-Pago Família', scenarioPrefix: '12' });

module.exports = pagarConta;