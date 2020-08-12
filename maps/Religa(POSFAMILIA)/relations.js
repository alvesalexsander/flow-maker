const religa = require('./map');
const {
    startReliga,
    impedido,
    saudacaoURA,
    transfereParaATH,
    encerraLigacao,
    viaDeAcesso,
    verificaProprioAparelho,
    verificaSenhaUnica,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    btt,
    dizBloqFinanceiro,
    mais1Fatura,
    mais1FaturaNao,
    mais1FaturaSim,
    bttClienteTitular,
    bttClienteTitularMais1,
    servicoCodigoBarras7,
    servicoCodigoBarras1,
    servicoCodigoBarras1Mais1,
    enviaFaturasSMS,
    enviaFaturasSMSMais1,
    servicoLinkNegocia2,
    enviaLinkNegocia,
    podeAcessarFaturasNoSite,
    bto,
    elegivelReliga,
    btoClienteTitular,
    veioFluxoInformaContaPaga,
    naoInformouContaPaga,
    ofereceReliga,
    respostaOfereceReliga,
    servicoReliga,
    respNaoETitular,
    motivoBloq,
    motivoBloqQuebra,
    motivoBloq24h,
    quebraTitular,
    servicoLinkNegocia6,
    SucessoLinkNegocia6,
    querFaturaBloq,
    servicoCodigoBarras5,
    expectFalhaCodBarra5,
    ofereceATH,
    expectSucessoCodBarras5,
    maisDe1FaturaAberto,
    expectOfereceFatAberto,
    querReceberFatEmAberto,
    enviaDemaisFaturas,
    expectEnviaDemaisFaturas,
    ultimas24hTitular,
    expectTitular24h,
    expectNaoTitular24h,
    querFaturaBloqNaoTitular,
    falhaLinkNegocia6,
    falhaServicoReliga
} = require('./nodes');

