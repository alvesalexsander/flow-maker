const contratarPacote = require('./map');
const {
    startContratarPacote,
    saudacaoURA,
    transfereParaATH,
    encerraLigacao,
    viaDeAcesso,
    segundaContratacao,
    informaQueJaContratou,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    verificaBloqueioFinanceiro,
    respostaBloqueioFinanceiroSim,
    respostaBloqueioFinanceiroNao,
    verificaNavegaçãoReduzida,
    respostaNavegaçãoReduzidaNao,
    intencaoProblemaNaInternet,
    respostaoProblemaNaInternetSim,
    verificaReiniciouAparelho,
    respostaReiniciouAparelhoNao,
    verificaQuerReiniciar,
    respostaQuerReiniciarNao,
    verificaBillingProfile,
    verificaClienteInadimplente,
    respostaClienteInadimplenteSim,
    verificaClienteTitular,
    respostaClienteTitularNao,
    respostaClienteTitularProbInternetSim,
    verificaPacoteVazio,
    respostaVerificaPacoteVazioSim,
    respostaVerificaPacoteVazioNao,
    verificaPacoteEscolhido,
    respostaPacoteEscolhidoNao,
    verificaRepetir,
    respostaRepetir,
    verificaConfirmaContratacao,
    respostaConfirmaContratacaoNao,
    verificaLigandoProprioAparelho,
    respostaLigandoProprioAparelhoNao,
    verificaFluxoDeSenha,
    respostaFluxoDeSenhaFalha,
    verificaContratacaoEfetuada,
    respostaContratacaoEfetuadaSucesso,
    respostaContratacaoEfetuadaFalha } = require('./nodes');

contratarPacote.linkNext(
    perguntaQuerAlgoMais.getPath('Sim').id,
    desambiguador.id);
contratarPacote.linkNext(
    perguntaQuerAlgoMais.getPath('Não').id,
    agradeceDesliga.id);

contratarPacote.linkNext(startContratarPacote.id, saudacaoURA.id);
contratarPacote.linkNext(saudacaoURA.id, viaDeAcesso.id);

contratarPacote.linkNext(viaDeAcesso.id, segundaContratacao.id);
    contratarPacote.linkNext(
        segundaContratacao.getPath('Sim').id,
        informaQueJaContratou.id);
        contratarPacote.linkNext(
            informaQueJaContratou.id,
            perguntaQuerAlgoMais.id);
    contratarPacote.linkNext(
        segundaContratacao.getPath('Não').id,
        verificaBloqueioFinanceiro.id);
    
contratarPacote.linkNext(
    verificaBloqueioFinanceiro.getPath('Sim').id,
    respostaBloqueioFinanceiroSim.id);
    contratarPacote.linkNext(
        respostaBloqueioFinanceiroSim.id,
        perguntaQuerAlgoMais.id);
contratarPacote.linkNext(
    verificaBloqueioFinanceiro.getPath('Não').id,
    respostaBloqueioFinanceiroNao.id);
    
contratarPacote.linkNext(
    respostaBloqueioFinanceiroNao.id,
    verificaNavegaçãoReduzida.id);
    contratarPacote.linkNext(
        verificaNavegaçãoReduzida.getPath('Não').id,
        respostaNavegaçãoReduzidaNao.id);
    contratarPacote.linkNext(
        respostaNavegaçãoReduzidaNao.id,
        intencaoProblemaNaInternet.id);
        contratarPacote.linkNext(
            intencaoProblemaNaInternet.getPath('Não').id,
            perguntaQuerAlgoMais.id);
        contratarPacote.linkNext(
            intencaoProblemaNaInternet.getPath('Sim').id,
            respostaoProblemaNaInternetSim.id);
        contratarPacote.linkNext(
            respostaoProblemaNaInternetSim.id,
            verificaReiniciouAparelho.id);
            contratarPacote.linkNext(
                verificaReiniciouAparelho.getPath('Não').id,
                respostaReiniciouAparelhoNao.id);
                contratarPacote.linkNext(
                    respostaReiniciouAparelhoNao.id,
                    verificaQuerReiniciar.id);
                    contratarPacote.linkNext(
                        verificaQuerReiniciar.getPath('Sim').id,
                        encerraLigacao.id);
                    contratarPacote.linkNext(
                        verificaQuerReiniciar.getPath('Não').id,
                        respostaQuerReiniciarNao.id);
                    contratarPacote.linkNext(
                        respostaQuerReiniciarNao.id,
                        perguntaQuerAlgoMais.id);
            contratarPacote.linkNext(
                verificaReiniciouAparelho.getPath('Sim').id,
                respostaQuerReiniciarNao.id);
    contratarPacote.linkNext(
        verificaNavegaçãoReduzida.getPath('Sim').id,
        verificaBillingProfile.id);

