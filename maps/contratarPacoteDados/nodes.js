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
        pathCases: ['Segunda contratação', 'Não é a segunda contratação']
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
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: contratarPacote.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    verificaBloqueioFinanceiro: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente possui bloqueio financeiro',
        pathCases: ['Está em BTO', 'Não é BTO']
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
        pathCases: ['Navegação reduzida', 'Navegação normal']
    }),

    respostaNavegaçãoReduzidaNao: contratarPacote.newNode('node', {
        name: 'Informa ao cliente que já possui um pacote ativo',
        expectedMessage: 'A URA Cognitiva informa que já existe um pacote ativo e que só é possível contratar\num novo depois de consumi-lo;'
    }),

    intencaoProblemaNaInternet: contratarPacote.newNode('switch', {
        name: 'Cliente relatou problema na internet?',
        pathCases: ['Está com problema na internet', 'Internet sem problemas']
    }),

    respostaoProblemaNaInternetSim: contratarPacote.newNode('node', {
        name: 'Sugere reinicio do aparelho',
        expectedMessage: 'A URA Cognitiva sugere que o cliente reinicie o aparelho e pergunta se já tentou o reinicio;'
    }),

    verificaReiniciouAparelho: contratarPacote.newNode('switch', {
        name: 'Cliente já tentou reiniciar o aparelho?',
        pathCases: ['Já reiniciou', 'Ainda não reiniciou']
    }),

    respostaReiniciouAparelhoNao: contratarPacote.newNode('node', {
        name: 'URA enfatiza que é importante reiniciar',
        expectedMessage: 'A URA Cognitiva pergunta se o cliente quer tentar reiniciar o aparelho;'
    }),

    verificaQuerReiniciar: contratarPacote.newNode('switch', {
        name: 'Cliente quer reiniciar o aparelho?',
        pathCases: ['Aceita reiniciar', 'Não quer reiniciar']
    }),

    respostaQuerReiniciarNao: contratarPacote.newNode('node', {
        name: 'URA enfatiza que é importante reiniciar',
        expectedMessage: 'A URA Cognitiva informa que envio ou SMS o guia rápido;'
    }),

    verificaBillingProfile: contratarPacote.newNode('switch', {
        name: 'Verifica se os dados do serviço Billing Profile estão disponiveis',
        pathCases: ['Sucesso no billing', 'Erro no billing']
    }),

    verificaClienteInadimplente: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente está inadimplente',
        pathCases: ['Cliente inadimplente', 'Cliente sem débitos']
    }),

    respostaClienteInadimplenteSim: contratarPacote.newNode('node', {
        name: 'URA informa que cliente consumiu 100%',
        expectedMessage: 'A URA Cognitiva informa o pacote de dados foi consumido e, por estar inadimplente,\na velocidade está reduzida e não pode contratar um novo pacote;'
    }),

    verificaClienteTitular: contratarPacote.newNode('switch', {
        name: 'Verifica se o cliente é titular da conta',
        pathCases: ['É titular', 'Não é titular']
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
        pathCases: ['Pacote vazio', 'Pacotes disponíveis']
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
        pathCases: ['Pacote escolhido', 'Nenhum pacote escolhido']
    }),

    respostaPacoteEscolhidoNao: contratarPacote.newNode('node', {
        name: 'URA encontra pacotes disponiveis e informa ao cliente',
        expectedMessage: 'A URA Cognitiva informa que no momento estas são as únicas opções disponíveis;'
    }),

    verificaRepetir: contratarPacote.newNode('switch', {
        name: 'Verifica se o usuário quer ouvir de novo',
        pathCases: ['Quer ouvir opções de novo', 'Não quer ouvir de novo']
    }),

    respostaRepetir: contratarPacote.newNode('switch', {
        name: 'URA repete as opções disponiveis',
        pathCases: ['Pacote escolhido(após repetir)', 'Nenhum pacote escolhido(após repetir)']
    }),

    verificaConfirmaContratacao: contratarPacote.newNode('switch', {
        name: 'URA perguntar se o cliente quer confirmar a contratação do pacote',
        pathCases: ['Confirma contratação', 'Não confirma contratação']
    }),

    respostaConfirmaContratacaoNao: contratarPacote.newNode('node', {
        name: 'URA encontra não confirma contratacao',
        expectedMessage: 'A URA Cognitiva informa que não efetuou a contratação;'
    }),

    verificaLigandoProprioAparelho: contratarPacote.newNode('switch', {
        name: 'URA verifica se está ligando do próprio aparelho',
        pathCases: ['Ligando do próprio aparelho', 'Ligando de outro aparelho']
    }),

    respostaLigandoProprioAparelhoNao: contratarPacote.newNode('node', {
        name: 'URA informa que precisa da senha única',
        expectedMessage: 'URA informa que precisa da senha única;'
    }),

    verificaFluxoDeSenha: contratarPacote.newNode('switch', {
        name: 'Sucesso no fluxo de Senha?',
        pathCases: ['Sucesso no fluxo de senha', 'Falha no fluxo de senha']
    }),

    respostaFluxoDeSenhaFalha: contratarPacote.newNode('node', {
        name: 'Falha no Fluxo de Senha',
        expectedMessage: 'URA Informa que não foi possível confirmar os dados do cliente e não vai poder prosseguir;'
    }),

    verificaContratacaoEfetuada: contratarPacote.newNode('switch', {
        name: 'Serviço Contratação de Pacotes de dados',
        pathCases: ['Sucesso na contratação', 'Falha na contratação']
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