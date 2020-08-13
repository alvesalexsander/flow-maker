const religa = require('./map');

const nodes = {
    startReliga: religa.newNode('starting', {
        name: 'Inicia fluxo de religa',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    impedido: religa.newNode('node', {
        name: 'Impedido de prosseguir por motivos externos',
        stepMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).',
        expectedMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).'
    }).turnTargetNode(),

    saudacaoURA: religa.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: religa.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA informa que vai tranferir para o ATH.'

    }).turnTargetNode(),

    encaminhaFluxoContratarPacotes: religa.newNode('node', {
        name: "URA encaminha para o fluxo de contratação de pacotes",
        stepMessage: "Encaminha para o Fluxo de Contratação de Pacotes.",
        expectedMessage: 'URA entra no fluxo de contratação de pacotes.'

    }).turnTargetNode(),

    encerraLigacao: religa.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: religa.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Quer fazer Religa',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se ele tem interesse no processo de Religa;'
    }),

    verificaProprioAparelho: religa.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaSenhaUnica: religa.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['* Sucesso fluxo de senha', '* Falha fluxo de senha']
    }),

    perguntaQuerAlgoMais: religa.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: [/* 'Quer algo mais',  */'Não quer mais nada']
    }),

    desambiguador: religa.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: religa.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),
    

    btt: religa.newNode('switch', {
        name: 'Verifica se é BTT',
        pathCases: ['* Cliente BTT', '* Cliente não é BTT']
    }),

    dizBloqFinanceiro: religa.newNode('node', {
        name: 'Informa que o usuário possui bloqueio financeiro',
        expectedMessage: 'A URA Cognitiva informa que o usuário possui bloqueio financeiro por falta de pagamento;'
    }),

    mais1Fatura: religa.newNode('switch', {
        name: 'Verifica se é possui 1 ou mais faturas em aberto',
        pathCases: ['* 1 Fatura em Aberto', '* Mais de 1 Fatura em Aberto']
    }),

    mais1FaturaNao: religa.newNode('node', {
        name: 'Nao tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva explica porque o usuário não consegue realizar ou receber chamadas, navegar na internet e que deve regularizar a situação para ter os benefícios de volta;'
    }),

    mais1FaturaSim: religa.newNode('node', {
        name: 'Tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva explica porque o usuário não consegue realizar ou receber chamadas, navegar na internet e que deve regularizar a situação para ter os benefícios de volta;'
    }),

    bttClienteTitular: religa.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    bttClienteTitularMais1: religa.newNode('switch', {
        name: 'Verifica se cliente é titular (mais de 1 fatura)',
        pathCases: ['* Não é titular', '* É titular']
    }),

    servicoCodigoBarras7: religa.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 7',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras']
    }),

    servicoCodigoBarras1: religa.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 1',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    servicoCodigoBarras1Mais1: religa.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (mais 1 fatura)',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    enviaFaturasSMS: religa.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    enviaFaturasSMSMais1: religa.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    servicoLinkNegocia2: religa.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (link negocia)',
        pathCases: ['Link Negocia enviado', '* Falha SMS (Link Negocia)']
    }),
    
    enviaLinkNegocia: religa.newNode('node', {
        name: 'Informa que enviou o link negocia',
        expectedMessage: 'A URA Cognitiva informa que enviou o link do Negocia pelo SMS;'
    }),

    podeAcessarFaturasNoSite: religa.newNode('node', {
        name: 'Informa que usuário pode acessar faturas no site',
        expectedMessage: 'A URA Cognitiva informa que o usuário pode acessar, negociar e fazer o pagamento das faturas pelo site;'
    }),

    bto: religa.newNode('switch', {
        name: 'Verifica se é BTO',
        pathCases: ['* Cliente é BTO', '* Cliente não é BTO']
    }),

    elegivelReliga: religa.newNode('switch', {
        name: 'Verifica se é Elegivel ao Religa',
        pathCases: ['* Elegível ao Religa', '* Não elegível ao Religa']
    }),

    btoClienteTitular: religa.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    veioFluxoInformaContaPaga: religa.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não veio de "Informa Conta Paga"', '* Veio de "Informa Conta Paga"']
    }),

    naoInformouContaPaga: religa.newNode('node', {
        name: 'Informa que usuario está com a linha bloq., que pode solicitar o desbloq. mas que precisa pagar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está com a linha bloqueada e que pode solicitar o desbloqueio, mas lembra ao usuário que precisa pagar em 24 horas;'
    }),

    ofereceReliga: religa.newNode('node', {
        name: 'Informa que oferece o desbloqueio em confiança (religa)',
        expectedMessage: 'A URA Cognitiva oferece o desbloqueio em confiança (religa) da linha;'
    }),

    respostaOfereceReliga: religa.newNode('switch', {
        name: 'Verifica se cliente deseja efetuar o religa',
        pathCases: ['Não aceita Religa', 'Aceita Religa']
    }),

    servicoReliga: religa.newNode('switch', {
        name: 'Chama o serviço Religa',
        pathCases: ['* Sucesso no Religa', '* Falha no Religa']
    }),

    respNaoETitular: religa.newNode('node', {
        name: 'Fala da URA quando cliente é BTO mas nao é titular)',
        expectedMessage: 'A URA Cognitiva informa que a linha está bloqueada porque não identificou o pagamento. Informa como funciona o desbloqueio em confiança e também informa que para solicitar o desbloqueio, precisa ser o titular.;'
    }),

    motivoBloq: religa.newNode('switch', {
        name: 'Motivo do bloqueio',
        pathCases: ['* Motivo: Quebra de confiança', '* Motivo: Já solicitou nas últimas 24h']
    }),

    motivoBloqQuebra: religa.newNode('node', {
        name: 'URA Explica o motivo do bloqueio QUEBRA DE CONFIANÇA',
        expectedMessage: 'A URA Cognitiva explica que o motivo do bloqueio é QUEBRA DE CONFIANÇA;'
    }),

    motivoBloq24h: religa.newNode('node', {
        name: 'URA Explica o motivo do bloqueio SOLICITADO NAS ULTIMAS 24H',
        expectedMessage: 'A URA Cognitiva explica que já foi feito um pedido de desbloqueio em confiança nas ultimas 24h  e que está em andamento;'
    }),

    quebraTitular: religa.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    servicoLinkNegocia6: religa.newNode('switch', {
        name: 'Chama o serviço de envio Link Negocia',
        pathCases: ['* Sucesso SMS (Link Negocia)', '* Falha SMS (Link Negocia)']
    }),

    SucessoLinkNegocia6: religa.newNode('node', {
        name: 'URA informa o sucesso do serviço LINK NEGOCIA 6',
        expectedMessage: 'A URA Cognitiva informa que enviou o Link Negocia e pergunta se o usuário deseja o envio da fatura que gerou o bloqueio;'
    }),

    querFaturaBloq: religa.newNode('switch', {
        name: 'Pergunta se o usuário quer fatura que gerou o bloqueio',
        pathCases: ['* Não quer fatura do bloqueio', '* Quer fatura do bloqueio']
    }),

    servicoCodigoBarras5: religa.newNode('switch', {
        name: 'Chama o serviço de envio Link Negocia',
        pathCases: ['* Sucesso Serviço Cód.Barras/SMS', '* Falha Serviço Cód.Barras/SMS']
    }),

    expectFalhaCodBarra5: religa.newNode('node', {
        name: 'Mensagem de Falha no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que por uma instabilidade no sistema não conseguiu enviar as faturas e oferece transferencia para o ATH para concluir o atendimento;'
    }),

    ofereceATH: religa.newNode('switch', {
        name: 'Chama o serviço de envio Link Negocia',
        pathCases: ['Aceita ir para ATH', 'Não quer falar com ATH']
    }),

    expectSucessoCodBarras5: religa.newNode('node', {
        name: 'Mensagem de Sucesso no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que enviou a(s) fatura(s);'
    }),

    maisDe1FaturaAberto: religa.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Não possui mais de 1 fatura em aberto', '* Possui mais de 1 fatura em aberto']
    }),

    expectOfereceFatAberto: religa.newNode('node', {
        name: 'URA oferece enviar as demais faturas em aberto',
        expectedMessage: 'A URA Cognitiva oferece o envio das demais faturas em aberto;'
    }),

    querReceberFatEmAberto: religa.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['Não quer receber demais faturas', 'Quer receber todas as faturas']
    }),

    enviaDemaisFaturas: religa.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Falha ao enviar demais faturas', '* Sucesso ao enviar demais faturas']
    }),

    expectEnviaDemaisFaturas: religa.newNode('node', {
        name: 'URA informa que enviou as demais faturas',
        expectedMessage: 'A URA Cognitiva informa que enviou as demais faturas em aberto;'
    }),

    ultimas24hTitular: religa.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    expectTitular24h: religa.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio;'
    }),

    expectNaoTitular24h: religa.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber o codigo de barras da fatura que gerou este bloqueio;'
    }),

    querFaturaBloqNaoTitular: religa.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['Não quer fatura do bloqueio', 'Quer fatura do bloqueio']
    }),

    falhaLinkNegocia6: religa.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    expectNaoQuerFatura: religa.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    falhaServicoReliga: religa.newNode('node', {
        name: 'Mensagem de falha no serviço religa',
        expectedMessage: 'A URA Cognitiva informa que não foi possivel concluir a solicitação por instabilidade nos sistemas;'
    }),

    expectPerguntaDificuldade: religa.newNode('node', {
        name: 'Mensagem perguntando se ter dificuldade na internet',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário está com dificuldade para usar os serviços;'
    }),

    possuiDificuldade: religa.newNode('switch', {
        name: 'Possui dificuldade de usar os serviços?',
        pathCases: ['Sem dificuldades', 'Está enfrentando dificuldade']
    }),

    expectPerguntaQualDificuldade: religa.newNode('node', {
        name: 'Mensagem perguntando em qual serviço está com dificuldade',
        expectedMessage: 'A URA Cognitiva pergunta em qual serviço o usuário está com dificuldades/problemas;'
    }),

    qualDificuldade: religa.newNode('switch', {
        name: 'Dificuldade em qual serviço?',
        pathCases: ['Prob. na Internet', 'Prob. nas ligações']
    }),

    servicoConsultaDados: religa.newNode('switch', {
        name: 'Serviço Consulta Dados?',
        pathCases: ['* Sucesso na Consulta de Dados', '* Falha na Consulta de Dados']
    }),

    internetReduzida: religa.newNode('switch', {
        name: 'Possui internet reduzida?',
        pathCases: ['* Navegação Reduzida', '* Navegação Normal']
    }),

    billingProfile: religa.newNode('switch', {
        name: 'Serviço Billing Profile',
        pathCases: ['* Sucesso no billing', '* Falha no billing']
    }),

    expectVelocidadeReduzida: religa.newNode('node', {
        name: 'Mensagem informando velocidade reduzida',
        expectedMessage: 'A URA Cognitiva informa que a velocidade está reduzida e a data de renovação;'
    }),

    querSaberDosPacotes: religa.newNode('switch', {
        name: 'URA pergunta se usuário quer saber mais sobre os pacotes de dados adicionais',
        pathCases: ['Quer pacote adicional', 'Não quer pacote adicional']
    }),

    expectNavegacaoNormal: religa.newNode('node', {
        name: 'Mensagem informando internet normal',
        expectedMessage: 'A URA Cognitiva informa que o usuário ainda possui internet para navegar normalmente;'
    }),

    continuarOuATH: religa.newNode('switch', {
        name: 'URA pergunta se usuário quer continuar o atendimento na URA ou no ATH',
        pathCases: ['Quer falar com ATH', 'Quer continuar na URA']
    }),
    
    jaReiniciou: religa.newNode('switch', {
        name: 'URA pergunta se usuário já tentou reiniciou o aparelho',
        pathCases: ['Já reiniciou', 'Não reiniciou']
    }),

    enviaGuiaApararelho: religa.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['* Sucesso no Envio do Guia', '* Falha no Envio do Guia']
    }),

    expectSucessoEnvioGuia: religa.newNode('node', {
        name: 'Mensagem informando que enviou o Guia de Aparelho',
        expectedMessage: 'A URA Cognitiva informa que enviou o guia do aparelho por SMS para ajudar a configurar;'
    }),

    expectFalhaEnvioGuia: religa.newNode('node', {
        name: 'Mensagem informando que o guia do aparelho está disponivel no site',
        expectedMessage: 'A URA Cognitiva informa que o guia do aparelho está disponível no site para ajudar a configurar;'
    }),

    insisteReinicio: religa.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['Aceita Reiniciar', 'Não quer reiniciar']
    }),

    expectContinuarOuATH: religa.newNode('node', {
        name: 'URA pergunta se quer continuar ou ir ATH',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer continuar o atendimento ou falar com o ATH;'
    }),

    expectQuerSaberDosPacotes: religa.newNode('node', {
        name: 'URA pergunta se quer saber dos pacotes adicionais',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer saber mais sobre os pacotes adicionais;'
    }),

    expectInsisteReinicio: religa.newNode('node', {
        name: 'URA insiste e pergunta se usuario nao gostaria de tentar reiniciar',
        expectedMessage: 'A URA Cognitiva pergunta se usuário não gostaria de tentar reiniciar o aparelho;'
    }),

};

console.log(Object.keys(nodes))
console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;