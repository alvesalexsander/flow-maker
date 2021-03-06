const pagarConta = require('./map');

const nodes = {
    startPagarConta: pagarConta.newNode('starting', {
        name: 'Inicia fluxo de pagarConta',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    impedido: pagarConta.newNode('node', {
        name: 'Impedido de prosseguir por motivos externos',
        stepMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).',
        expectedMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).'
    }).turnTargetNode(),

    saudacaoURA: pagarConta.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: pagarConta.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA informa que vai tranferir para o ATH.'

    }).turnTargetNode(),

    encaminhaFluxoContratarPacotes: pagarConta.newNode('node', {
        name: "URA encaminha para o fluxo de contratação de pacotes",
        stepMessage: "Encaminha para o Fluxo de Contratação de Pacotes.",
        expectedMessage: 'URA entra no fluxo de contratação de pacotes.'

    }).turnTargetNode(),

    encerraLigacao: pagarConta.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: pagarConta.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de um dos desambiguadores: PagarConta, SegundaVia, CodigoDeBarras, NaoRecebimentoFatura',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se ele tem interesse no processo de Religa;'
    }),

    verificaProprioAparelho: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaSenhaUnica: pagarConta.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['* Sucesso fluxo de senha', '* Falha fluxo de senha']
    }),

    perguntaQuerAlgoMais: pagarConta.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: [/* 'Quer algo mais',  */'Não quer mais nada']
    }),

    desambiguador: pagarConta.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: pagarConta.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),
    

    btt: pagarConta.newNode('switch', {
        name: 'Verifica se é BTT',
        pathCases: ['* Cliente BTT', '* Cliente não é BTT']
    }),

    dizBloqFinanceiro: pagarConta.newNode('node', {
        name: 'Informa que o usuário possui bloqueio financeiro',
        expectedMessage: 'A URA Cognitiva informa que o usuário possui bloqueio financeiro por falta de pagamento;'
    }),

    mais1Fatura: pagarConta.newNode('switch', {
        name: 'Verifica se é possui 1 ou mais faturas em aberto',
        pathCases: ['* 1 Fatura em Aberto', '* Mais de 1 Fatura em Aberto']
    }),

    mais1FaturaNao: pagarConta.newNode('node', {
        name: 'Nao tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva informa que enviou a fatura que estava em aberto;'
    }),

    mais1FaturaSim: pagarConta.newNode('node', {
        name: 'Tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas que estavam em aberto;'
    }),

    mainClienteTitular: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    mainClienteTitularMais1: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (mais de 1 fatura)',
        pathCases: ['* Não é titular', '* É titular']
    }),

    servicoCodigoBarras7: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 7',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras']
    }),

    servicoCodigoBarras1: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 1',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    servicoCodigoBarras1Mais1: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (mais 1 fatura)',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    enviaFaturasSMS: pagarConta.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    enviaFaturasSMSMais1: pagarConta.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    servicoLinkNegocia2: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (link negocia)',
        pathCases: ['Link Negocia enviado', '* Falha SMS (Link Negocia)']
    }),
    
    enviaLinkNegocia: pagarConta.newNode('node', {
        name: 'Informa que enviou o link negocia',
        expectedMessage: 'A URA Cognitiva informa que enviou o link do Negocia pelo SMS;'
    }),

    podeAcessarFaturasNoSite: pagarConta.newNode('node', {
        name: 'Informa que usuário pode acessar faturas no site',
        expectedMessage: 'A URA Cognitiva informa que o usuário pode acessar, negociar e fazer o pagamento das faturas pelo site;'
    }),

    bto: pagarConta.newNode('switch', {
        name: 'Verifica se é BTO',
        pathCases: ['* Cliente é BTO', '* Cliente não é BTO']
    }),

    elegivelReliga: pagarConta.newNode('switch', {
        name: 'Verifica se é Elegivel ao Religa',
        pathCases: ['* Elegível ao Religa', '* Não elegível ao Religa']
    }),

    btoClienteTitular: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    veioFluxoInformaContaPaga: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não veio de "Informa Conta Paga"', '* Veio de "Informa Conta Paga"']
    }),

    naoInformouContaPaga: pagarConta.newNode('node', {
        name: 'Informa que usuario está com a linha bloq., que pode solicitar o desbloq. mas que precisa pagar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está com a linha bloqueada e que pode solicitar o desbloqueio, mas lembra ao usuário que precisa pagar em 24 horas;'
    }),

    ofereceReliga: pagarConta.newNode('node', {
        name: 'Informa que oferece o desbloqueio em confiança (pagarConta)',
        expectedMessage: 'A URA Cognitiva oferece o desbloqueio em confiança (pagarConta) da linha;'
    }),

    respostaOfereceReliga: pagarConta.newNode('switch', {
        name: 'Verifica se cliente deseja efetuar o pagarConta',
        pathCases: ['Não aceita Religa', 'Aceita Religa']
    }),

    servicoReliga: pagarConta.newNode('switch', {
        name: 'Chama o serviço Religa',
        pathCases: ['* Sucesso no Religa', '* Falha no Religa']
    }),

    respNaoETitular: pagarConta.newNode('node', {
        name: 'Fala da URA quando cliente é BTO mas nao é titular)',
        expectedMessage: 'A URA Cognitiva informa que a linha está bloqueada porque não identificou o pagamento. Informa como funciona o desbloqueio em confiança e também informa que para solicitar o desbloqueio, precisa ser o titular.;'
    }),

    motivoBloq: pagarConta.newNode('switch', {
        name: 'Motivo do bloqueio',
        pathCases: ['* Motivo: Quebra de confiança', '* Motivo: Já solicitou nas últimas 24h']
    }),

    motivoBloqQuebra: pagarConta.newNode('node', {
        name: 'URA Explica o motivo do bloqueio QUEBRA DE CONFIANÇA',
        expectedMessage: 'A URA Cognitiva explica que o motivo do bloqueio é QUEBRA DE CONFIANÇA;'
    }),

    motivoBloq24h: pagarConta.newNode('node', {
        name: 'URA Explica o motivo do bloqueio SOLICITADO NAS ULTIMAS 24H',
        expectedMessage: 'A URA Cognitiva explica que já foi feito um pedido de desbloqueio em confiança nas ultimas 24h  e que está em andamento;'
    }),

    quebraTitular: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    servicoLinkNegocia6: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio Link Negocia',
        pathCases: ['* Sucesso SMS (Link Negocia)', '* Falha SMS (Link Negocia)']
    }),

    SucessoLinkNegocia6: pagarConta.newNode('node', {
        name: 'URA informa o sucesso do serviço LINK NEGOCIA 6',
        expectedMessage: 'A URA Cognitiva informa que enviou o Link Negocia e pergunta se o usuário deseja o envio da fatura que gerou o bloqueio;'
    }),

    querFaturaBloq: pagarConta.newNode('switch', {
        name: 'Pergunta se o usuário quer fatura que gerou o bloqueio',
        pathCases: ['* Não quer fatura do bloqueio', '* Quer fatura do bloqueio']
    }),

    servicoCodigoBarras5: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio SMS 5',
        pathCases: ['* Sucesso Serviço Cód.Barras/SMS', '* Falha Serviço Cód.Barras/SMS']
    }),

    servicoCodigoBarras52: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio SMS 5',
        pathCases: ['* Sucesso Serviço Cód.Barras/SMS', '* Falha Serviço Cód.Barras/SMS']
    }),

    expectFalhaCodBarra5: pagarConta.newNode('node', {
        name: 'Mensagem de Falha no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que por uma instabilidade no sistema não conseguiu enviar as faturas e que as faturas estão disponiveis no site. Também oferece transferencia para o ATH para concluir o atendimento;'
    }),

    ofereceATH: pagarConta.newNode('switch', {
        name: 'Oferece transferir para o ATH',
        pathCases: ['Aceita ir para ATH', 'Não quer falar com ATH']
    }),

    expectSucessoCodBarras5: pagarConta.newNode('node', {
        name: 'Mensagem de Sucesso no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que enviou a(s) fatura(s);'
    }),

    maisDe1FaturaAberto: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Não possui mais de 1 fatura em aberto', '* Possui mais de 1 fatura em aberto']
    }),

    expectOfereceFatAberto: pagarConta.newNode('node', {
        name: 'URA oferece enviar as demais faturas em aberto',
        expectedMessage: 'A URA Cognitiva oferece o envio das demais faturas em aberto;'
    }),

    querReceberFatEmAberto: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['Não quer receber demais faturas', 'Quer receber todas as faturas']
    }),

    enviaDemaisFaturas: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Falha ao enviar demais faturas', '* Sucesso ao enviar demais faturas']
    }),

    expectEnviaDemaisFaturas: pagarConta.newNode('node', {
        name: 'URA informa que enviou as demais faturas',
        expectedMessage: 'A URA Cognitiva informa que enviou as demais faturas em aberto;'
    }),

    ultimas24hTitular: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    expectTitular24h: pagarConta.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio;'
    }),

    expectNaoTitular24h: pagarConta.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber o codigo de barras da fatura que gerou este bloqueio;'
    }),

    querFaturaBloqNaoTitular: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['Não quer fatura do bloqueio', 'Quer fatura do bloqueio']
    }),

    falhaLinkNegocia6: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    falhaLinkNegocia2: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que ocorreu um erro no sistema e não será possivel prosseguir. Também informa que o cliente pode acessar as faturas pelo site de forma rápida e segura;'
    }),

    expectNaoQuerFatura: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    falhaServicoReliga: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço pagarConta',
        expectedMessage: 'A URA Cognitiva informa que não foi possivel concluir a solicitação por instabilidade nos sistemas;'
    }),

    expectPerguntaDificuldade: pagarConta.newNode('node', {
        name: 'Mensagem perguntando se ter dificuldade na internet',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário está com dificuldade para usar os serviços;'
    }),

    possuiDificuldade: pagarConta.newNode('switch', {
        name: 'Possui dificuldade de usar os serviços?',
        pathCases: ['Sem dificuldades', 'Está enfrentando dificuldade']
    }),

    expectPerguntaQualDificuldade: pagarConta.newNode('node', {
        name: 'Mensagem perguntando em qual serviço está com dificuldade',
        expectedMessage: 'A URA Cognitiva pergunta em qual serviço o usuário está com dificuldades/problemas;'
    }),

    qualDificuldade: pagarConta.newNode('switch', {
        name: 'Dificuldade em qual serviço?',
        pathCases: ['Problema na Internet', 'Problema nas ligações']
    }),

    servicoConsultaDados: pagarConta.newNode('switch', {
        name: 'Serviço Consulta Dados?',
        pathCases: ['* Sucesso na Consulta de Dados', '* Falha na Consulta de Dados']
    }),

    internetReduzida: pagarConta.newNode('switch', {
        name: 'Possui internet reduzida?',
        pathCases: ['* Navegação Reduzida', '* Navegação Normal']
    }),

    billingProfile: pagarConta.newNode('switch', {
        name: 'Serviço Billing Profile',
        pathCases: ['* Sucesso no billing', '* Falha no billing']
    }),

    expectVelocidadeReduzida: pagarConta.newNode('node', {
        name: 'Mensagem informando velocidade reduzida',
        expectedMessage: 'A URA Cognitiva informa que a velocidade está reduzida e a data de renovação;'
    }),

    querSaberDosPacotes: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário quer saber mais sobre os pacotes de dados adicionais',
        pathCases: ['Quer pacote adicional', 'Não quer pacote adicional']
    }),

    expectNavegacaoNormal: pagarConta.newNode('node', {
        name: 'Mensagem informando internet normal',
        expectedMessage: 'A URA Cognitiva informa que o usuário ainda possui internet para navegar normalmente;'
    }),

    continuarOuATH: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário quer continuar o atendimento na URA ou no ATH',
        pathCases: ['Quer falar com ATH', 'Quer continuar na URA']
    }),
    
    jaReiniciou: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário já tentou reiniciou o aparelho',
        pathCases: ['Já reiniciou', 'Não reiniciou']
    }),

    enviaGuiaApararelho: pagarConta.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['* Sucesso no Envio do Guia', '* Falha no Envio do Guia']
    }),

    expectSucessoEnvioGuia: pagarConta.newNode('node', {
        name: 'Mensagem informando que enviou o Guia de Aparelho',
        expectedMessage: 'A URA Cognitiva informa que enviou o guia do aparelho por SMS para ajudar a configurar;'
    }),

    expectFalhaEnvioGuia: pagarConta.newNode('node', {
        name: 'Mensagem informando que o guia do aparelho está disponivel no site',
        expectedMessage: 'A URA Cognitiva informa que o guia do aparelho está disponível no site para ajudar a configurar;'
    }),

    insisteReinicio: pagarConta.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['Aceita Reiniciar', 'Não quer reiniciar']
    }),

    expectContinuarOuATH: pagarConta.newNode('node', {
        name: 'URA pergunta se quer continuar ou ir ATH',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer continuar o atendimento ou falar com o ATH;'
    }),

    expectQuerSaberDosPacotes: pagarConta.newNode('node', {
        name: 'URA pergunta se quer saber dos pacotes adicionais',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer saber mais sobre os pacotes adicionais;'
    }),

    expectInsisteReinicio: pagarConta.newNode('node', {
        name: 'URA insiste e pergunta se usuario nao gostaria de tentar reiniciar',
        expectedMessage: 'A URA Cognitiva pergunta se usuário não gostaria de tentar reiniciar o aparelho;'
    }),

    veioDeNaoRecebimentoFatura: pagarConta.newNode('node', {
        name: 'veio de desambiguador naoRecebimentoFatura',
        expectedMessage: 'Caso tenha vindo de #desambiguadorNaoRecebimentoDeFatura a URA Cognitiva verifica se o cliente é conta digital ou não. Caso seja conta digital, informa que o cliente recebe as faturas por e-mail. Caso não seja, solicita que o cliente confira se o endereço está correto no APP;'
    }),

    expectNaoRecebimentoFatura: pagarConta.newNode('node', {
        name: 'URA informa que entendeu que está com problemas fatura',
        expectedMessage: 'A URA Cognitiva informa que entendeu que o cliente está com problemas relacionados ao recebimento da fatura;'
    }),

    contaDigital: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['* É conta digital', '* Não é conta digital']
    }),

    expectContaDigital: pagarConta.newNode('node', {
        name: 'resposta caso seja conta digital',
        expectedMessage: 'A URA Cognitiva informa que como o cliente possui conta digital, recebe as faturas apenas por e-mail e que as também ficam disponíveis no App;'
    }),

    expectNaoContaDigital: pagarConta.newNode('node', {
        name: 'resposta caso não seja conta digital',
        expectedMessage: 'A URA Cognitiva sugere que o cliente verifique se o endereço cadastrado no app está correto;'
    }),

    faturaEmAberto: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['* Possui fatura em aberto', '* Não possui fatura em aberto']
    }),

    intencaoCodigoBarras: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['VEIO DE DESAMBIGUADOR CODIGOBARRAS', 'Não veio de desambiguadorCodigoBarras']
    }),

    aceitaCodBarras: pagarConta.newNode('switch', {
        name: 'Aceita receber código de barras via SMS?',
        pathCases: ['Aceita receber Código de Barras', 'Não aceita receber Código de Barras']
    }),

    expectNaoAceitaCodBarra: pagarConta.newNode('node', {
        name: 'resposta caso não aceite código de barras',
        expectedMessage: 'A URA Cognitiva informa que apenas o titular do plano pode receber a segunda via e que caso precise da segunda vida, pedir para o titular entrar em contato;'
    }),

    clienteInsiste: pagarConta.newNode('switch', {
        name: 'cliente insiste em codBarras',
        pathCases: ['Quer algo mais: #desambiguadorCodigoBarras ou SegundaVia ou Pagar Conta ou NaoRecebimentoFatura', 'Não quer mais nada']
    }),

    insisteFaturasAberto: pagarConta.newNode('switch', {
        name: 'verifica na insistencia se possui faturas em aberto',
        pathCases: ['* (insistencia) Não possui faturas em aberto', '* (insistencia) Possui faturas em aberto']
    }),

    insisteFaturasAbertoNao: pagarConta.newNode('node', {
        name: 'resposta caso não exista faturas em aberto insistencia',
        expectedMessage: 'A URA Cognitiva informa que apenas o titular do plano pode receber a segunda via e que caso precise da segunda vida, pedir para o titular entrar em contato;'
    }),

    insisteFaturasAbertoSim: pagarConta.newNode('node', {
        name: 'resposta caso exista faturas em aberto insistencia',
        expectedMessage: 'A URA Cognitiva informa que como o cliente não é o titular, não é possível enviar a segunda vida da fatura, mas que já enviou o código de barras;'
    }),

    expectNaoPossuiFaturaAberto: pagarConta.newNode('node', {
        name: 'cliente nao possui faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que o cliente não possui faturas em aberto e que apenas o titular do plano pode solicitar uma segunda via.;'
    }),

    pediuAlgumMes: pagarConta.newNode('switch', {
        name: 'verifica se pediu algum mes especifico',
        pathCases: ['Fatura de um mês espefícico', 'Não pediu mês específico']
    }),

    mesPossuiFaturaAberto: pagarConta.newNode('switch', {
        name: 'verifica se o mes pedido está entre as faturas em aberto',
        pathCases: ['Mês está nas faturas em aberto', 'Mês não está nas faturas em aberto']
    }),

    faturaUltimos12meses: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 12 meses',
        pathCases: ['Não é dos últimos 12 meses', 'É dos últimos 12 meses']
    }),

    expectNaoUltimos12meses: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 12 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela precisa transferir para o ATH;'
    }),

    expectNaoUltimos12mesesAlt: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 12 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela precisa transferir para o ATH;'
    }),

    faturaUltimos6meses: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 6 meses',
        pathCases: ['Não é dos ultimos 6 meses', 'É dos ultimos 6 meses']
    }),

    faturaUltimos6mesesAlt: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 6 meses',
        pathCases: ['Não é dos ultimos 6 meses', 'É dos ultimos 6 meses']
    }),

    expectNaoUltimos6meses: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 6 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela pode transferir para o ATH ou enviar por SMS um link para consultar a fatura;'
    }),

    expectNaoUltimos6mesesAlt: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 6 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela pode transferir para o ATH ou enviar por SMS um link para consultar a fatura;'
    }),

    querContinuarURA: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    querContinuarURAAlt: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    querContinuarURA2: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    emailValido: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),

    expectEmailInvalido: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectEmailInvalidoAlt: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectComoPrefere: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    expectComoPrefereAlt: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    escolhaRealizada: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    escolhaRealizadaAlt: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    verificaProprioAparelhoSMS: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoSMSAlt: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoSMSAlt2: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmail: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmailAlt: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasa: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasaAlt: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    servicoFaturaSMS1: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaSMS1Alt: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaEmail1: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaEmail1Alt: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaCasa1: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    servicoFaturaCasa1Alt: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    existemFaturasAbertoSMS: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    expectFalhaEmail: pagarConta.newNode('node', {
        name: 'Mensagem erro no serviço Email',
        expectedMessage: 'A URA Cognitiva informa que não poderá continuar com a solicitação por um erro no sistema;'
    }),

    expectFalhaCasa: pagarConta.newNode('node', {
        name: 'Mensagem erro no serviço Correios',
        expectedMessage: 'A URA Cognitiva informa que não poderá continuar com a solicitação por um erro no sistema;'
    }),

    existemFaturasAbertoEmail: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    existemFaturasAbertoCasa: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    clienteContaDigital: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'Se o cliente não for conta digital, URA pergunta "te ajudo em algo mais?" direto. Caso seja conta digital, a URA relembra que o cliente recebe as faturas por e-mail e só depois pergunta "te ajudo em algo mais?"'
    }),

    expectTratNaoRecebimento: pagarConta.newNode('node', {
        name: 'tratamento veio de NaoRecebimento',
        expectedMessage: 'Caso tenha vindo de #desambiguadorNaoRecebimentoFatura, a URA deverá informar que o cliente é conta digital e recebe as faturas por e-mail;'
    }),

    expectFaturasEmAbertoSMS: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    expectFaturasEmAbertoEmail: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    expectFaturasEmAbertoCasa: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    querReceberFatEmAbertoSMS: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    querReceberFatEmAbertoEmail: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    querReceberFatEmAbertoCasa: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    enviaFaturasEmAbertoSMS: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por SMS',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por SMS;'
    }),

    enviaFaturasEmAbertoEmail: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por Email',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por Email;'
    }),

    enviaFaturasEmAbertoCasa: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por Correio',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por Correios;'
    }),

    expectOutroAparelhoSMS: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoSMSAlt: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoSMSAlt2: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoEmail: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoEmailAlt: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoCasa: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoCasaAlt: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    fluxoSenha2: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMS: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMSAlt: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMSAlt2: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaEmail: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),
    
    fluxoSenhaEmailAlt: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaCasa: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaCasaAlt: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    expectEscolheCasa: pagarConta.newNode('node', {
        name: 'mensagem perguntando se pode enviar por email para evitar correio',
        expectedMessage: 'A URA Cognitiva pergunta se pode enviar por correios;'
    }),

    expectEscolheCasaAlt: pagarConta.newNode('node', {
        name: 'mensagem perguntando se pode enviar por email para evitar correio',
        expectedMessage: 'A URA Cognitiva pergunta se pode enviar por correios;'
    }),

    confirmaCasa: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Aceita receber por e-mail', 'Insiste receber em casa']
    }),

    confirmaCasaAlt: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Aceita receber por e-mail', 'Insiste receber em casa']
    }),

    expectSegundaChance: pagarConta.newNode('node', {
        name: 'ura da segunda chance',
        expectedMessage: 'A URA Cognitiva pede para cliente repetir como prefere o envio da fatura;'
    }),

    ofereceSegundaChance: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: [
            'Escolhe receber SMS (Segunda tentativa)', 
            'Escolhe receber Email (Segunda tentativa)',
            'Escolhe receber em Casa (Segunda tentativa)',
            'Escolha inválida (Segunda tentativa)'
        ]
    }),

    semMesFaturaAberto: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['* Não possui fatura em aberto', '* Possui fatura em aberto']
    }),

    expectSemMesNaoPossuiFatura: pagarConta.newNode('node', {
        name: 'informa que nao tem faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que não o cliente não possui faturas em aberto e pergunta se precisa de uma segunda via;'
    }),

    precisaSegundaVia: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Não precisa de segunda via', 'Precisa de segunda via']
    }),

    expectPrecisaSegundaVia: pagarConta.newNode('node', {
        name: 'quer segunda via mesmo nao tendo conta aberta',
        expectedMessage: 'A URA Cognitiva pergunta a segunda via de qual mês o cliente precisa;'
    }),

    qualMesSegundaVia: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Mês válido', 'Mês inválido']
    }),

    expectMesInvalido: pagarConta.newNode('node', {
        name: 'quer segunda via mesmo nao tendo conta aberta',
        expectedMessage: 'A URA Cognitiva informa que não entendeu o mês e pede para o cliente repetir;'
    }),

    segundaTentativaMes: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Mês válido (segunda tentativa)', 'Mês inválido (segunda tentativa)']
    }),

    emailValido2: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),

    expectEmailInvalido2: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectComoPrefere2: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    escolhaRealizada2: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    verificaProprioAparelhoSMS2: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmail2: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasa2: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    servicoFaturaSMS12: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaEmail12: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaCasa12: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    faturaUltimos12mesesAlt: pagarConta.newNode('switch', {
        name: 'fatura dos ultimos 12 meses?',
        pathCases: ['Fatura dos ultimos 12 meses', 'Fatura não é dos ultimos 12 meses']
    }),

    faturaUltimos6meses2: pagarConta.newNode('switch', {
        name: 'fatura dos ultimos 6 meses?',
        pathCases: ['Fatura dos ultimos 6 meses', 'Fatura não é dos ultimos 6 meses']
    }),

    verificaProprioAparelho2: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    enviaLinkSite: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Sucesso no envio do Link', '* Falha no envio do Link']
    }),

    macete: pagarConta.newNode('switch', {
        name: 'macetinho',
        pathCases: ['primeiro', 'segundo']
    }),

    emailValidoAlt: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),

    //-----------erro billing----------------//

    startPagarContaERRO: pagarConta.newNode('starting', {
        name: 'Inicia fluxo de pagarConta',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    impedidoERRO: pagarConta.newNode('node', {
        name: 'Impedido de prosseguir por motivos externos',
        stepMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).',
        expectedMessage: 'FLUXO IMPEDIDO DE PROSSEGUIR POR MOTIVOS EXTERNOS (FALTA INFORMAÇÃO/CONTINUAÇÃO NÃO IMPLEMENTADA/SOB REVISÃO, POR EXEMPLO).'
    }).turnTargetNode(),

    saudacaoURAERRO: pagarConta.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATHERRO: pagarConta.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA informa que vai tranferir para o ATH.'

    }).turnTargetNode(),

    encaminhaFluxoContratarPacotesERRO: pagarConta.newNode('node', {
        name: "URA encaminha para o fluxo de contratação de pacotes",
        stepMessage: "Encaminha para o Fluxo de Contratação de Pacotes.",
        expectedMessage: 'URA entra no fluxo de contratação de pacotes.'

    }).turnTargetNode(),

    encerraLigacaoERRO: pagarConta.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcessoERRO: pagarConta.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de um dos desambiguadoresERRO: PagarConta, SegundaVia, CodigoDeBarras, NaoRecebimentoFatura',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se ele tem interesse no processo de Religa;'
    }),

    verificaProprioAparelhoERRO: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaSenhaUnicaERRO: pagarConta.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['* Sucesso fluxo de senha', '* Falha fluxo de senha']
    }),

    perguntaQuerAlgoMaisERRO: pagarConta.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: [/* 'Quer algo mais',  */'Não quer mais nada']
    }),

    desambiguadorERRO: pagarConta.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesligaERRO: pagarConta.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),
    

    bttERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é BTT',
        pathCases: ['* Cliente BTT', '* Cliente não é BTT']
    }),

    dizBloqFinanceiroERRO: pagarConta.newNode('node', {
        name: 'Informa que o usuário possui bloqueio financeiro',
        expectedMessage: 'A URA Cognitiva informa que o usuário possui bloqueio financeiro por falta de pagamento;'
    }),

    mais1FaturaERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é possui 1 ou mais faturas em aberto',
        pathCases: ['* 1 Fatura em Aberto', '* Mais de 1 Fatura em Aberto']
    }),

    mais1FaturaNaoERRO: pagarConta.newNode('node', {
        name: 'Nao tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva informa que enviou a fatura que estava em aberto;'
    }),

    mais1FaturaSimERRO: pagarConta.newNode('node', {
        name: 'Tem mais de uma fatura em aberto',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas que estavam em aberto;'
    }),

    mainClienteTitularERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    mainClienteTitularMais1ERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (mais de 1 fatura)',
        pathCases: ['* Não é titular', '* É titular']
    }),

    servicoCodigoBarras7ERRO: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 7',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras']
    }),

    servicoCodigoBarras1ERRO: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS 1',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    servicoCodigoBarras1Mais1ERRO: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (mais 1 fatura)',
        pathCases: ['* Sucesso no envio SMS', '* Falha Serviço Cód.Barras/Fatura']
    }),

    enviaFaturasSMSERRO: pagarConta.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    enviaFaturasSMSMais1ERRO: pagarConta.newNode('node', {
        name: 'Informa que as faturas foram enviadas por SMS',
        expectedMessage: 'A URA Cognitiva informa que as faturas foram enviadas por SMS;'
    }),

    servicoLinkNegocia2ERRO: pagarConta.newNode('switch', {
        name: 'Chama o servico de Codigo Barras SMS (link negocia)',
        pathCases: ['Link Negocia enviado', '* Falha SMS (Link Negocia)']
    }),
    
    enviaLinkNegociaERRO: pagarConta.newNode('node', {
        name: 'Informa que enviou o link negocia',
        expectedMessage: 'A URA Cognitiva informa que enviou o link do Negocia pelo SMS;'
    }),

    podeAcessarFaturasNoSiteERRO: pagarConta.newNode('node', {
        name: 'Informa que usuário pode acessar faturas no site',
        expectedMessage: 'A URA Cognitiva informa que o usuário pode acessar, negociar e fazer o pagamento das faturas pelo site;'
    }),

    btoERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é BTO',
        pathCases: ['* Cliente é BTO', '* Cliente não é BTO']
    }),

    elegivelReligaERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é Elegivel ao Religa',
        pathCases: ['* Elegível ao Religa', '* Não elegível ao Religa']
    }),

    btoClienteTitularERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não é titular', '* É titular']
    }),

    veioFluxoInformaContaPagaERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular',
        pathCases: ['* Não veio de "Informa Conta Paga"', '* Veio de "Informa Conta Paga"']
    }),

    naoInformouContaPagaERRO: pagarConta.newNode('node', {
        name: 'Informa que usuario está com a linha bloq., que pode solicitar o desbloq. mas que precisa pagar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está com a linha bloqueada e que pode solicitar o desbloqueio, mas lembra ao usuário que precisa pagar em 24 horas;'
    }),

    ofereceReligaERRO: pagarConta.newNode('node', {
        name: 'Informa que oferece o desbloqueio em confiança (pagarConta)',
        expectedMessage: 'A URA Cognitiva oferece o desbloqueio em confiança (pagarConta) da linha;'
    }),

    respostaOfereceReligaERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente deseja efetuar o pagarConta',
        pathCases: ['Não aceita Religa', 'Aceita Religa']
    }),

    servicoReligaERRO: pagarConta.newNode('switch', {
        name: 'Chama o serviço Religa',
        pathCases: ['* Sucesso no Religa', '* Falha no Religa']
    }),

    respNaoETitularERRO: pagarConta.newNode('node', {
        name: 'Fala da URA quando cliente é BTO mas nao é titular)',
        expectedMessage: 'A URA Cognitiva informa que a linha está bloqueada porque não identificou o pagamento. Informa como funciona o desbloqueio em confiança e também informa que para solicitar o desbloqueio, precisa ser o titular.;'
    }),

    motivoBloqERRO: pagarConta.newNode('switch', {
        name: 'Motivo do bloqueio',
        pathCases: ['* Motivo: Quebra de confiança', '* Motivo: Já solicitou nas últimas 24h']
    }),

    motivoBloqQuebraERRO: pagarConta.newNode('node', {
        name: 'URA Explica o motivo do bloqueio QUEBRA DE CONFIANÇA',
        expectedMessage: 'A URA Cognitiva explica que o motivo do bloqueio é QUEBRA DE CONFIANÇA;'
    }),

    motivoBloq24hERRO: pagarConta.newNode('node', {
        name: 'URA Explica o motivo do bloqueio SOLICITADO NAS ULTIMAS 24H',
        expectedMessage: 'A URA Cognitiva explica que já foi feito um pedido de desbloqueio em confiança nas ultimas 24h  e que está em andamento;'
    }),

    quebraTitularERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    servicoLinkNegocia6ERRO: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio Link Negocia',
        pathCases: ['* Sucesso SMS (Link Negocia)', '* Falha SMS (Link Negocia)']
    }),

    SucessoLinkNegocia6ERRO: pagarConta.newNode('node', {
        name: 'URA informa o sucesso do serviço LINK NEGOCIA 6',
        expectedMessage: 'A URA Cognitiva informa que enviou o Link Negocia e pergunta se o usuário deseja o envio da fatura que gerou o bloqueio;'
    }),

    querFaturaBloqERRO: pagarConta.newNode('switch', {
        name: 'Pergunta se o usuário quer fatura que gerou o bloqueio',
        pathCases: ['* Não quer fatura do bloqueio', '* Quer fatura do bloqueio']
    }),

    servicoCodigoBarras5ERRO: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio SMS 5',
        pathCases: ['* Sucesso Serviço Cód.Barras/SMS', '* Falha Serviço Cód.Barras/SMS']
    }),

    servicoCodigoBarras52ERRO: pagarConta.newNode('switch', {
        name: 'Chama o serviço de envio SMS 5',
        pathCases: ['* Sucesso Serviço Cód.Barras/SMS', '* Falha Serviço Cód.Barras/SMS']
    }),

    expectFalhaCodBarra5ERRO: pagarConta.newNode('node', {
        name: 'Mensagem de Falha no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que por uma instabilidade no sistema não conseguiu enviar as faturas e que as faturas estão disponiveis no site. Também oferece transferencia para o ATH para concluir o atendimento;'
    }),

    ofereceATHERRO: pagarConta.newNode('switch', {
        name: 'Oferece transferir para o ATH',
        pathCases: ['Aceita ir para ATH', 'Não quer falar com ATH']
    }),

    expectSucessoCodBarras5ERRO: pagarConta.newNode('node', {
        name: 'Mensagem de Sucesso no serviço Codigo Barras 5',
        expectedMessage: 'A URA Cognitiva informa que enviou a(s) fatura(s);'
    }),

    maisDe1FaturaAbertoERRO: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Não possui mais de 1 fatura em aberto', '* Possui mais de 1 fatura em aberto']
    }),

    expectOfereceFatAbertoERRO: pagarConta.newNode('node', {
        name: 'URA oferece enviar as demais faturas em aberto',
        expectedMessage: 'A URA Cognitiva oferece o envio das demais faturas em aberto;'
    }),

    querReceberFatEmAbertoERRO: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['Não quer receber demais faturas', 'Quer receber todas as faturas']
    }),

    enviaDemaisFaturasERRO: pagarConta.newNode('switch', {
        name: 'Verifica se possui mais de uma fatura em aberto',
        pathCases: ['* Falha ao enviar demais faturas', '* Sucesso ao enviar demais faturas']
    }),

    expectEnviaDemaisFaturasERRO: pagarConta.newNode('node', {
        name: 'URA informa que enviou as demais faturas',
        expectedMessage: 'A URA Cognitiva informa que enviou as demais faturas em aberto;'
    }),

    ultimas24hTitularERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['* É titular', '* Não é titular']
    }),

    expectTitular24hERRO: pagarConta.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio;'
    }),

    expectNaoTitular24hERRO: pagarConta.newNode('node', {
        name: 'URA pergunta se o usuário quer receber a segunda via da fatura que gerou este bloqueio',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer receber o codigo de barras da fatura que gerou este bloqueio;'
    }),

    querFaturaBloqNaoTitularERRO: pagarConta.newNode('switch', {
        name: 'Verifica se cliente é titular (BTO - Nao elegivel)',
        pathCases: ['Não quer fatura do bloqueio', 'Quer fatura do bloqueio']
    }),

    falhaLinkNegocia6ERRO: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    falhaLinkNegocia2ERRO: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que ocorreu um erro no sistema e não será possivel prosseguir. Também informa que o cliente pode acessar as faturas pelo site de forma rápida e segura;'
    }),

    expectNaoQuerFaturaERRO: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço link negocia 6',
        expectedMessage: 'A URA Cognitiva informa que no site Negocia é possivel visualizar todas as faturas abertas e pergunta se mesmo assim gostaria que enviasse a fatura que gerou o bloqueio;'
    }),

    falhaServicoReligaERRO: pagarConta.newNode('node', {
        name: 'Mensagem de falha no serviço pagarConta',
        expectedMessage: 'A URA Cognitiva informa que não foi possivel concluir a solicitação por instabilidade nos sistemas;'
    }),

    expectPerguntaDificuldadeERRO: pagarConta.newNode('node', {
        name: 'Mensagem perguntando se ter dificuldade na internet',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário está com dificuldade para usar os serviços;'
    }),

    possuiDificuldadeERRO: pagarConta.newNode('switch', {
        name: 'Possui dificuldade de usar os serviços?',
        pathCases: ['Sem dificuldades', 'Está enfrentando dificuldade']
    }),

    expectPerguntaQualDificuldadeERRO: pagarConta.newNode('node', {
        name: 'Mensagem perguntando em qual serviço está com dificuldade',
        expectedMessage: 'A URA Cognitiva pergunta em qual serviço o usuário está com dificuldades/problemas;'
    }),

    qualDificuldadeERRO: pagarConta.newNode('switch', {
        name: 'Dificuldade em qual serviço?',
        pathCases: ['Problema na Internet', 'Problema nas ligações']
    }),

    servicoConsultaDadosERRO: pagarConta.newNode('switch', {
        name: 'Serviço Consulta Dados?',
        pathCases: ['* Sucesso na Consulta de Dados', '* Falha na Consulta de Dados']
    }),

    internetReduzidaERRO: pagarConta.newNode('switch', {
        name: 'Possui internet reduzida?',
        pathCases: ['* Navegação Reduzida', '* Navegação Normal']
    }),

    billingProfileERRO: pagarConta.newNode('switch', {
        name: 'Serviço Billing Profile',
        pathCases: ['* Sucesso no billing', '* Falha no billing']
    }),

    expectVelocidadeReduzidaERRO: pagarConta.newNode('node', {
        name: 'Mensagem informando velocidade reduzida',
        expectedMessage: 'A URA Cognitiva informa que a velocidade está reduzida e a data de renovação;'
    }),

    querSaberDosPacotesERRO: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário quer saber mais sobre os pacotes de dados adicionais',
        pathCases: ['Quer pacote adicional', 'Não quer pacote adicional']
    }),

    expectNavegacaoNormalERRO: pagarConta.newNode('node', {
        name: 'Mensagem informando internet normal',
        expectedMessage: 'A URA Cognitiva informa que o usuário ainda possui internet para navegar normalmente;'
    }),

    continuarOuATHERRO: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário quer continuar o atendimento na URA ou no ATH',
        pathCases: ['Quer falar com ATH', 'Quer continuar na URA']
    }),
    
    jaReiniciouERRO: pagarConta.newNode('switch', {
        name: 'URA pergunta se usuário já tentou reiniciou o aparelho',
        pathCases: ['Já reiniciou', 'Não reiniciou']
    }),

    enviaGuiaApararelhoERRO: pagarConta.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['* Sucesso no Envio do Guia', '* Falha no Envio do Guia']
    }),

    expectSucessoEnvioGuiaERRO: pagarConta.newNode('node', {
        name: 'Mensagem informando que enviou o Guia de Aparelho',
        expectedMessage: 'A URA Cognitiva informa que enviou o guia do aparelho por SMS para ajudar a configurar;'
    }),

    expectFalhaEnvioGuiaERRO: pagarConta.newNode('node', {
        name: 'Mensagem informando que o guia do aparelho está disponivel no site',
        expectedMessage: 'A URA Cognitiva informa que o guia do aparelho está disponível no site para ajudar a configurar;'
    }),

    insisteReinicioERRO: pagarConta.newNode('switch', {
        name: 'Serviço Envio Guia Aparelho',
        pathCases: ['Aceita Reiniciar', 'Não quer reiniciar']
    }),

    expectContinuarOuATHERRO: pagarConta.newNode('node', {
        name: 'URA pergunta se quer continuar ou ir ATH',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer continuar o atendimento ou falar com o ATH;'
    }),

    expectQuerSaberDosPacotesERRO: pagarConta.newNode('node', {
        name: 'URA pergunta se quer saber dos pacotes adicionais',
        expectedMessage: 'A URA Cognitiva pergunta se o usuário quer saber mais sobre os pacotes adicionais;'
    }),

    expectInsisteReinicioERRO: pagarConta.newNode('node', {
        name: 'URA insiste e pergunta se usuario nao gostaria de tentar reiniciar',
        expectedMessage: 'A URA Cognitiva pergunta se usuário não gostaria de tentar reiniciar o aparelho;'
    }),

    veioDeNaoRecebimentoFaturaERRO: pagarConta.newNode('node', {
        name: 'veio de desambiguador naoRecebimentoFatura',
        expectedMessage: 'Caso tenha vindo de #desambiguadorNaoRecebimentoDeFatura a URA Cognitiva informa que entendeu que o cliente está com problemas no recebimento da fatura e sugere que confira se o cadastro está correto no APP;'
    }),

    expectNaoRecebimentoFaturaERRO: pagarConta.newNode('node', {
        name: 'URA informa que entendeu que está com problemas fatura',
        expectedMessage: 'A URA Cognitiva informa que entendeu que o cliente está com problemas relacionados ao recebimento da fatura;'
    }),

    contaDigitalERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['* É conta digital', '* Não é conta digital']
    }),

    expectContaDigitalERRO: pagarConta.newNode('node', {
        name: 'resposta caso seja conta digital',
        expectedMessage: 'A URA Cognitiva informa que como o cliente possui conta digital, recebe as faturas apenas por e-mail e que as também ficam disponíveis no App;'
    }),

    expectNaoContaDigitalERRO: pagarConta.newNode('node', {
        name: 'resposta caso não seja conta digital',
        expectedMessage: 'A URA Cognitiva sugere que o cliente verifique se o endereço cadastrado no app está correto;'
    }),

    faturaEmAbertoERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['* Possui fatura em aberto', '* Não possui fatura em aberto']
    }),

    intencaoCodigoBarrasERRO: pagarConta.newNode('switch', {
        name: 'Verifica se é conta digital',
        pathCases: ['VEIO DE DESAMBIGUADOR CODIGOBARRAS', 'Não veio de desambiguadorCodigoBarras']
    }),

    aceitaCodBarrasERRO: pagarConta.newNode('switch', {
        name: 'Aceita receber código de barras via SMS?',
        pathCases: ['Aceita receber Código de Barras', 'Não aceita receber Código de Barras']
    }),

    expectNaoAceitaCodBarraERRO: pagarConta.newNode('node', {
        name: 'resposta caso não aceite código de barras',
        expectedMessage: 'A URA Cognitiva informa que apenas o titular do plano pode receber a segunda via e que caso precise da segunda vida, pedir para o titular entrar em contato;'
    }),

    clienteInsisteERRO: pagarConta.newNode('switch', {
        name: 'cliente insiste em codBarras',
        pathCases: ['Quer algo mais: #desambiguadorCodigoBarras ou SegundaVia ou Pagar Conta ou NaoRecebimentoFatura', 'Não quer mais nada']
    }),

    insisteFaturasAbertoERRO: pagarConta.newNode('switch', {
        name: 'verifica na insistencia se possui faturas em aberto',
        pathCases: ['* (insistencia) Não possui faturas em aberto', '* (insistencia) Possui faturas em aberto']
    }),

    insisteFaturasAbertoNaoERRO: pagarConta.newNode('node', {
        name: 'resposta caso não exista faturas em aberto insistencia',
        expectedMessage: 'A URA Cognitiva informa que apenas o titular do plano pode receber a segunda via e que caso precise da segunda vida, pedir para o titular entrar em contato;'
    }),

    insisteFaturasAbertoSimERRO: pagarConta.newNode('node', {
        name: 'resposta caso exista faturas em aberto insistencia',
        expectedMessage: 'A URA Cognitiva informa que como o cliente não é o titular, não é possível enviar a segunda vida da fatura, mas que já enviou o código de barras;'
    }),

    expectNaoPossuiFaturaAbertoERRO: pagarConta.newNode('node', {
        name: 'cliente nao possui faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que o cliente não possui faturas em aberto e que apenas o titular do plano pode solicitar uma segunda via.;'
    }),

    pediuAlgumMesERRO: pagarConta.newNode('switch', {
        name: 'verifica se pediu algum mes especifico',
        pathCases: ['Fatura de um mês espefícico', 'Não pediu mês específico']
    }),

    mesPossuiFaturaAbertoERRO: pagarConta.newNode('switch', {
        name: 'verifica se o mes pedido está entre as faturas em aberto',
        pathCases: ['Mês está nas faturas em aberto', 'Mês não está nas faturas em aberto']
    }),

    faturaUltimos12mesesERRO: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 12 meses',
        pathCases: ['Não é dos últimos 12 meses', 'É dos últimos 12 meses']
    }),

    expectNaoUltimos12mesesERRO: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 12 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela precisa transferir para o ATH;'
    }),

    expectNaoUltimos12mesesAltERRO: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 12 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela precisa transferir para o ATH;'
    }),

    faturaUltimos6mesesERRO: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 6 meses',
        pathCases: ['Não é dos ultimos 6 meses', 'É dos ultimos 6 meses']
    }),

    faturaUltimos6mesesAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se a fatura é dos ultimos 6 meses',
        pathCases: ['Não é dos ultimos 6 meses', 'É dos ultimos 6 meses']
    }),

    expectNaoUltimos6mesesERRO: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 6 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela pode transferir para o ATH ou enviar por SMS um link para consultar a fatura;'
    }),

    expectNaoUltimos6mesesAltERRO: pagarConta.newNode('node', {
        name: 'Mensagem fatura nao é dos ultimos 6 meses',
        expectedMessage: 'A URA Cognitiva informa que para receber faturas mais antigas ela pode transferir para o ATH ou enviar por SMS um link para consultar a fatura;'
    }),

    querContinuarURAERRO: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    querContinuarURAAltERRO: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    querContinuarURA2ERRO: pagarConta.newNode('switch', {
        name: 'pergunta se quer ir para o ATH ou continuar',
        pathCases: ['Quer continuar com o ATH', 'Quer continuar com a URA']
    }),

    emailValidoERRO: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),

    expectEmailInvalidoERRO: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectEmailInvalidoAltERRO: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectComoPrefereERRO: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    expectComoPrefereAltERRO: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    escolhaRealizadaERRO: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    escolhaRealizadaAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    verificaProprioAparelhoSMSERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoSMSAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoSMSAlt2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmailERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmailAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasaERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasaAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    servicoFaturaSMS1ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaSMS1AltERRO: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaEmail1ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaEmail1AltERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaCasa1ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    servicoFaturaCasa1AltERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    existemFaturasAbertoSMSERRO: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    expectFalhaEmailERRO: pagarConta.newNode('node', {
        name: 'Mensagem erro no serviço Email',
        expectedMessage: 'A URA Cognitiva informa que não poderá continuar com a solicitação por um erro no sistema;'
    }),

    expectFalhaCasaERRO: pagarConta.newNode('node', {
        name: 'Mensagem erro no serviço Correios',
        expectedMessage: 'A URA Cognitiva informa que não poderá continuar com a solicitação por um erro no sistema;'
    }),

    existemFaturasAbertoEmailERRO: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    existemFaturasAbertoCasaERRO: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'A URA Cognitiva verifica se existem faturas em aberto. Caso existam, oferece o envio das mesmas e envia pelo mesmo método escolhido anteriormente. Caso não existam, prossegue no fluxo;'
    }),

    clienteContaDigitalERRO: pagarConta.newNode('node', {
        name: 'verifica se existem mais faturas em aberto',
        expectedMessage: 'Se o cliente não for conta digital, URA pergunta "te ajudo em algo mais?" direto. Caso seja conta digital, a URA relembra que o cliente recebe as faturas por e-mail e só depois pergunta "te ajudo em algo mais?"'
    }),

    expectTratNaoRecebimentoERRO: pagarConta.newNode('node', {
        name: 'tratamento veio de NaoRecebimento',
        expectedMessage: 'Caso tenha vindo de #desambiguadorNaoRecebimentoFatura, a URA deverá informar que o cliente é conta digital e recebe as faturas por e-mail;'
    }),

    expectFaturasEmAbertoSMSERRO: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    expectFaturasEmAbertoEmailERRO: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    expectFaturasEmAbertoCasaERRO: pagarConta.newNode('node', {
        name: 'Mensagem caso exista faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que existem faturas em aberto e pergunta se o cliente também quer recebê-las;'
    }),

    querReceberFatEmAbertoSMSERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    querReceberFatEmAbertoEmailERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    querReceberFatEmAbertoCasaERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Não quer receber faturas em aberto', 'Quer receber faturas em aberto']
    }),

    enviaFaturasEmAbertoSMSERRO: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por SMS',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por SMS;'
    }),

    enviaFaturasEmAbertoEmailERRO: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por Email',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por Email;'
    }),

    enviaFaturasEmAbertoCasaERRO: pagarConta.newNode('node', {
        name: 'URA informa que enviou as faturas por Correio',
        expectedMessage: 'A URA Cognitiva informa que enviou as faturas em aberto por Correios;'
    }),

    expectOutroAparelhoSMSERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoSMSAltERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoSMSAlt2ERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoEmailERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoEmailAltERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoCasaERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    expectOutroAparelhoCasaAltERRO: pagarConta.newNode('node', {
        name: 'mensagem informando que está ligando de outro aparelho',
        expectedMessage: 'A URA Cognitiva informa que por estar ligando de outro aparelho, precisa da senha única e invoca o Fluxo de Senha;'
    }),

    fluxoSenha2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMSERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMSAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaSMSAlt2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaEmailERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),
    
    fluxoSenhaEmailAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaCasaERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    fluxoSenhaCasaAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['* Senha Incorreta', '* Sucesso no Fluxo de Senha']
    }),

    expectEscolheCasaERRO: pagarConta.newNode('node', {
        name: 'mensagem perguntando se pode enviar por email para evitar correio',
        expectedMessage: 'A URA Cognitiva pergunta se pode enviar por correios;'
    }),

    expectEscolheCasaAltERRO: pagarConta.newNode('node', {
        name: 'mensagem perguntando se pode enviar por email para evitar correio',
        expectedMessage: 'A URA Cognitiva pergunta se pode enviar por correios;'
    }),

    confirmaCasaERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Aceita receber por e-mail', 'Insiste receber em casa']
    }),

    confirmaCasaAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: ['Aceita receber por e-mail', 'Insiste receber em casa']
    }),

    expectSegundaChanceERRO: pagarConta.newNode('node', {
        name: 'ura da segunda chance',
        expectedMessage: 'A URA Cognitiva pede para cliente repetir como prefere o envio da fatura;'
    }),

    ofereceSegundaChanceERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto',
        pathCases: [
            'Escolhe receber SMS (Segunda tentativa)', 
            'Escolhe receber Email (Segunda tentativa)',
            'Escolhe receber em Casa (Segunda tentativa)',
            'Escolha inválida (Segunda tentativa)'
        ]
    }),

    semMesFaturaAbertoERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['* Não possui fatura em aberto', '* Possui fatura em aberto']
    }),

    expectSemMesNaoPossuiFaturaERRO: pagarConta.newNode('node', {
        name: 'informa que nao tem faturas em aberto',
        expectedMessage: 'A URA Cognitiva informa que não o cliente não possui faturas em aberto e pergunta se precisa de uma segunda via;'
    }),

    precisaSegundaViaERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Não precisa de segunda via', 'Precisa de segunda via']
    }),

    expectPrecisaSegundaViaERRO: pagarConta.newNode('node', {
        name: 'quer segunda via mesmo nao tendo conta aberta',
        expectedMessage: 'A URA Cognitiva pergunta a segunda via de qual mês o cliente precisa;'
    }),

    qualMesSegundaViaERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Mês válido', 'Mês inválido']
    }),

    expectMesInvalidoERRO: pagarConta.newNode('node', {
        name: 'quer segunda via mesmo nao tendo conta aberta',
        expectedMessage: 'A URA Cognitiva informa que não entendeu o mês e pede para o cliente repetir;'
    }),

    segundaTentativaMesERRO: pagarConta.newNode('switch', {
        name: 'verifica se existem mais faturas em aberto se nao pediu mes especifico',
        pathCases: ['Mês válido (segunda tentativa)', 'Mês inválido (segunda tentativa)']
    }),

    emailValido2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),

    expectEmailInvalido2ERRO: pagarConta.newNode('node', {
        name: 'mensagem email do cliente inválido',
        expectedMessage: 'A URA Cognitiva pede para aguardar e se prepara para enviar por SMS;'
    }),

    expectComoPrefere2ERRO: pagarConta.newNode('node', {
        name: 'URA pergunta como o cliente quer receber segunda via',
        expectedMessage: 'A URA Cognitiva pergunta como o cliente quer receber a segunda via (SMS, Email ou Correios);'
    }),

    escolhaRealizada2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se a escolha do cliente é válida ou invalida',
        pathCases: [
            'Quer receber por SMS',
            'Quer receber por Email',
            'Quer receber em Casa',
            'Escolha inválida'
        ]
    }),

    verificaProprioAparelhoSMS2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (SMS)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoEmail2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (EMAIL)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    verificaProprioAparelhoCasa2ERRO: pagarConta.newNode('switch', {
        name: 'verifica se o cliente está ligando do próprio aparelho ou não (CASA)',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    servicoFaturaSMS12ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio SMS',
        pathCases: ['* Falha no serviço SMS', '* Sucesso no serviço SMS']
    }),

    servicoFaturaEmail12ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Email',
        pathCases: ['* Falha no serviço Email', '* Sucesso no serviço Email']
    }),

    servicoFaturaCasa12ERRO: pagarConta.newNode('switch', {
        name: 'serviço envio Casa',
        pathCases: ['* Falha no serviço Correios', '* Sucesso no serviço Correios']
    }),

    faturaUltimos12mesesAltERRO: pagarConta.newNode('switch', {
        name: 'fatura dos ultimos 12 meses?',
        pathCases: ['Fatura dos ultimos 12 meses', 'Fatura não é dos ultimos 12 meses']
    }),

    faturaUltimos6meses2ERRO: pagarConta.newNode('switch', {
        name: 'fatura dos ultimos 6 meses?',
        pathCases: ['Fatura dos ultimos 6 meses', 'Fatura não é dos ultimos 6 meses']
    }),

    verificaProprioAparelho2ERRO: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Ligando do próprio aparelho', '* Ligando de outro aparelho']
    }),

    enviaLinkSiteERRO: pagarConta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['* Sucesso no envio do Link', '* Falha no envio do Link']
    }),

    maceteERRO: pagarConta.newNode('switch', {
        name: 'macetinho',
        pathCases: ['primeiro', 'segundo']
    }),

    emailValidoAltERRO: pagarConta.newNode('switch', {
        name: 'verifica se o email do cliente é válido',
        pathCases: ['* Email inválido', '* Email válido']
    }),



};

console.log(JSON.stringify(Object.keys(nodes), null, 1))
console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;