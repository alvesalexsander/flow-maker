const adesaoOferta = require('./map');

const nodes = {
    startAdesaoOferta: adesaoOferta.newNode('starting', {
        name: 'Inicia fluxo de adesaoOferta',
        expectedMessage: 'Cliente veio do fluxo de acolhimento e quer aderir a uma oferta;'
    }),

    saudacaoURA: adesaoOferta.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF;'
    }),

    transfereParaATH: adesaoOferta.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH.'

    }).turnTargetNode(),

    encerraLigacao: adesaoOferta.newNode('node', {
        name: 'URA encerra a ligação',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),

    viaDeAcesso: adesaoOferta.newNode('node', {
        name: 'Veio do acolhimento para o fluxo de adesão',
    }),

    perguntaQuerAlgoMais: adesaoOferta.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: [/* 'Quer algo mais',  */'Não quer mais nada']
    }),

    desambiguador: adesaoOferta.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: adesaoOferta.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    verificaClienteBeta: adesaoOferta.newNode('switch', {
        name: 'Cliente é Beta?',
        pathCases: ['Cliente é Beta', 'Cliente não é Beta']
    }),

    verificaClienteBetaLab: adesaoOferta.newNode('switch', {
        name: 'Cliente é Beta?',
        pathCases: ['Cliente é Beta LAB', 'Cliente não é Beta LAB']
    }),

    respostaClienteBetaLabSim: adesaoOferta.newNode('node', {
        name: 'URA informa que o cliente possui a promoção Beta',
        expectedMessage: 'URA informa que o cliente possui a promoção Beta Lab e fornece orientações sobre como manter os beneficios com pontos nas rodadas que duram 3 meses;'
    }),

    respostaClienteBetaLabNao: adesaoOferta.newNode('node', {
        name: 'URA informa que o cliente possui a promoção Beta',
        expectedMessage: 'URA informa que o cliente não possui a promoção Beta Lab e fornece orientações sobre como conseguir os beneficios com pontos nas rodadas que duram 3 meses;'
    }),

    respostaClienteBetaSim: adesaoOferta.newNode('node', {
        name: 'URA confirma se o cliente quer aderir a uma nova promoção',
        expectedMessage: 'URA pergunta se o cliente deseja aderir a uma nova promoção;'
    }),

    verificaInputCliente: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (1ª tentativa)', 'Input Válido']
    }),

    respostaInputInvalido1: adesaoOferta.newNode('node', {
        name: 'Cliente fornece input inválido na primeira tentativa',
        expectedMessage: 'URA informa que para prosseguir precisa que o cliente confirme que quer conhecer outras promoções disponíveis;'
    }),

    verificaInputCliente2: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (2ª tentativa)', 'Input Válido(2ª tentativa)']
    }),

    respostaInputInvalido2: adesaoOferta.newNode('node', {
        name: 'Cliente fornece input inválido na primeira tentativa',
        expectedMessage: 'URA informa que como não conseguiu entender, não vai poder ajudar;'
    }),

    verificaInputValido: adesaoOferta.newNode('switch', {
        name: 'Verifica Input válido',
        pathCases: ['Quer aderir a promoção', 'Não relacionado a adesão']
    }),

    respostaInputValidoQuerAderir: adesaoOferta.newNode('node', {
        name: 'URA fala sobre a promoção atual',
        expectedMessage: 'URA informa que antes de continuar vai falar sobre a promoção atual e apresenta um Highlight da promoção atual e na sequência consulta as promoções que estão disponíveis;'
    }),

    //-----------------------------------------------SERVIÇO CONSULTA PROMOÇÕES---------------------------------------------------------

    verificaServiçoConsultaPromocoes: adesaoOferta.newNode('switch', {
        name: 'Verifica Input válido',
        pathCases: ['Sucesso ao Consultar Promoções', 'Falha ao Consultar Promoções']
    }),

    respostaFalhaConsultaPromocoes: adesaoOferta.newNode('node', {
        name: 'URA informa que não conseguiu consultar as promoções por instabilidade no sistema',
        expectedMessage: 'URA informa que não conseguiu consultar as promoções por instabilidade no sistema e que o usuário pode conhecer as outras ofertas no site da operadora;'
    }),
    //-----------------------------------------------FIM SERVIÇO CONSULTA PROMOÇÕES---------------------------------------------------------

    verificaOfertasElegiveis: adesaoOferta.newNode('switch', {
        name: 'Verifica Input válido',
        pathCases: ['Elegível a ofertas', 'Sem ofertas Elegíveis']
    }),

    respostaSemOfertasElegiveis: adesaoOferta.newNode('node', {
        name: 'URA informa que o cliente já possui a melhor oferta que a operadora pode oferecer',
        expectedMessage: 'URA informa que cliente já possui a melhor oferta que a operadora pode oferecer;'
    }),

    respostaElegivelAOfertas: adesaoOferta.newNode('node', {
        name: 'URA informa que possui ofertas para o cliente',
        expectedMessage: 'URA informa que possui ofertas disponiveis para o cliente e apresenta o Highlight da promoção/oferta;'
    }),

    perguntaClienteQuerAderir: adesaoOferta.newNode('switch', {
        name: 'Verifica se o cliente quer saber mais sobre esta promoção ou aderir a mesma',
        pathCases: ['Quer aderir', 'Quer informações', 'Não quer este']
    }),

    //----------------------------------------------------INPUT QUER ADERIR----------------------------------------------

    verificaInputQuerAderir: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (1ª tentativa)', 'Input Válido']
    }),

    respostaInputQuerAderirInvalido1: adesaoOferta.newNode('node', {
        name: 'Cliente fornece input inválido na primeira tentativa',
        expectedMessage: 'URA repetir a pergunta de confirmação da adesão;'
    }),

    verificaInputQuerAderirCliente2: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (2ª tentativa)', 'Input Válido(2ª tentativa)']
    }),

    verificaInputQuerAderirValido: adesaoOferta.newNode('switch', {
        name: 'Verifica Input válido',
        pathCases: ['Quer aderir a promoção', 'Quer mais informações', 'Não quer aderir']
    }),

    verificaTemOutraPromocao: adesaoOferta.newNode('switch', {
        name: 'Verifica se tem outra promoção disponível',
        pathCases: [
            'Quer aderir a segunda oferta disponível', 
            'Quer aderir a terceira oferta disponível', 
            'Não tem outra oferta disponível']
    }),
