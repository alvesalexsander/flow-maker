const contratacaoPacoteDados = require('./map');

const nodes = {
    startContratacaoPacoteDados: contratacaoPacoteDados.newNode('starting', {
        name: 'Inicia fluxo de contratacaoPacoteDados',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva que ao passar pelo acolhimento, cliente tem intenção de contratar pacote de dados;'
    }),

    saudacaoURA: contratacaoPacoteDados.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: contratacaoPacoteDados.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: contratacaoPacoteDados.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: contratacaoPacoteDados.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de #desambiguadorContratacaoPacoteDados',
        expectedMessage: 'A URA Congnitiva informa que entendeu que deseja falar sobre Troca de Titularidade;'
    }),

    perguntaQuerAlgoMais: contratacaoPacoteDados.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: contratacaoPacoteDados.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: contratacaoPacoteDados.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),
    
//-----------------------------------------------------INICIO PRÉ-TOP---------------------------------


    verificaPreTop: contratacaoPacoteDados.newNode('switch', {
        name: 'Client é pré-top?',
        pathCases: ['É cliente Pré TOP', 'Não é Pré TOP']
    }),

    verificaBeneficiosValidos: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se os beneficios ainda são válidos',
        pathCases: ['Benefícios válidos', 'Benefícios expirados']
    }),

    respostaBeneficiosExpirados: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que o cliente está na promoção Pré TOP mas que a validade dos benefícios expirou.',
        expectedMessage: 'URA informa que o cliente está na promoção Pré TOP mas que a validade dos benefícios expirou. Também informa que para voltar a utilizar os benefícios basta fazer uma recarga e oferece a recarga;'
    }),

    verificaExpiradoQuerRecarga: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o usuário quer fazer recarga para voltar a utilizar beneficios Pré TOP',
        pathCases: ['Quer fazer recarga', 'Não quer recarga']
    }),

    verificaPreTOPConsumiuTodoPacote: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o usuário consumiu 100% do pacote',
        pathCases: ['Consumiu 100%', 'Não consumiu 100%']
    }),

    verificaPossuiBonus: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente possui bônus',
        pathCases: ['Possui bônus', 'Não possui bônus']
    }),

    respostaPossuiBonusSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que o cliente está na promoção Pré TOP, a validade e a quantidade de dados disponiveis.',
        expectedMessage: 'URA informa que o cliente está na promoção Pré TOP, a validade e a quantidade de dados disponiveis;'
    }),

    respostaPossuiBonusNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que o cliente está na promoção Pré TOP, a validade e a quantidade de dados disponiveis, assim como a quantidade de bônus.',
        expectedMessage: 'URA informa que o cliente está na promoção Pré TOP mas que a validade dos benefícios expirou. Também informa que para voltar a utilizar os benefícios basta fazer uma recarga e oferece a recarga, assim como a quantidade de bônus;'
    }),

    verificaPossuiSaldoRecarga: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente possui saldo para efetuar recarga',
        pathCases: ['Possui saldo em conta', 'Não possui saldo em conta']
    }),

    respostaPossuiSaldoRecargaSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que o cliente está na promoção Pré TOP e a validade e pergunta se quer renovar os beneficios da promoção agora.',
        expectedMessage: 'URA informa que o cliente está na promoção Pré TOP e a validade e pergunta se quer renovar os beneficios da promoção agora;'
    }),

    verificaRenovar: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente quer fazer uma recarga para renovar os benefícios',
        pathCases: ['Quer renovar', 'Não quer renovar']
    }),

    encaminhaFluxoRenovacao: contratacaoPacoteDados.newNode('node', {
        name: 'URA encaminha para o fluxo de Renovação.',
        expectedMessage: 'URA encaminha para o fluxo de Renovação;'
    }).turnTargetNode(),

    respostaPossuiSaldoRecargaNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que o cliente está na promoção Pré TOP e a validade e pergunta se quer fazer uma recarga para renovar os benefícios.',
        expectedMessage: 'URA informa que o cliente está na promoção Pré TOP mas que a validade dos benefícios expirou. Também informa que para voltar a utilizar os benefícios basta fazer uma recarga e oferece a recarga, assim como a quantidade de bônus;'
    }),

    verificaQuerRecargaRenovar: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente quer fazer uma recarga para renovar os benefícios',
        pathCases: ['Quer fazer recarga', 'Não quer fazer recarga']
    }),

    encaminhaFluxoRecarga: contratacaoPacoteDados.newNode('node', {
        name: 'URA encaminha para o fluxo de Recarga.',
        expectedMessage: 'URA encaminha para o fluxo de Recarga;'
    }).turnTargetNode(),

//-----------------------------------------------------FIM PRÉ-TOP---------------------------------

    informaVerificarInternet: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que vai verificar a internet.',
        expectedMessage: 'URA informa que vai verificar a internet;'
    }),

    verificaJaContratouPacote: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente já contratou pacote nesta ligação',
        pathCases: ['Já contratou pacote na ligação', 'Não contratou pacote na ligação']
    }),

    respostaJaContratouPacoteSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que como o usuário ja contratou um pacote, deve consumir 100% antes de contratar um novo pacote.',
        expectedMessage: 'URA informa que como o usuário ja contratou um pacote, deve consumir 100% antes de contratar um novo pacote e orientações sobre como navegar e usar aplicativos;'
    }),

    verificaConsultaQuota: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica o serviço de consulta de dados (quota) retorna ok',
        pathCases: ['Sucesso na Consulta Quota', 'Falha na Consulta Quota']
    }),

    verificaNavegaçãoBloqueada: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica o cliente possui navegação bloqueada',
        pathCases: ['Navegação bloqueada', 'Navegação normal']
    }),

    verificaNavBloqPossuiBonus: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica o cliente possui bonus',
        pathCases: ['Possui bônus', 'Não possui bônus']
    }),

    respostaNavBloqPossuiBonusSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa a quantidade de dados disponíveis e o somatorio de bônus e fornece orientações sobre como navegar e utilizar aplicativos usando dados móveis.',
        expectedMessage: 'URA informa a quantidade de dados disponíveis e o somatorio de bônus e fornece orientações sobre como navegar e utilizar aplicativos usando dados móveis;'
    }),

    respostaNavBloqPossuiBonusNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa a quantidade de dados disponíveis e fornece orientações sobre como navegar e utilizar aplicativos usando dados móveis.',
        expectedMessage: 'URA informa a quantidade de dados disponíveis e fornece orientações sobre como navegar e utilizar aplicativos usando dados móveis;'
    }),

