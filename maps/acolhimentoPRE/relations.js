const acolhimentoPre = require('./map');
const {
    startAcolhimentoPre,
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

acolhimentoPre.linkChain(
    [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

    [verificaQuerFazerRecarga.getPath('Quer fazer recarga'), encaminhaFluxoRecarga],
    [verificaQuerFazerRecarga.getPath('Não quer fazer recarga'), comoPossoAjudar],

    [verificaQuerFazerRenovacao.getPath('Quer fazer renovação'), encaminhaFluxoRenovacao],
    [verificaQuerFazerRenovacao.getPath('Não quer fazer renovação'), comoPossoAjudar],

//--------------------------------------------------- INICIO INPUT ---------------------------------------------------------

    [comoPossoAjudar, verificaInputUsuario],
        [verificaInputUsuario.getPath('Intenção conhecida'), desambiguador],
        [verificaInputUsuario.getPath('Inteção não tratada'), transfereParaATH],
        [verificaInputUsuario.getPath('Nenhum input'), verificaInputUsuario2Tentativa],
        [verificaInputUsuario.getPath('Falha de reconhecimento'), verificaInputUsuario2Tentativa],
        [verificaInputUsuario.getPath('Input DTMF'), verificaInputUsuario2Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Intenção conhecida (2ª tentativa)'), desambiguador],
            [verificaInputUsuario2Tentativa.getPath('Inteção não tratada (2ª tentativa)'), transfereParaATH],
            [verificaInputUsuario2Tentativa.getPath('Nenhum input (2ª tentativa)'), verificaInputUsuario3Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Falha de reconhecimento (2ª tentativa)'), verificaInputUsuario3Tentativa],
            [verificaInputUsuario2Tentativa.getPath('Input DTMF (2ª tentativa)'), verificaInputUsuario3Tentativa],
                [verificaInputUsuario3Tentativa.getPath('Intenção conhecida (3ª tentativa)'), desambiguador],
                [verificaInputUsuario3Tentativa.getPath('Inteção não tratada (3ª tentativa)'), transfereParaATH],
                [verificaInputUsuario3Tentativa.getPath('Nenhum input (3ª tentativa)'), encerraLigacao],
                [verificaInputUsuario3Tentativa.getPath('Falha de reconhecimento (3ª tentativa)'), encerraLigacao],
                [verificaInputUsuario3Tentativa.getPath('Input DTMF (3ª tentativa)'), encerraLigacao],
        [verificaInputUsuario.getPath('Input ATH'), verificaInputATHInsistencia],
            [verificaInputATHInsistencia.getPath('Insistencia ATH'), transfereParaATH],
            [verificaInputATHInsistencia.getPath('Outro desambiguador conhecido'), desambiguador],
            [verificaInputATHInsistencia.getPath('Outro desambiguador desconhecido'), transfereParaATH],

//--------------------------------------------------- FIM INPUT ---------------------------------------------------------

//--------------------------------------------------- INICIO PRE ---------------------------------------------------------
    [startAcolhimentoPre, verificaServicoProfile],
        [verificaServicoProfile.getPath('Falha no profile'), transfereParaATH],
        [verificaServicoProfile.getPath('Sucesso no profile'), saudacaoURA],
        [saudacaoURA, verificaPreTop],
            [verificaPreTop.getPath('É Pré Top'), verificaBeneficiosValidos],
                [verificaBeneficiosValidos.getPath('Benefícios válidos'), verificaPossuiSaldoRecarga],
                    [verificaPossuiSaldoRecarga.getPath('Possui saldo em conta'), respostaPossuiSaldoRecargaSim],
                        [respostaPossuiSaldoRecargaSim, verificaQuerFazerRecarga],
                    [verificaPossuiSaldoRecarga.getPath('Não possui saldo em conta'), respostaPossuiSaldoRecargaNao],
                        [respostaPossuiSaldoRecargaNao, verificaQuerFazerRecarga],

                [verificaBeneficiosValidos.getPath('Benefícios expirados'), respostaBeneficiosValidosNao],
                    [respostaBeneficiosValidosNao, verificaQuerFazerRecarga],

            [verificaPreTop.getPath('Não é Pré Top').noStepMessage(), verificaPromocaoDiaria],
//--------------------------------------------------- FIM PRE ---------------------------------------------------------
//--------------------------------------------------- INICIO PROMO DIARIA ---------------------------------------------------------

        [verificaPromocaoDiaria.getPath('Elegível promoção diária'), verificaPacotesDadosContratadoNaData],
            [verificaPacotesDadosContratadoNaData.getPath('Contratou pacote hoje'), verificaConsumiuTodoPacote],
                [verificaConsumiuTodoPacote.getPath('Consumiu 100% do pacote'), verificaSaldoMinimoRenovar],
                    [verificaSaldoMinimoRenovar.getPath('Possui saldo para renovar'), respostaSaldoMinimoRenovarSim],
                        [respostaSaldoMinimoRenovarSim, verificaConfirmaRenovar],
                        [verificaConfirmaRenovar.getPath('Quer renovar'), encaminhaFluxoRenovacao],
                        [verificaConfirmaRenovar.getPath('Não quer renovar'), comoPossoAjudar],
                        //
                    [verificaSaldoMinimoRenovar.getPath('Não possui saldo para renovar'), respostaSaldoMinimoRenovarNão],
                        [respostaSaldoMinimoRenovarNão, verificaQuerFazerRecarga],
                        //
                [verificaConsumiuTodoPacote.getPath('Não consumiu 100% do pacote'), respostaConsumiuTodoPacoteNao],
                    [respostaConsumiuTodoPacoteNao, comoPossoAjudar],
                    //
            [verificaPacotesDadosContratadoNaData.getPath('Não contratou pacote hoje'), verificaSaldoMinimoContratar],
                [verificaSaldoMinimoContratar.getPath('Possui saldo para contratar'), respostaSaldoMinimoContratarSim],
                    [respostaSaldoMinimoContratarSim, comoPossoAjudar],
                    //
                [verificaSaldoMinimoContratar.getPath('Não Possui saldo para contratar'), respostaSaldoMinimoContratarNão],
                    [respostaSaldoMinimoContratarNão, verificaQuerFazerRecarga],
                    //

        [verificaPromocaoDiaria.getPath('Não elegível promoção diária').noStepMessage(), verificaBeta],
//--------------------------------------------------- FIM PROMO DIARIA ---------------------------------------------------------
//--------------------------------------------------- INICIO BETA ---------------------------------------------------------
        [verificaBeta.getPath('Cliente é Beta'), verificaBeneficiosValidosBeta],
            [verificaBeneficiosValidosBeta.getPath('Benefícios válidos'), verificaConsumiuPacote],
                [verificaConsumiuPacote.getPath('Pacote 100% consumido'), verificaSaldoRenovarBeta],
                    [verificaSaldoRenovarBeta.getPath('Possui saldo(renovar)'), respostaSaldoRenovarBeta],
                        [respostaSaldoRenovarBeta.getPath('Quer contratar novo pacote'), encaminhaFluxoContratacao],
                        [respostaSaldoRenovarBeta.getPath('Quer renovar'), encaminhaFluxoRenovacao],
                        [respostaSaldoRenovarBeta.getPath('Nenhuma das opções'), comoPossoAjudar],
                        //
                    [verificaSaldoRenovarBeta.getPath('Não possui saldo(renovar)'), verificaSaldoContratarBeta],
                        [verificaSaldoContratarBeta.getPath('Possui saldo(contratar)'), respostaSaldoContratarBetaSim],
                            [respostaSaldoContratarBetaSim.getPath('Quer contratar novo pacote'), encaminhaFluxoContratacao],
                            [respostaSaldoContratarBetaSim.getPath('Não quer contratar'), respostaSaldoContratarBetaNao],
                            [respostaSaldoContratarBetaNao, comoPossoAjudar],
                            //
                        [verificaSaldoContratarBeta.getPath('Não possui saldo(contratar)'), verificaQuerFazerRecarga],
                        //
                [verificaConsumiuPacote.getPath('Pacote disponível'), verificaPossuiBonus],
                    [verificaPossuiBonus.getPath('Possui bônus'), respostaPossuiBonusSim],
                        [respostaPossuiBonusSim, comoPossoAjudar],
                        //
                    [verificaPossuiBonus.getPath('Não possui bônus'), respostaPossuiBonusNao],
                        [respostaPossuiBonusNao, comoPossoAjudar],
                        //
            [verificaBeneficiosValidosBeta.getPath('Benefícios expirados'), verificaSaldoMinimoRenovarBeta],
                [verificaSaldoMinimoRenovarBeta.getPath('Possui saldo mínimo'), respostaSaldoMinimoRenovarBetaSim],
                    [respostaSaldoMinimoRenovarBetaSim, verificaQuerRenovacaoAntecipada],
                        [verificaQuerRenovacaoAntecipada.getPath('Quer renovação antecipada'), encaminhaFluxoRenovacao],
                        [verificaQuerRenovacaoAntecipada.getPath('Não quer renovação antecipada'), comoPossoAjudar],
                        //
                [verificaSaldoMinimoRenovarBeta.getPath('Não possui saldo mínimo'), respostaSaldoMinimoRenovarBetaNao],
                    [respostaSaldoMinimoRenovarBetaNao, verificaQuerFazerRecarga],
                    //

        [verificaBeta.getPath('Cliente não é Beta').noStepMessage(), verificaSmart],
//--------------------------------------------------- FIM BETA ---------------------------------------------------------
//--------------------------------------------------- INICIO BETA ---------------------------------------------------------
        [verificaSmart.getPath('Cliente é SMART'), verificaBeneficiosValidosSmart],
            [verificaBeneficiosValidosSmart.getPath('Benefícios válidos'), verificaConsumiuPacote],
                [verificaConsumiuPacote.getPath('Pacote 100% consumido'), verificaSaldoRenovarSmart],
                    [verificaSaldoRenovarSmart.getPath('Possui saldo(renovar)'), respostaSaldoRenovarSmart],
                        [respostaSaldoRenovarSmart.getPath('Quer contratar novo pacote'), encaminhaFluxoContratacao],
                        [respostaSaldoRenovarSmart.getPath('Quer renovar'), encaminhaFluxoContratacao],
                        [respostaSaldoRenovarSmart.getPath('Nenhuma das opções'), comoPossoAjudar],
                        //
                    [verificaSaldoRenovarSmart.getPath('Não possui saldo(renovar)'), respostaSaldoRenovarSmartNao],
                    //
                [verificaConsumiuPacote.getPath('Pacote disponível'), verificaPossuiBonus],
                    [verificaPossuiBonus.getPath('Possui bônus'), respostaPossuiBonusSim],
                    [respostaPossuiBonusSim, comoPossoAjudar],
                    //
                    [verificaPossuiBonus.getPath('Não possui bônus'), respostaPossuiBonusNao],
                    [respostaPossuiBonusNao, comoPossoAjudar],
                    //
            [verificaBeneficiosValidosSmart.getPath('Benefícios expirados'), verificaSaldoMinimoRenovarSmart],
                [verificaSaldoMinimoRenovarSmart.getPath('Possui saldo mínimo'), verificaQuerRenovacaoAntecipada],
                    [verificaQuerRenovacaoAntecipada.getPath('Quer renovação antecipada'), encaminhaFluxoRenovacao],
                    [verificaQuerRenovacaoAntecipada.getPath('Não quer renovação antecipada'), comoPossoAjudar],
                    //
                [verificaSaldoMinimoRenovarSmart.getPath('Não possui saldo mínimo'), respostaSaldoRenovarSmartNao],
                [respostaSaldoRenovarSmartNao, verificaQuerFazerRecarga],
                

        [verificaSmart.getPath('Cliente não é SMART').noStepMessage(), comoPossoAjudar],
//--------------------------------------------------- FIM SMART ---------------------------------------------------------
)


acolhimentoPre.mapScenarios();
acolhimentoPre.showScenarios();
// acolhimentoPre.exportScenariosToExcel();