//-----------------------------------------------------FIM INPUT QUER ADERIR--------------------------------------------------

//----------------------------------------------------INPUT MAIS INFO----------------------------------------------

    respostaInputMaisInfo: adesaoOferta.newNode('node', {
        name: 'URA pergunta quais informações o cliente deseja saber sobre a oferta',
        expectedMessage: 'URA pergunta quais informações o cliente deseja saber sobre a oferta;'
    }),

    verificaInputMaisInfo: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (1ª tentativa)', 'Input Válido']
    }),

    respostaInputMaisInfoInvalido1: adesaoOferta.newNode('node', {
        name: 'Cliente fornece input inválido na primeira tentativa',
        expectedMessage: 'URA dá sugestões sobre o que o cliente pode perguntar a respeito da promoção e aguarda o input novamente;'
    }),

    verificaInputMaisInfoCliente2: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (2ª tentativa)', 'Input Válido(2ª tentativa)']
    }),

    respostaInputMaisInfoValido: adesaoOferta.newNode('node', {
        name: 'URA informa Highlight do plano orientado a informação',
        expectedMessage: 'URA informa Highlight do plano orientado a informação do input do cliente;'
    }),

    verificaMaisInfoQuerAderir: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Quer aderir após mais info', 'Não quer aderir após mais info']
    }),

//----------------------------------------------------FIM INPUT MAIS INFO----------------------------------------------
//----------------------------------------------------INPUT CONFIRMA ADESÃO----------------------------------------------

    // verificaConfirmaAdesao:adesaoOferta.newNode('switch', {
    //     name: 'Verifica Input',
    //     pathCases: ['Confirma Adesão.', 'Não quer aderir após mais info.']
    // }),

    respostaConfirmaAdesao: adesaoOferta.newNode('node', {
        name: 'URA pergunta para confirmar a adesão',
        expectedMessage: 'URA pede para o cliente confirmar ou recusar a adesão;'
    }),

    verificaInputConfirmaAdesao: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (1ª tentativa)', 'Input Válido']
    }),

    respostaInputConfirmaAdesaoInvalido1: adesaoOferta.newNode('node', {
        name: 'Cliente fornece input inválido na primeira tentativa',
        expectedMessage: 'URA informa que precisa da confirmação para continuar;'
    }),

    verificaInputConfirmaAdesaoCliente2: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Input Inválido (2ª tentativa)', 'Input Válido(2ª tentativa)']
    }),

    verificaConfirmaAdesao: adesaoOferta.newNode('switch', {
        name: 'Verifica Input',
        pathCases: ['Confirma adesão', 'Não confirma adesão']
    }),

    respostaInputConfirmaAdesaoSim: adesaoOferta.newNode('node', {
        name: 'URA informa Highlight do plano orientado a informação',
        expectedMessage: 'URA informa Highlight do plano orientado a informação do input do cliente;'
    }),

    respostaInputConfirmaAdesaoSNao: adesaoOferta.newNode('node', {
        name: 'URA informa que o cliente continuará com a promoção atual',
        expectedMessage: 'URA informa que o cliente continuará com a promoção atual;'
    }),
//----------------------------------------------------FIM INPUT CONFIRMA ADESÃO----------------------------------------------

    verificaProprioAparelho: adesaoOferta.newNode('switch', {
        name: 'Verifica ligando próprio aparelho',
        pathCases: ['Ligando do próprio aparelho', 'Ligando de outro aparelho']
    }),

    verificaSenhaUnica: adesaoOferta.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['Sucesso fluxo de senha', 'Falha fluxo de senha']
    }),

    respostaRealizaAdesao: adesaoOferta.newNode('node', {
        name: 'URA inicia o serviço de adesão',
        expectedMessage: 'URA pede para aguardar enquanto realiza a adesão;'
    }),

    respostaSenhaUnicaNao: adesaoOferta.newNode('node', {
        name: 'URA informa por segurança não irá prosseguir com o pedido',
        expectedMessage: 'URA informa que por segurança não irá prosseguir com o pedido;'
    }),

    verificaServicoAdesao: adesaoOferta.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['Sucesso na adesão', 'Falha na adesão']
    }),

    verificaSMSProtocolo: adesaoOferta.newNode('switch', {
        name: 'Verifica senha única',
        pathCases: ['Sucesso no SMS', 'Falha no SMS']
    }),

    enviaSMSProtocoloSim: adesaoOferta.newNode('node', {
        name: 'URA informa que a promoção foi contratada o SMS com o protocolo foi enviado',
        expectedMessage: 'URA informa que a promoção foi contratada e enviou um SMS com o número do protocolo do atendimento;'
    }),

    enviaSMSProtocoloNao: adesaoOferta.newNode('node', {
        name: 'URA informa que a promoção foi contratada',
        expectedMessage: 'URA informa que a promoção foi contratada;'
    }),

};

console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;