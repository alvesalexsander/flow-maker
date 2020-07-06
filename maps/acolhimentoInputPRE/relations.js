const acolhimentoInputPre = require('./map');
const {
    startacolhimentoInputPre,
    saudacaoURA,
    comoPossoAjudar,
    transfereParaATH,
    encerraLigacao,
    viaDeAcesso,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    verificaServicoProfile,
    verificaPreTop,
    verificaBeneficiosValidos,
    respostaBeneficiosValidosNao,
    verificaQuerFazerRecarga,
    verificaQuerFazerRenovacao,
    encaminhaFluxoRecarga,
    respostaQuerFazerRecargaNao,
    verificaPossuiSaldoRecarga,
    respostaPossuiSaldoRecargaNao,
    respostaPossuiSaldoRecargaSim,
    verificaPromocaoDiaria,
    verificaPacotesDadosContratadoNaData,
    verificaConsumiuTodoPacote,
    respostaConsumiuTodoPacoteNao,
    verificaSaldoMinimoRenovar,
    respostaSaldoMinimoRenovarSim,
    verificaConfirmaRenovar,
    encaminhaFluxoRenovacao,
    encaminhaFluxoContratacao,
    respostaSaldoMinimoRenovarNão,
    verificaConfirmaRecargaRenovar,
    verificaSaldoMinimoContratar,
    respostaSaldoMinimoContratarSim,
    respostaSaldoMinimoContratarNão,
    verificaBeta,
    verificaBeneficiosValidosBeta,
    verificaSaldoMinimoRenovarBeta,
    respostaSaldoMinimoRenovarBetaSim,
    verificaQuerRenovacaoAntecipada,
    respostaSaldoMinimoRenovarBetaNao,
    verificaConsumiuPacote,
    verificaPossuiBonus,
    respostaPossuiBonusNao,
    respostaPossuiBonusSim,
    verificaSaldoRenovarBeta,
    respostaSaldoRenovarBeta,
    verificaSaldoContratarBeta,
    respostaSaldoContratarBetaSim,
    respostaSaldoContratarBetaNao,
    verificaSmart,
    verificaBeneficiosValidosSmart,
    verificaSaldoMinimoRenovarSmart,
    respostaSaldoMinimoRenovarSmartSim,
    respostaSaldoMinimoRenovarSmartNao,
    verificaSaldoRenovarSmart,
    respostaSaldoRenovarSmart,
    respostaSaldoRenovarSmartNao,
    verificaInputUsuario,
    verificaInputUsuario2Tentativa,
    verificaInputUsuario3Tentativa,
    verificaInputATHInsistencia,
    respostaInputATHInsistenciaOutroConhecido,
    respostaInputATHInsistenciaOutroDesconhecido
} = require('./nodes');

