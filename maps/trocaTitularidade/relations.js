const trocaTitularidade = require('./map');
const {
    startTrocaTitularidade,
    saudacaoURA,
    transfereParaATH,
    encerraLigacao,
    viaDeAcesso,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    informativoTrocaTitularidade,
    enviaSMSAgendamento,
    respostaSMSAgendamentoSucesso,
    respostaSMSAgendamentoFalha,
} = require('./nodes');

trocaTitularidade.linkChain(
    [startTrocaTitularidade, saudacaoURA],
    [saudacaoURA, viaDeAcesso],
    [viaDeAcesso, informativoTrocaTitularidade],
    [informativoTrocaTitularidade, enviaSMSAgendamento],
        [enviaSMSAgendamento.getPath('Sucesso no SMS'), respostaSMSAgendamentoSucesso],
        [enviaSMSAgendamento.getPath('Falha no SMS'), respostaSMSAgendamentoFalha],
    [respostaSMSAgendamentoSucesso, perguntaQuerAlgoMais],
    [respostaSMSAgendamentoFalha, perguntaQuerAlgoMais],
        [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
        [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],
)


trocaTitularidade.mapScenarios();
trocaTitularidade.showScenarios();
trocaTitularidade.exportScenariosToExcel();
const fs = require('fs');

fs.writeFileSync('testeEscrita.json', JSON.stringify(trocaTitularidade, null, 2))