//----------------------------------------------------------PACOTE MINIMO----------------------------------------------

    verificaSaldoParaPacoteMinimo: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente possui saldo para contratar o pacote minimo',
        pathCases: ['Possui saldo (pacote mínimo)', 'Não possui saldo (pacote mínimo)']
    }),

    verificaConsultaPacotesDados: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica o serviço de Pacotes Dados retorna ok',
        pathCases: ['Sucesso Consulta Pacote Dados', 'Falha Consulta Pacote Dados']
    }),

    verificaElegivelSomentePacoteDiario: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se o cliente possui pacotes disponiveis além do diário',
        pathCases: ['Somente pacote diário', 'Pacotes disponíveis']
    }),

    respostaElegivelSomentePacoteDiarioSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA oferece pacote diário.',
        expectedMessage: 'URA oferece pacote diário;'
    }),

    respostaElegivelSomentePacoteDiarioNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA oferece pacotes disponiveis.',
        expectedMessage: 'URA oferece pacotes disponiveis;'
    }),

    acoesEscolherPacoteDiario: contratacaoPacoteDados.newNode('switch', {
        name: 'Ações de escolher pacote',
        pathCases: ['Escolhe pacote diário', 'Não escolher nenhum pacote']
    }),

    acoesEscolherPacoteDisp: contratacaoPacoteDados.newNode('switch', {
        name: 'Ações de escolher pacote',
        pathCases: ['Escolhe pacote das opções', 'Não escolher nenhum pacote']
    }),

    verificarPacoteSaldoMaior: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se algum pacote deixou de ser ofertado em razao do saldo',
        pathCases: ['Existe pacote maior', 'Nenhum outro pacote']
    }),

    respostaPacoteSaldoMaiorSim:  contratacaoPacoteDados.newNode('node', {
        name: 'Existe pacote para saldo maior.',
        expectedMessage: 'URA oferece recarga para contratar um pacote com mais internet;'
    }),

    verificaQuerRecargaPacoteMaior: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se cliente quer fazer recarga para contratar pacote maior',
        pathCases: ['Quer recarga (pacote maior)', 'Não quer recarga (pacote maior)']
    }),

    confirmaContratacao: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se cliente confirma a contratação',
        pathCases: ['Confirma contratação', 'Não confirma contratação']
    }),

    respostaConfirmaContratacaoNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA se oferece para repetir.',
        expectedMessage: 'URA se oferece para repetir as opções;'
    }),

    verificaQuerOuvirNovamente: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se cliente quer ouvir novamente as opções',
        pathCases: ['Quer ouvir novamente e contrata', 'Quer ouvir novamente e não contrata', 'Não quer ouvir novamente']
    }),

    verificaLigandoProprioAparelho: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se cliente está ligando do próprio aparelho',
        pathCases: ['Ligando do próprio aparelho', 'Ligando de outro aparelho']
    }),

    verificaFluxoSenha: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se fluxo de Senha',
        pathCases: ['Sucesso no fluxo de senha', 'Falha no fluxo de senha']
    }),

    respostaFalhaFluxoSenha: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que não vai conseguir prosseguir com a solicitação.',
        expectedMessage: 'URA informa que o cliente já atingiu o limite de tentativas de senha e não vai conseguir prosseguir com a solicitação;'
    }),

    verificaContratacaoDoPacote: contratacaoPacoteDados.newNode('switch', {
        name: 'Verifica se fluxo de Senha',
        pathCases: ['Sucesso na contratação', 'Falha na contratação']
    }),

    respostaContratacaoDoPacoteSim: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa sucesso na contratação.',
        expectedMessage: 'URA informa que o pacote foi contratado com sucesso;'
    }),

    respostaSaldoParaPacoteMinimoNao: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que cliente não possui saldo para contratar um pacote nomento e direciona para o fluxo de recarga.',
        expectedMessage: 'URA informa que cliente não possui saldo para contratar um pacote nomento e direciona para o fluxo de recarga;'
    }),

    respostaContratacaoDoPacoteFalha: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que não foi possível concluir a solicitação por uma instabilidade.',
        expectedMessage: 'URA informa que não foi possível concluir a solicitação por uma instabilidade;'
    }),

    respostaConsultaPacotesDados: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que não foi possível consultar os pacotes de dados disponíveis.',
        expectedMessage: 'URA informa que não foi possível consultar os pacotes de dados disponíveis;'
    }),

    respostaConsultaQuota: contratacaoPacoteDados.newNode('node', {
        name: 'URA informa que não foi possível concluir a solicitação por uma instabilidade.',
        expectedMessage: 'URA informa que cliente não possui saldo para contratar um pacote nomento e direciona para o fluxo de recarga;'
    }),
    

};

// console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;