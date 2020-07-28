const contratacaoPacoteDados = require('./map');
const {
    startContratacaoPacoteDados,
  saudacaoURA,
  transfereParaATH,
  encerraLigacao,
  viaDeAcesso,
  perguntaQuerAlgoMais,
  apresentaPacotesDisponiveis,   
  desambiguador,
  agradeceDesliga,
  verificaPreTop,
  verificaBeneficiosValidos,
  respostaPreTopFalhaServiçosNoAcolhimento,
  perguntaDificuldadeUsarInternet,
  respostaBeneficiosExpirados,
  verificaExpiradoQuerRecarga,
  verificaConsultaSaldoPacotesDisponiveis,
  verificaPreTOPConsumiuTodoPacote,
  verificaPossuiBonus,
  respostaPossuiBonusSim,
  respostaPreTOPConsumiuTodoPacote,
  respostaPossuiBonusNao,
  verificaPossuiSaldoRecarga,
  respostaPossuiSaldoRecargaSim,
  verificaRenovar,
  encaminhaFluxoRenovacao,
  respostaPossuiSaldoRecargaNao,
  verificaQuerRecargaRenovar,
  encaminhaFluxoRecarga,
  informaVerificarInternet,
  verificaJaContratouPacote,
  respostaJaContratouPacoteSim,
  respostaConfirmaContratacaoNao,
  verificaConsultaQuota,
  verificaNavegaçãoBloqueada,
  verificaNavBloqPossuiBonus,
  respostaNavBloqPossuiBonusSim,
  respostaNavBloqPossuiBonusNao,
  verificaSaldoParaPacoteMinimo,
  verificaConsultaPacotesDados,
  verificaElegivelSomentePacoteDiario,
  respostaElegivelSomentePacoteDiarioSim,
  respostaElegivelSomentePacoteDiarioNao,
  acoesEscolherPacoteDiario,
  acoesEscolherPacoteDisp,
  verificarPacoteSaldoMaior,
  respostaPacoteSaldoMaiorSim,
  verificaQuerRecargaPacoteMaior,
  confirmaContratacao,
  verificaQuerOuvirNovamente,
  verificaLigandoProprioAparelho,
  verificaFluxoSenha,
  respostaFalhaFluxoSenha,
  verificaContratacaoDoPacote,
  respostaContratacaoDoPacoteSim,
  respostaSaldoParaPacoteMinimoNao,
  respostaContratacaoDoPacoteFalha,
  respostaConsultaPacotesDados,
  respostaConsultaQuota,
  verificaServiçosNoAcolhimento,
  encaminhaFluxoSuporteTecnico,
  repeteInputDificuldadeUsarInternet,
  respostaDificuldadeUsarInternetSim,
  verificaDificuldadeUsarInternet,
  respostaRepeteDificuldadeUsarInternet
} = require('./nodes');