contratarPacote.linkNext(
    verificaBillingProfile.getPath('Sucesso').id,
    verificaClienteInadimplente.id);
    contratarPacote.linkNext(
        verificaClienteInadimplente.getPath('Sim').id,
        respostaClienteInadimplenteSim.id);
        contratarPacote.linkNext(
            respostaClienteInadimplenteSim.id,
            perguntaQuerAlgoMais.id);
    contratarPacote.linkNext(
        verificaClienteInadimplente.getPath('Não').id,
        verificaClienteTitular.id);

contratarPacote.linkNext(
    verificaClienteTitular.getPath('Não').id,
    respostaClienteTitularNao.id);
    contratarPacote.linkNext(
        respostaClienteTitularNao.id,
        perguntaQuerAlgoMais.id);
contratarPacote.linkNext(
    verificaClienteTitular.getPath('Sim').id,
    intencaoProblemaNaInternet.id);
    contratarPacote.linkNext(
        intencaoProblemaNaInternet.getPath('Sim').id,
        respostaClienteTitularProbInternetSim.id);
        contratarPacote.linkNext(
            respostaClienteTitularProbInternetSim.id,
            verificaPacoteVazio.id);
            contratarPacote.linkNext(
                verificaPacoteVazio.getPath('Sim').id,
                respostaVerificaPacoteVazioSim.id);
            contratarPacote.linkNext(
                respostaVerificaPacoteVazioSim.id,
                perguntaQuerAlgoMais.id);
            contratarPacote.linkNext(
                verificaPacoteVazio.getPath('Não').id,
                respostaVerificaPacoteVazioNao.id);
            contratarPacote.linkNext(
                respostaVerificaPacoteVazioNao.id,
                verificaPacoteEscolhido.id);
                contratarPacote.linkNext(
                    verificaPacoteEscolhido.getPath('Não').id,
                    respostaPacoteEscolhidoNao.id);
                contratarPacote.linkNext(
                    respostaPacoteEscolhidoNao.id,
                    verificaRepetir.id);
                    contratarPacote.linkNext(
                        verificaRepetir.getPath('Sim').id,
                        respostaRepetir.id);
                        contratarPacote.linkNext(
                            respostaRepetir.getPath('Sim').id,
                            verificaConfirmaContratacao.id);
                        contratarPacote.linkNext(
                            respostaRepetir.getPath('Não').id,
                            perguntaQuerAlgoMais.id);
                contratarPacote.linkNext(
                    verificaPacoteEscolhido.getPath('Sim').id,
                    verificaConfirmaContratacao.id);
                    contratarPacote.linkNext(
                        verificaConfirmaContratacao.getPath('Não').id,
                        respostaConfirmaContratacaoNao.id);
                        contratarPacote.linkNext(
                            respostaConfirmaContratacaoNao.id,
                            verificaRepetir.getPath('Não').id);
                    contratarPacote.linkNext(
                        verificaConfirmaContratacao.getPath('Sim').id,
                        verificaLigandoProprioAparelho.id);
                        contratarPacote.linkNext(
                            verificaLigandoProprioAparelho.getPath('Não').id,
                            respostaLigandoProprioAparelhoNao.id);
                            contratarPacote.linkNext(
                                respostaLigandoProprioAparelhoNao.id,
                                verificaFluxoDeSenha.id);
                                contratarPacote.linkNext(
                                    verificaFluxoDeSenha.getPath('Falha').id,
                                    respostaFluxoDeSenhaFalha.id);
                                    contratarPacote.linkNext(
                                        respostaFluxoDeSenhaFalha.id,
                                        perguntaQuerAlgoMais.id);
                                contratarPacote.linkNext(
                                    verificaFluxoDeSenha.getPath('Sucesso').id,
                                    verificaContratacaoEfetuada.id);
                        contratarPacote.linkNext(
                            verificaLigandoProprioAparelho.getPath('Sim').id,
                            verificaContratacaoEfetuada.id);
                            contratarPacote.linkNext(
                                verificaContratacaoEfetuada.getPath('Sucesso').id,
                                respostaContratacaoEfetuadaSucesso.id);
                                contratarPacote.linkNext(
                                    respostaContratacaoEfetuadaSucesso.id,
                                    perguntaQuerAlgoMais.id);
                            contratarPacote.linkNext(
                                verificaContratacaoEfetuada.getPath('Falha').id,
                                respostaContratacaoEfetuadaFalha.id);
                                contratarPacote.linkNext(
                                    respostaContratacaoEfetuadaSucesso.id,
                                    perguntaQuerAlgoMais.id);
    contratarPacote.linkNext(
        intencaoProblemaNaInternet.getPath('Não').id,
        verificaPacoteVazio.id);
                        
    
// contratarPacote.linkNext(
//     verificaBillingProfile.getPath('Não').id,
//     verificaClienteInadimplente.id);















contratarPacote.mapScenarios();
contratarPacote.showScenarios();