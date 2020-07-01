const trocaTitularidade = require('./map');

const nodes = {
    startTrocaTitularidade: trocaTitularidade.newNode('starting', {
        name: 'Inicia fluxo de trocaTitularidade',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    saudacaoURA: trocaTitularidade.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: trocaTitularidade.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: trocaTitularidade.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: trocaTitularidade.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de #desambiguadorTrocaTitularidade',
        expectedMessage: 'A URA Congnitiva informa que entendeu que deseja falar sobre Troca de Titularidade;'
    }),

    perguntaQuerAlgoMais: trocaTitularidade.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: trocaTitularidade.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: trocaTitularidade.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    informativoTrocaTitularidade: trocaTitularidade.newNode('node', {
        name: 'Informa sobre a troca de titularidade',
        expectedMessage: 'A URA Congnitiva informa que este serviço só pode ser feito nas lojas físicas;'
    }),

    enviaSMSAgendamento: trocaTitularidade.newNode('switch', {
        name: 'Envia SMS Link Agendamento Lojas Fisicas',
        pathCases: ['Sucesso no SMS', 'Falha no SMS']
    }),

    respostaSMSAgendamentoSucesso: trocaTitularidade.newNode('node', {
        name: 'Informa que enviou o SMS',
        expectedMessage: 'A URA Congnitiva informa que enviou um SMS com o link para o site onde é possível fazer o agendamento em uma das lojas;'
    }),

    respostaSMSAgendamentoFalha: trocaTitularidade.newNode('node', {
        name: 'Informa que enviou o SMS',
        expectedMessage: 'A URA Congnitiva informa que é preciso agendar o atendimento em uma loja e, que para isto, o cliente deve acessar o site e clicar em "Lojas";'
    }),
};

// console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;