contratacaoPacoteDados.linkChain(
    // [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

    [perguntaDificuldadeUsarInternet, verificaDificuldadeUsarInternet],

    [verificaDificuldadeUsarInternet.getPath('Input - Dificuldade na internet'), respostaDificuldadeUsarInternetSim],
    [respostaDificuldadeUsarInternetSim, encaminhaFluxoSuporteTecnico],

    [verificaDificuldadeUsarInternet.getPath('Input - Sem dificuldades na internet'), perguntaQuerAlgoMais],

    [verificaDificuldadeUsarInternet.getPath('Input - Não reconhecido(dificuldades)'), respostaRepeteDificuldadeUsarInternet],
    [respostaRepeteDificuldadeUsarInternet, repeteInputDificuldadeUsarInternet],
    [repeteInputDificuldadeUsarInternet.getPath('Dificuldade na internet (após repetir)'), respostaDificuldadeUsarInternetSim],
    [repeteInputDificuldadeUsarInternet.getPath('Sem dificuldades na internet (após repetir)'), perguntaQuerAlgoMais],
    [repeteInputDificuldadeUsarInternet.getPath('Não reconhecido (após repetir)'), perguntaQuerAlgoMais],


    [startContratacaoPacoteDados, verificaPreTop],
    // [viaDeAcesso, verificaPreTop],
        [verificaPreTop.getPath('É cliente Pré TOP'), verificaServiçosNoAcolhimento],
        [verificaServiçosNoAcolhimento.getPath('Sucesso serviços no acolhimento'), verificaBeneficiosValidos],
        [verificaServiçosNoAcolhimento.getPath('Falha serviços no acolhimento'), respostaPreTopFalhaServiçosNoAcolhimento],
        [respostaPreTopFalhaServiçosNoAcolhimento, perguntaQuerAlgoMais]

            [verificaBeneficiosValidos.getPath('Benefícios expirados'), respostaBeneficiosExpirados],
                [respostaBeneficiosExpirados, verificaExpiradoQuerRecarga],
                    [verificaExpiradoQuerRecarga.getPath('Quer fazer recarga'), encaminhaFluxoRecarga],
                    //
                    [verificaExpiradoQuerRecarga.getPath('Não quer recarga'), perguntaQuerAlgoMais],
                    //

            [verificaBeneficiosValidos.getPath('Benefícios válidos'), verificaPreTOPConsumiuTodoPacote],
                [verificaPreTOPConsumiuTodoPacote.getPath('Consumiu 100%'), verificaPossuiSaldoRecarga],
                    [verificaPossuiSaldoRecarga.getPath('Possui saldo em conta'), respostaPossuiSaldoRecargaSim],
                        [respostaPossuiSaldoRecargaSim, verificaRenovar],
                            [verificaRenovar.getPath('Quer renovar'), encaminhaFluxoRenovacao],
                            //
                            [verificaRenovar.getPath('Não quer renovar'), perguntaQuerAlgoMais],
                            //

                    [verificaPossuiSaldoRecarga.getPath('Não possui saldo em conta'), respostaPossuiSaldoRecargaNao],
                        [respostaPossuiSaldoRecargaNao, verificaQuerRecargaRenovar],
                            [verificaQuerRecargaRenovar.getPath('Quer fazer recarga'), encaminhaFluxoRecarga],
                            [verificaQuerRecargaRenovar.getPath('Não quer fazer recarga'), perguntaQuerAlgoMais],

                [verificaPreTOPConsumiuTodoPacote.getPath('Não consumiu 100%'), respostaPreTOPConsumiuTodoPacote],
                [respostaPreTOPConsumiuTodoPacote, perguntaDificuldadeUsarInternet],
                    [verificaPossuiBonus.getPath('Possui bônus'), respostaPossuiBonusSim],
                        [respostaPossuiBonusSim, perguntaDificuldadeUsarInternet],
                        //
                    [verificaPossuiBonus.getPath('Não possui bônus'), respostaPossuiBonusNao],
                        [respostaPossuiBonusNao, perguntaDificuldadeUsarInternet],
                        //

        [verificaPreTop.getPath('Não é Pré TOP'), informaVerificarInternet],
        [informaVerificarInternet, verificaJaContratouPacote],
            [verificaJaContratouPacote.getPath('Já contratou pacote na ligação'), respostaJaContratouPacoteSim],
                [respostaJaContratouPacoteSim, perguntaQuerAlgoMais],
                //
            [verificaJaContratouPacote.getPath('Não contratou pacote na ligação'), verificaConsultaQuota],
                [verificaConsultaQuota.getPath('Sucesso no serv. Quota (acolhim.)'), verificaNavegaçãoBloqueada],
                    [verificaNavegaçãoBloqueada.getPath('Navegação normal'), verificaNavBloqPossuiBonus],
                        [verificaNavBloqPossuiBonus.getPath('Possui bônus'), respostaNavBloqPossuiBonusSim],
                            [respostaNavBloqPossuiBonusSim, perguntaDificuldadeUsarInternet],
                            //
                        [verificaNavBloqPossuiBonus.getPath('Não possui bônus'), respostaNavBloqPossuiBonusNao],
                            [respostaNavBloqPossuiBonusNao, perguntaDificuldadeUsarInternet],
                            //

                    [verificaNavegaçãoBloqueada.getPath('Navegação bloqueada'), verificaConsultaSaldoPacotesDisponiveis],
                    [verificaConsultaSaldoPacotesDisponiveis.getPath('Falha consulta saldo e pacotes no acolhimento'), respostaContratacaoDoPacoteFalha],
                    [verificaConsultaSaldoPacotesDisponiveis.getPath('Sucesso consulta saldo e pacotes no acolhimento'), verificaSaldoParaPacoteMinimo],

                        [verificaSaldoParaPacoteMinimo.getPath('Possui saldo (pacote mínimo)'), apresentaPacotesDisponiveis],
                        [verificaSaldoParaPacoteMinimo.getPath('Possui saldo (pacote mínimo)'), apresentaPacotesDisponiveis],
                            // [verificaConsultaPacotesDados.getPath('Falha Consulta Pacote Dados'), respostaConsultaPacotesDados],
                            // [respostaConsultaPacotesDados, perguntaQuerAlgoMais],
                            //
                            // [verificaConsultaPacotesDados.getPath('Sucesso Consulta Pacote Dados'), verificaElegivelSomentePacoteDiario],
                                [verificaElegivelSomentePacoteDiario.getPath('Somente pacote diário'), acoesEscolherPacoteDiario],
                                    [acoesEscolherPacoteDiario.getPath('Não escolher nenhum pacote'), verificarPacoteSaldoMaior],
                                    [acoesEscolherPacoteDiario.getPath('Escolhe pacote diário'), confirmaContratacao],

                                [apresentaPacotesDisponiveis, acoesEscolherPacoteDisp],
                                    [acoesEscolherPacoteDisp.getPath('Não escolher nenhum pacote'), verificaQuerOuvirNovamente],
                                        [verificarPacoteSaldoMaior.getPath('Existe pacote maior'), verificaQuerRecargaPacoteMaior],
                                            [verificaQuerRecargaPacoteMaior.getPath('Quer recarga (pacote maior)'), encaminhaFluxoRecarga],
                                            [verificaQuerRecargaPacoteMaior.getPath('Não quer recarga (pacote maior)'), perguntaQuerAlgoMais],
                                            //
                                        [verificarPacoteSaldoMaior.getPath('Nenhum outro pacote'), perguntaQuerAlgoMais],
                                        //
                                    [acoesEscolherPacoteDisp.getPath('Escolhe pacote das opções'), confirmaContratacao],
                                        [confirmaContratacao.getPath('Não confirma contratação'), respostaConfirmaContratacaoNao],
                                        [respostaConfirmaContratacaoNao, verificaQuerOuvirNovamente],
                                            [verificaQuerOuvirNovamente.getPath('Quer ouvir novamente e contrata'), verificaLigandoProprioAparelho],
                                            [verificaQuerOuvirNovamente.getPath('Quer ouvir novamente e não contrata'), perguntaQuerAlgoMais],
                                            [verificaQuerOuvirNovamente.getPath('Não quer ouvir novamente'), perguntaQuerAlgoMais],

                                        [confirmaContratacao.getPath('Confirma contratação'), verificaLigandoProprioAparelho],
                                            [verificaLigandoProprioAparelho.getPath('Ligando do próprio aparelho'), verificaContratacaoDoPacote],
                                            //
                                            [verificaLigandoProprioAparelho.getPath('Ligando de outro aparelho'), verificaFluxoSenha],
                                                [verificaFluxoSenha.getPath('Sucesso no fluxo de senha'), verificaContratacaoDoPacote],
                                                    [verificaContratacaoDoPacote.getPath('Sucesso na contratação'), respostaContratacaoDoPacoteSim],
                                                    [respostaContratacaoDoPacoteSim, perguntaQuerAlgoMais],
                                                    //
                                                    [verificaContratacaoDoPacote.getPath('Falha na contratação'), respostaContratacaoDoPacoteFalha],
                                                    [respostaContratacaoDoPacoteFalha, perguntaQuerAlgoMais],

                                                [verificaFluxoSenha.getPath('Falha no fluxo de senha'), respostaFalhaFluxoSenha],
                                                [respostaFalhaFluxoSenha, perguntaQuerAlgoMais],


                        [verificaSaldoParaPacoteMinimo.getPath('Não possui saldo (pacote mínimo)'), encaminhaFluxoRecarga],



                [verificaConsultaQuota.getPath('Falha no serv. Quota (acolhim.)'), respostaConsultaQuota],
                    [respostaConsultaQuota, perguntaQuerAlgoMais],

        
)


contratacaoPacoteDados.mapScenarios();
contratacaoPacoteDados.getSummary();
// contratacaoPacoteDados.inspectScenario(1);
// contratacaoPacoteDados.showScenarios();
contratacaoPacoteDados.exportScenariosToExcel();
contratacaoPacoteDados.exportScenariosToText();