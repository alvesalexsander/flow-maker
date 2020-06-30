const acolhimento = require('./map');

const nodes = {
    startAcolhimento: acolhimento.newNode('starting', {
        name: 'Inicia fluxo de acolhimento'
    }),

    saudacaoURA: acolhimento.newNode('node', {
        name: 'URA atende a ligação',
        stepMessage: 'URA pergunta como pode ajudar.'
    }),

    validaInputUsuario: acolhimento.newNode('switch', {
        name: 'URA valida input do cliente',
        condition: 'Input válido?',
        pathCases: ['Sim', 'Não']
    }),

    respostasInputInvalido: acolhimento.newNode('switch', {
        name: 'Respostas da URA para os inputs inválidos',
        condition: 'Input Inválido',
        pathCases: [
            'Input DTMF - URA pede para usuário vocalizar, não digitar', 
            'Ruído - URA pede para o usuário desativar o vivavoz',
            'No Input - URA informa que não entendeu e pede para repetir'
        ]
    }),

    validaInputUsuario2: acolhimento.newNode('switch', {
        name: 'URA tenta validar pela segunda vez o input',
        condition: 'Input válido? - 2ª tentativa',
        pathCases: ['Sim', 'Não']
    }),

    transfereParaATH: acolhimento.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH."
    }).turnTargetNode(),

    encerraLigacao: acolhimento.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    noInputEncerraLigacao: acolhimento.newNode('node', {
        name: 'URA informa que não entendeu encerra a ligação',
        stepMessage: 'URA informa que não consegue escutar e encerra a ligação'
    }).turnTargetNode(),

    respostasInputValido: acolhimento.newNode('switch', {
        name: 'URA avalia se a intenção reconhecida pode ser tratada',
        condition: 'Intenção tratada?',
        pathCases: ['Sim', 'Não']
    }),

    encaminhaFluxo: acolhimento.newNode('node', {
        name: 'Usuário quer algo mais',
        stepMessage: 'Encaminha cliente para o fluxo.'
    }).turnTargetNode(),

    intencaoATH: acolhimento.newNode('switch', {
        name: 'Verifica se intencão é ATH',
        condition: 'Intenção ATH?',
        pathCases: ['Sim', 'Não']
    }),

    inputATH: acolhimento.newNode('switch', {
        name: 'Cliente solicita ATH',
        condition: 'Pediu ATH mais de uma vez?',
        pathCases: ['Sim', 'Não']
    }),
};

module.exports = nodes;