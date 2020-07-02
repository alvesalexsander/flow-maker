const acolhimentoPre = require('./map');

const nodes = {
    startAcolhimentoPre: acolhimentoPre.newNode('starting', {
        name: 'Inicia fluxo de Acolhimento',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    saudacaoURA: acolhimentoPre.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: acolhimentoPre.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: acolhimentoPre.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: acolhimentoPre.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de #desambiguadoracolhimentoPre',
        expectedMessage: 'A URA Congnitiva informa que entendeu que deseja falar sobre Troca de Titularidade;'
    }),

    perguntaQuerAlgoMais: acolhimentoPre.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: acolhimentoPre.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: acolhimentoPre.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    informativoacolhimentoPre: acolhimentoPre.newNode('node', {
        name: 'Informa sobre a troca de titularidade',
        expectedMessage: 'A URA Congnitiva informa que este serviço só pode ser feito nas lojas físicas;'
    }),

    enviaSMSAgendamento: acolhimentoPre.newNode('switch', {
        name: 'Envia SMS Link Agendamento Lojas Fisicas',
        pathCases: ['Sucesso no SMS', 'Falha no SMS']
    }),

    respostaSMSAgendamentoSucesso: acolhimentoPre.newNode('node', {
        name: 'Informa que enviou o SMS',
        expectedMessage: 'A URA Congnitiva informa que enviou um SMS com o link para o site onde é possível fazer o agendamento em uma das lojas;'
    }),

    respostaSMSAgendamentoFalha: acolhimentoPre.newNode('node', {
        name: 'Informa que enviou o SMS',
        expectedMessage: 'A URA Congnitiva informa que é preciso agendar o atendimento em uma loja e, que para isto, o cliente deve acessar o site e clicar em "Lojas";'
    }),
};

// console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;