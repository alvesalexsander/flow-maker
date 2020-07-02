const acolhimentoPre = require('./map');
const {
    startacolhimentoPre,
    saudacaoURA,
    transfereParaATH,
    encerraLigacao,
    viaDeAcesso,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    informativoacolhimentoPre,
    enviaSMSAgendamento,
    respostaSMSAgendamentoSucesso,
    respostaSMSAgendamentoFalha,
} = require('./nodes');

acolhimentoPre.linkChain(
    [startacolhimentoPre, saudacaoURA],
    [saudacaoURA, viaDeAcesso],
    [viaDeAcesso, informativoacolhimentoPre],
    [informativoacolhimentoPre, enviaSMSAgendamento],
        [enviaSMSAgendamento.getPath('Sucesso no SMS'), respostaSMSAgendamentoSucesso],
        [enviaSMSAgendamento.getPath('Falha no SMS'), respostaSMSAgendamentoFalha],
    [respostaSMSAgendamentoSucesso, perguntaQuerAlgoMais],
    [respostaSMSAgendamentoFalha, perguntaQuerAlgoMais],
        [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
        [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],
)


acolhimentoPre.mapScenarios();
acolhimentoPre.showScenarios();
acolhimentoPre.exportScenariosToExcel();