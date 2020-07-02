const contestacaoSaldoRecarga = require('./map');

const nodes = {
    startContestacaoSaldoRecarga: contestacaoSaldoRecarga.newNode('starting', {
        name: 'Inicia fluxo de contestacaoSaldoRecarga',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    saudacaoURA: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: contestacaoSaldoRecarga.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Vias de acesso',
        pathCases: ['Intenção Consultar Saldo', 'Intenção Contestar Saldo']
    }),

    perguntaQuerAlgoMais: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: contestacaoSaldoRecarga.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    verificaInformacaoSaldoDisponivel: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se as informações de saldo foram recuperadas no profile',
        pathCases: ['Saldo consultado no acolhimento', 'Sem informação de saldo']
    }),
    
    verificaInformacaoSaldoDisponivel2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se as informações de saldo foram recuperadas no profile',
        pathCases: ['Saldo consultado no acolhimento', 'Sem informação de saldo']
    }),

    verificaServicoConsultaSaldoRecarga: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Chama serviço Consulta Saldo Recarga',
        pathCases: ['Sucesso na consulta de saldo', 'Falha na consulta de saldo']
    }),

    verificaServicoConsultaSaldoRecarga2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Chama serviço Consulta Saldo Recarga',
        pathCases: ['Sucesso na consulta de saldo', 'Falha na consulta de saldo']
    }),

    verificaSaldoNaValidade: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente está na validade',
        pathCases: ['Saldo válido', 'Saldo fora da validade']
    }),

    verificaSaldoNaValidade2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente está na validade',
        pathCases: ['Saldo válido', 'Saldo fora da validade']
    }),

    verificaSaldoMaiorQueZeroValido: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente é maior que zero',
        pathCases: ['Saldo > zero', 'Saldo < zero', 'Saldo = zero']
    }),

    verificaSaldoMaiorQueZeroValido2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente é maior que zero',
        pathCases: ['Saldo > zero', 'Saldo < zero', 'Saldo = zero']
    }),

    respostaMaiorQueZeroValidoSim: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo válido',
        expectedMessage: 'URA informa quanto o cliente possui em saldo e sua validade;'
    }),

    respostaMaiorQueZeroValidoSimConsultarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo válido',
        expectedMessage: 'URA informa quanto o cliente possui em saldo e sua validade;'
    }),

    respostaMaiorQueZeroValidoSimContestarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo válido',
        expectedMessage: 'URA informa quanto o cliente possui em saldo e sua validade;'
    }),

    respostaMaiorQueZeroNao: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente não possui saldo',
        expectedMessage: 'URA informa que o cliente não possui saldo de crédito;'
    }),

    respostaMaiorQueZeroNaoConsultarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente não possui saldo',
        expectedMessage: 'URA informa que o cliente não possui saldo de crédito;'
    }),

    respostaMaiorQueZeroNaoContestarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente não possui saldo',
        expectedMessage: 'URA informa que o cliente não possui saldo de crédito;'
    }),

    verificaSaldoMaiorQueZeroInvalido: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente é maior que zero',
        pathCases: ['Saldo > zero (expirado)', 'Saldo < zero (expirado)', 'Saldo = zero (expirado)']
    }),
    
    verificaSaldoMaiorQueZeroInvalido2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o saldo do cliente é maior que zero',
        pathCases: ['Saldo > zero (expirado)', 'Saldo < zero (expirado)', 'Saldo = zero (expirado)']
    }),

    respostaMaiorQueZeroInvalidoSim: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo, mas a validade expirou',
        expectedMessage: 'URA informa que o cliente possui saldo, mas a validade expirou;'
    }),

    respostaMaiorQueZeroInvalidoSimConsultarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo, mas a validade expirou',
        expectedMessage: 'URA informa que o cliente possui saldo, mas a validade expirou;'
    }),
    respostaMaiorQueZeroInvalidoSimContestarSaldo: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que o cliente possui saldo, mas a validade expirou',
        expectedMessage: 'URA informa que o cliente possui saldo, mas a validade expirou;'
    }),

    verificaIntencaoConsultarSaldo: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se a intencao do cliente era consultar saldo',
        pathCases: ['Intenção Consultar Saldo', 'Outra intenção']
    }).noStepMessage(),

    verificaIntencaoConsultarSaldoExlusivo: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se a intencao do cliente era consultar saldo',
        pathCases: ['Intenção Consultar Saldo']
    }).noStepMessage(),

    verificaIntencaoConsultarSaldoExlusivo2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se a intencao do cliente era consultar saldo',
        pathCases: ['Outra intenção']
    }).noStepMessage(),

    perguntaQuerAlgoMaisContestacao: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer contestar saldo', 'Não quer mais nada']
    }),

    verificaIntencaoContestarSaldo: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se a intencao do cliente é contestar saldo',
        pathCases: ['Quer contestar saldo', 'Não quer contestar']
    }).noMessage(),

    verificaClientePreTop: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o cliente é Pré Top',
        pathCases: ['Cliente Pré Top', 'Não é Pré Top']
    }),

    perguntaQuerAlgoMaisContestacao2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    verificaIntencaoContestarSaldo2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se a intencao do cliente é contestar saldo',
        pathCases: ['Quer contestar saldo', 'Não quer contestar']
    }),

    verificaClientePreTop2: contestacaoSaldoRecarga.newNode('switch', {
        name: 'Verifica se o cliente é Pré Top',
        pathCases: ['Cliente Pré Top', 'Não é Pré Top']
    }),

    respostaClientePreTopSim: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que está disponível a promoção exclusiva Pré Top',
        expectedMessage: 'URA informa que está disponível a promoção exclusiva Pré Top e explica em detalhes;'
    }),
    
    respostaClientePreTopSim2: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que está disponível a promoção exclusiva Pré Top',
        expectedMessage: 'URA informa que está disponível a promoção exclusiva Pré Top e explica em detalhes;'
    }),

    respostaClientePreTopNao: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA explica sobre consumo de dados do cliente',
        expectedMessage: 'URA informa que o saldo pode ter sido consumido por serviços e navegação na internet\ne que o cliente pode acompanhar o consumo usando o APP MEU TIM;'
    }),
    
    respostaClientePreTopNao2: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA explica sobre consumo de dados do cliente',
        expectedMessage: 'URA informa que o saldo pode ter sido consumido por serviços e navegação na internet\ne que o cliente pode acompanhar o consumo usando o APP MEU TIM;'
    }),

    respostaServicoConsultaSaldoRecargaFalha: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que não não foi possivel consultar os serviços',
        expectedMessage: 'URA informa que não não foi possivel consultar os serviços por instabilidade nos sistemas\ne que o cliente pode utilizar o APP MEU TIM para mais informações sobre consumo;'
    }),

    respostaServicoConsultaSaldoRecargaFalha2: contestacaoSaldoRecarga.newNode('node', {
        name: 'URA informa que não não foi possivel consultar os serviços',
        expectedMessage: 'URA informa que não não foi possivel consultar os serviços por instabilidade nos sistemas\ne que o cliente pode utilizar o APP MEU TIM para mais informações sobre consumo;'
    }),
};

console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;