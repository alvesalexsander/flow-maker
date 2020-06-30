require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const contratarPacote = new FlowMap({ name: 'Contratação de Pacote de Dados', segment: 'Pós-Pago Família' });

module.exports = contratarPacote;