religa.linkChain(
    // comum
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

// serviços
    // Serviço Código de Barras (7)
    [servicoCodigoBarras7.getPath('* Falha Serviço Cód.Barras'), podeAcessarFaturasNoSite],
        [podeAcessarFaturasNoSite, perguntaQuerAlgoMais],
    // Serviço Código de Barras (5)
    [servicoCodigoBarras5.getPath('* Falha Serviço Cód.Barras/SMS'), expectFalhaCodBarra5],
        [expectFalhaCodBarra5, ofereceATH],
            [ofereceATH.getPath('Aceita ir para ATH'), transfereParaATH],
            [ofereceATH.getPath('Não quer falar com ATH'), perguntaQuerAlgoMais],

        
    // Serviço Código de Barras e fatura por SMS(1)
    [servicoCodigoBarras1.getPath('* Falha Serviço Cód.Barras/Fatura'), podeAcessarFaturasNoSite],
    [servicoCodigoBarras1Mais1.getPath('* Falha Serviço Cód.Barras/Fatura'), podeAcessarFaturasNoSite],
    // Serviço Negocia
    [servicoLinkNegocia2.getPath('* Falha SMS (Link Negocia)'), perguntaQuerAlgoMais],
    [servicoLinkNegocia6.getPath('* Falha SMS (Link Negocia)'), falhaLinkNegocia6],
        [falhaLinkNegocia6, querFaturaBloq],
        [querFaturaBloq.getPath('* Não quer fatura do bloqueio'), perguntaQuerAlgoMais],
        // [expectNaoQuerFatura, perguntaQuerAlgoMais],
    // Serviço Religa
    [servicoReliga.getPath('* Falha no Religa'), falhaServicoReliga],
    [falhaServicoReliga, perguntaQuerAlgoMais],


    [startReliga, viaDeAcesso],
    [viaDeAcesso, btt],
        // BTT
        [btt.getPath('* Cliente BTT'), dizBloqFinanceiro],
            [dizBloqFinanceiro, mais1Fatura],
                [mais1Fatura.getPath('* 1 Fatura em Aberto'), mais1FaturaNao],
                    [mais1FaturaNao, bttClienteTitular],
                        [bttClienteTitular.getPath('* Não é titular'), servicoCodigoBarras7],
                            [servicoCodigoBarras7.getPath('* Sucesso no envio SMS'), enviaFaturasSMS],
                            [enviaFaturasSMS, perguntaQuerAlgoMais],
                            //
                        [bttClienteTitular.getPath('* É titular'), servicoCodigoBarras1],
                            [servicoCodigoBarras1.getPath('* Sucesso no envio SMS'), enviaFaturasSMS],
                                [enviaFaturasSMS, perguntaQuerAlgoMais],
                [mais1Fatura.getPath('* Mais de 1 Fatura em Aberto'), mais1FaturaSim],
                    [mais1FaturaSim, bttClienteTitularMais1],
                        [bttClienteTitularMais1.getPath('* Não é titular'), servicoCodigoBarras7],
                        [bttClienteTitularMais1.getPath('* É titular'), servicoCodigoBarras1Mais1],
                                [servicoCodigoBarras1Mais1.getPath('* Sucesso no envio SMS'), enviaFaturasSMSMais1],
                                [enviaFaturasSMSMais1, servicoLinkNegocia2],
                                    [servicoLinkNegocia2.getPath('Link Negocia enviado'), enviaLinkNegocia],
                                    [enviaLinkNegocia, perguntaQuerAlgoMais],

        [btt.getPath('* Cliente não é BTT').noStepMessage(), bto],

        // BTO
        [bto.getPath('* Cliente é BTO'), elegivelReliga],
            [elegivelReliga.getPath('* Elegível ao Religa'), btoClienteTitular],
                [btoClienteTitular.getPath('* É titular'), veioFluxoInformaContaPaga],
                    [veioFluxoInformaContaPaga.getPath('* Não veio de "Informa Conta Paga"').noStepMessage(), naoInformouContaPaga],
                    [naoInformouContaPaga, ofereceReliga],
                    [ofereceReliga, respostaOfereceReliga],
                        [respostaOfereceReliga.getPath('Não aceita Religa'), perguntaQuerAlgoMais],

                        [respostaOfereceReliga.getPath('Aceita Religa'), verificaProprioAparelho],
                            [verificaProprioAparelho.getPath('* Ligando do próprio aparelho'), servicoReliga],
                            [servicoReliga.getPath('* Sucesso no Religa'), impedido],

                            [verificaProprioAparelho.getPath('* Ligando de outro aparelho'), impedido],

                [btoClienteTitular.getPath('* Não é titular'), respNaoETitular],
                [respNaoETitular, servicoCodigoBarras7],
            [elegivelReliga.getPath('* Não elegível ao Religa'), motivoBloq],
                [motivoBloq.getPath('* Motivo: Quebra de confiança'), motivoBloqQuebra],
                    [motivoBloqQuebra, quebraTitular],
                        [quebraTitular.getPath('* É titular'), servicoLinkNegocia6],
                            [servicoLinkNegocia6.getPath('* Sucesso SMS (Link Negocia)'), SucessoLinkNegocia6],
                            [SucessoLinkNegocia6, querFaturaBloq],
                                [querFaturaBloq.getPath('* Quer fatura do bloqueio'), servicoCodigoBarras5],
                                    [servicoCodigoBarras5.getPath('* Sucesso Serviço Cód.Barras/SMS'), expectSucessoCodBarras5],
                                    [expectSucessoCodBarras5, maisDe1FaturaAberto],
                                        [maisDe1FaturaAberto.getPath('* Não possui mais de 1 fatura em aberto'), perguntaQuerAlgoMais],
                                        [maisDe1FaturaAberto.getPath('* Possui mais de 1 fatura em aberto'), expectOfereceFatAberto],
                                        [expectOfereceFatAberto, querReceberFatEmAberto],
                                            [querReceberFatEmAberto.getPath('Não quer receber demais faturas'), perguntaQuerAlgoMais],
                                            
                                            [querReceberFatEmAberto.getPath('Quer receber todas as faturas'), enviaDemaisFaturas],
                                                [enviaDemaisFaturas.getPath('* Falha ao enviar demais faturas'), expectFalhaCodBarra5],
                                                [enviaDemaisFaturas.getPath('* Sucesso ao enviar demais faturas'), expectEnviaDemaisFaturas],
                                                [expectEnviaDemaisFaturas, perguntaQuerAlgoMais],
                                            //
                        [quebraTitular.getPath('* Não é titular'), servicoCodigoBarras7],
                        //
                [motivoBloq.getPath('* Motivo: Já solicitou nas últimas 24h'), motivoBloq24h],
                    [motivoBloq24h, ultimas24hTitular],
                        [ultimas24hTitular.getPath('* É titular'), expectTitular24h],
                            [expectTitular24h, querFaturaBloq],
                        [ultimas24hTitular.getPath('* Não é titular'), expectNaoTitular24h],
                            [expectNaoTitular24h, querFaturaBloqNaoTitular],
                                [querFaturaBloqNaoTitular.getPath('Não quer fatura do bloqueio'), perguntaQuerAlgoMais],
                                [querFaturaBloqNaoTitular.getPath('Quer fatura do bloqueio'), servicoCodigoBarras7],

        [bto.getPath('* Cliente não é BTO').noStepMessage(), impedido],

)


religa.mapScenarios();
// religa.showScenarios();
religa.exportScenariosToExcel();