acolhimentoInputPre.linkChain(
    [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

    // [verificaQuerFazerRecarga.getPath('Quer fazer recarga'), encaminhaFluxoRecarga],
    [verificaQuerFazerRecarga.getPath('Não quer fazer recarga'), comoPossoAjudar],

    [verificaQuerFazerRenovacao.getPath('Quer fazer renovação'), encaminhaFluxoRenovacao],
    [verificaQuerFazerRenovacao.getPath('Não quer fazer renovação'), comoPossoAjudar],

//--------------------------------------------------- INICIO INPUT ---------------------------------------------------------

    [comoPossoAjudar, verificaInputUsuario],
        [verificaInputUsuario.getPath('Intenção conhecida'), desambiguador],
        [verificaInputUsuario.getPath('Intenção não tratada'), transfereParaATH],
        [verificaInputUsuario.getPath('Input inválido(DTMF, ruído, falha de reconhecimento)'), verificaInputUsuario2Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Intenção conhecida (2ª tentativa)'), desambiguador],
            [verificaInputUsuario2Tentativa.getPath('Intenção não tratada (2ª tentativa)'), transfereParaATH],
            [verificaInputUsuario2Tentativa.getPath('Nenhum input (2ª tentativa)'), verificaInputUsuario3Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Falha de reconhecimento (2ª tentativa)'), verificaInputUsuario3Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Input DTMF (2ª tentativa)'), verificaInputUsuario3Tentativa],
                [verificaInputUsuario3Tentativa.getPath('Intenção conhecida (3ª tentativa)'), desambiguador],
                [verificaInputUsuario3Tentativa.getPath('Intenção não tratada (3ª tentativa)'), transfereParaATH],
                [verificaInputUsuario3Tentativa.getPath('Nenhum input (3ª tentativa)'), encerraLigacao],
                [verificaInputUsuario3Tentativa.getPath('Falha de reconhecimento (3ª tentativa)'), encerraLigacao],
                [verificaInputUsuario3Tentativa.getPath('Input DTMF (3ª tentativa)'), encerraLigacao],
        [verificaInputUsuario.getPath('Input ATH'), verificaInputATHInsistencia],
            [verificaInputATHInsistencia.getPath('Insistencia ATH'), transfereParaATH],
            [verificaInputATHInsistencia.getPath('Outro desambiguador conhecido'), desambiguador],
            [verificaInputATHInsistencia.getPath('Outro desambiguador desconhecido'), transfereParaATH],

//--------------------------------------------------- FIM INPUT ---------------------------------------------------------

//--------------------------------------------------- INICIO PRE ---------------------------------------------------------

    [startacolhimentoInputPre, verificaServicoProfile.getPath('Sucesso no profile')],
        [verificaServicoProfile.getPath('Sucesso no profile'), saudacaoURA],
        [saudacaoURA, verificaPreTop.getPath('É Pré Top')], // Colocar como nextNode o fluxo base a ser testado ANTES da ura pergunta se ajuda em algo mais
            [verificaPreTop.getPath('É Pré Top'), verificaBeneficiosValidos],
                [verificaBeneficiosValidos.getPath('Benefícios válidos'), verificaPossuiSaldoRecarga],
                    [verificaPossuiSaldoRecarga.getPath('Possui saldo em conta'), respostaPossuiSaldoRecargaSim],
                        [respostaPossuiSaldoRecargaSim, verificaQuerFazerRecarga],

//--------------------------------------------------- FIM PRE ---------------------------------------------------------
//--------------------------------------------------- INICIO PROMO DIARIA ---------------------------------------------------------

        [verificaPromocaoDiaria.getPath('Possui promoção diária'), verificaPacotesDadosContratadoNaData],
            [verificaPacotesDadosContratadoNaData.getPath('Contratou pacote hoje'), verificaConsumiuTodoPacote],
                [verificaConsumiuTodoPacote.getPath('Não consumiu 100% do pacote'), respostaConsumiuTodoPacoteNao],
                    [respostaConsumiuTodoPacoteNao, comoPossoAjudar],

//--------------------------------------------------- FIM PROMO DIARIA ---------------------------------------------------------
//--------------------------------------------------- INICIO BETA ---------------------------------------------------------

        [verificaBeta.getPath('Cliente é Beta'), verificaBeneficiosValidosBeta],
            [verificaBeneficiosValidosBeta.getPath('Benefícios válidos'), verificaConsumiuPacote],
                [verificaConsumiuPacote.getPath('Pacote disponível'), verificaPossuiBonus],
                    [verificaPossuiBonus.getPath('Possui bônus'), respostaPossuiBonusSim],
                        [respostaPossuiBonusSim, comoPossoAjudar],

//--------------------------------------------------- FIM BETA ---------------------------------------------------------
//--------------------------------------------------- INICIO SMART ---------------------------------------------------------

        [verificaSmart.getPath('Cliente é SMART'), verificaBeneficiosValidosSmart],
            [verificaBeneficiosValidosSmart.getPath('Benefícios válidos'), verificaConsumiuPacote],
                [verificaConsumiuPacote.getPath('Pacote disponível'), verificaPossuiBonus],
                    [verificaPossuiBonus.getPath('Possui bônus'), respostaPossuiBonusSim],
                    [respostaPossuiBonusSim, comoPossoAjudar],

//--------------------------------------------------- FIM SMART ---------------------------------------------------------
)


acolhimentoInputPre.mapScenarios();
// acolhimentoInputPre.showScenarios();
acolhimentoInputPre.getSummary();
// acolhimentoInputPre.inspectScenario(38);
acolhimentoInputPre.exportScenariosToExcel();
acolhimentoInputPre.exportScenariosToText();
