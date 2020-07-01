const contratarPacote = require('./map');

const nodes = {
    startContratarPacote: contratarPacote.newNode('starting', {
        name: 'Inicia fluxo de contratarPacote',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    saudacaoURA: contratarPacote.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    transfereParaATH: contratarPacote.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: contratarPacote.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: contratarPacote.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de #desambiguadorContrataçãoPacoteDados\nou #desambiguadorProblemaInternet',
        expectedMessage: 'A URA Congnitiva informa que entendeu que deseja falar sobre Contratação de Pacotes;'
    }),

    segundaContratacao: contratarPacote.newNode('switch', {
        name: 'Já contratou pacote na mesma ligação?',
        condition: 'Segunda Contratação',
        pathCases: ['Sim', 'Não']
    }),

    informaQueJaContratou: contratarPacote.newNode('node', {
        name: 'Informa que já contratou um pacote e precisa consumir',
        expectedMessage: 'A URA Cognitiva informa que o cliente já possui um pacote ativado\ne que precisa consumi-lo antes de contratar um novo pacote;'
    }),

    perguntaQuerAlgoMais: contratarPacote.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: contratarPacote.newNode('node', {
        name: 'Usuário quer algo mais',
        stepMessage: 'Quer algo mais.',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: contratarPacote.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        stepMessage: 'Não quer mais nada.',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    verificaBloqueioFinanceiro: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente possui bloqueio financeiro',
        condition: 'Possui bloqueio Financeiro?',
        pathCases: ['Sim', 'Não']
    }),

    respostaBloqueioFinanceiroSim: contratarPacote.newNode('node', {
        name: 'Informa ao cliente que possui bloqueio financeiro',
        expectedMessage: 'A URA Cognitiva informa que está com um bloqueio financeiro e por isso está impedido\nde contratar um novo pacote;'
    }),

    respostaBloqueioFinanceiroNao: contratarPacote.newNode('node', {
        name: 'Informa ao cliente que possui bloqueio financeiro',
        expectedMessage: 'A URA Cognitiva pede para aguardar enquanto verifica a internet;'
    }),

    verificaNavegaçãoReduzida: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente está com navegação reduzida',
        condition: 'Está com navegação reduzida?',
        pathCases: ['Sim', 'Não']
    }),

    respostaNavegaçãoReduzidaNao: contratarPacote.newNode('node', {
        name: 'Informa ao cliente que já possui um pacote ativo',
        expectedMessage: 'A URA Cognitiva informa que já existe um pacote ativo e que só é possível contratar\num novo depois de consumi-lo;'
    }),

    intencaoProblemaNaInternet: contratarPacote.newNode('switch', {
        name: 'Cliente relatou problema na internet?',
        condition: 'Relatou problema na internet?',
        pathCases: ['Sim', 'Não']
    }),

    respostaoProblemaNaInternetSim: contratarPacote.newNode('node', {
        name: 'Sugere reinicio do aparelho',
        expectedMessage: 'A URA Cognitiva sugere que o cliente reinicie o aparelho e pergunta se já tentou o reinicio;'
    }),

    verificaReiniciouAparelho: contratarPacote.newNode('switch', {
        name: 'Cliente já tentou reiniciar o aparelho?',
        condition: 'Já reiniciou o aparelho?',
        pathCases: ['Sim', 'Não']
    }),

    respostaReiniciouAparelhoNao: contratarPacote.newNode('node', {
        name: 'URA enfatiza que é importante reiniciar',
        expectedMessage: 'A URA Cognitiva pergunta se o cliente quer tentar reiniciar o aparelho;'
    }),

    verificaQuerReiniciar: contratarPacote.newNode('switch', {
        name: 'Cliente quer reiniciar o aparelho?',
        condition: 'Quer reiniciar o aparelho?',
        pathCases: ['Sim', 'Não']
    }),

    respostaQuerReiniciarNao: contratarPacote.newNode('node', {
        name: 'URA enfatiza que é importante reiniciar',
        expectedMessage: 'A URA Cognitiva informa que envio ou SMS o guia rápido;'
    }),

    verificaBillingProfile: contratarPacote.newNode('switch', {
        name: 'Verifica se os dados do serviço Billing Profile estão disponiveis',
        condition: 'Billing Profile?',
        pathCases: ['Sucesso', 'Falha']
    }),

    verificaClienteInadimplente: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente está inadimplente',
        condition: 'Cliente Inadimplente?',
        pathCases: ['Sim', 'Não']
    }),

    respostaClienteInadimplenteSim: contratarPacote.newNode('node', {
        name: 'URA informa que cliente consumiu 100%',
        expectedMessage: 'A URA Cognitiva informa o pacote de dados foi consumido e, por estar inadimplente,\na velocidade está reduzida e não pode contratar um novo pacote;'
    }),

    verificaClienteTitular: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente é titular da conta',
        condition: 'Cliente Titular?',
        pathCases: ['Sim', 'Não']
    }),

    respostaClienteTitularNao: contratarPacote.newNode('node', {
        name: 'URA informa que cliente consumiu 100% e não é o titular da conta',
        expectedMessage: 'A URA Cognitiva informa que o pacote de dados foi consumido e,\nque por não ser o titular, não poderá contratar um novo pacote;'
    }),

    respostaClienteTitularProbInternetSim: contratarPacote.newNode('node', {
        name: 'URA informa que cliente consumiu 100% do pacote',
        expectedMessage: 'A URA Cognitiva informa que está com velocidade reduzida porque já consumiu o pacote,\nmas pode contratar um pacote adicional e verifica se existem pacotes disponiveis;'
    }),

    verificaPacoteVazio: contratarPacote.newNode('switch', {
        name: 'Verifica se existem pacotes disponiveis',
        condition: 'Pacote Vazio?',
        pathCases: ['Sim', 'Não']
    }),

    respostaVerificaPacoteVazioSim: contratarPacote.newNode('node', {
        name: 'URA não encontra pacotes disponiveis',
        expectedMessage: 'A URA Cognitiva informa que não existem pacotes disponiveis no momento;'
    }),

    respostaVerificaPacoteVazioNao: contratarPacote.newNode('node', {
        name: 'URA encontra pacotes disponiveis e informa ao cliente',
        expectedMessage: 'A URA Cognitiva lista e oferece os pacotes disponíveis ao cliente;'
    }),

    verificaPacoteEscolhido: contratarPacote.newNode('switch', {
        name: 'Verifica se algum pacote foi escolhido',
        condition: 'Algum pacote escolhido?',
        pathCases: ['Sim', 'Não']
    }),

    respostaPacoteEscolhidoNao: contratarPacote.newNode('node', {
        name: 'URA encontra pacotes disponiveis e informa ao cliente',
        expectedMessage: 'A URA Cognitiva informa que no momento estas são as únicas opções disponíveis;'
    }),

    verificaRepetir: contratarPacote.newNode('switch', {
        name: 'Verifica se o usuário quer ouvir de novo',
        condition: 'Repetir?',
        pathCases: ['Sim', 'Não']
    }),

    respostaRepetir: contratarPacote.newNode('switch', {
        name: 'URA repete as opções disponiveis',
        condition: 'Algum pacote escolhido(após repetir)?',
        pathCases: ['Sim', 'Não']
    }),

    verificaConfirmaContratacao: contratarPacote.newNode('switch', {
        name: 'URA perguntar se o cliente quer confirmar a contratação do pacote',
        condition: 'Confirma contratação?',
        pathCases: ['Sim', 'Não']
    }),

    respostaConfirmaContratacaoNao: contratarPacote.newNode('node', {
        name: 'URA encontra não confirma contratacao',
        expectedMessage: 'A URA Cognitiva informa que não efetuou a contratação;'
    }),

    verificaLigandoProprioAparelho: contratarPacote.newNode('switch', {
        name: 'URA verifica se está ligando do próprio aparelho',
        condition: 'Ligando do próprio aparelho?',
        pathCases: ['Sim', 'Não']
    }),

    respostaLigandoProprioAparelhoNao: contratarPacote.newNode('node', {
        name: 'URA informa que precisa da senha única',
        expectedMessage: 'URA informa que precisa da senha única;'
    }),

    verificaFluxoDeSenha: contratarPacote.newNode('switch', {
        name: 'Sucesso no fluxo de Senha?',
        condition: 'Fluxo de Senha',
        pathCases: ['Sucesso', 'Falha']
    }),

    respostaFluxoDeSenhaFalha: contratarPacote.newNode('node', {
        name: 'Falha no Fluxo de Senha',
        expectedMessage: 'URA Informa que não foi possível confirmar os dados do cliente e não vai poder prosseguir;'
    }),

    verificaContratacaoEfetuada: contratarPacote.newNode('switch', {
        name: 'Serviço Contratação de Pacotes de dados',
        condition: 'Contratação efetuada?',
        pathCases: ['Sucesso', 'Falha']
    }),

    respostaContratacaoEfetuadaSucesso: contratarPacote.newNode('node', {
        name: 'URA informa o pacote foi contratado',
        expectedMessage: 'URA informa o pacote foi contratado;'
    }),

    respostaContratacaoEfetuadaFalha: contratarPacote.newNode('node', {
        name: 'URA informa o pacote não foi contratado',
        expectedMessage: 'URA informa o pacote não foi contratado;'
    }),

};

// console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;