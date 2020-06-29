const alteracaoCadastral = require('./map');

const nodes = {
    startAlteracaoCadastral: alteracaoCadastral.newNode('starting', {
        name: 'Inicia Fluxo de AlteracaoCadastral'
    }),
    
    trocaDeTitularidade: alteracaoCadastral.newNode('switch', {
        name: 'Alteracao é troca de titularidade?',
        condition: 'Troca de Titularidade',
        pathCases: ['Sim', 'Não']
    }),
    
    transfereParaATH: alteracaoCadastral.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH."
    }).turnTargetNode(),
    
    senhaResultado: alteracaoCadastral.newNode('switch', {
        name: 'Resultado Fluxo de Senha',
        condition: 'Fluxo de Senha',
        pathCases: [
            'Sucesso (Senha Correta)',
            'Falha (no Serviço)',
            'Sucesso (Data + CPF)',
            'Falha (Data OU CPF)']
    }),
    
    perguntaQuerAlgoMais: alteracaoCadastral.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        condition: 'Ajudo com algo mais?',
        pathCases: ['Sim', 'Não']
    }),
    
    desambiguador: alteracaoCadastral.newNode('node', {
        name: 'Usuário quer algo mais',
        stepMessage: 'Quer algo mais.'
    }).turnTargetNode(),
    
    agradeceDesliga: alteracaoCadastral.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        stepMessage: 'Não quer mais nada.'
    }).turnTargetNode(),
    
    digiteNovoCPF: alteracaoCadastral.newNode('node', {
        name: "URA solicita que cliente digite novo CPF",
        stepMessage: "Digite o novo CPF."
    }),
    
    validaCPF: alteracaoCadastral.newNode('switch', {
        name: "Verifica se o CPF foi digitado",
        condition: 'CPF Input/Match',
        pathCases: ['Válido', 'Não válido']
    }),
    
    redigiteCPF: alteracaoCadastral.newNode('node', {
        name: 'Pede para usuario informar o CPF',
        stepMessage: 'URA pede novamente um CPF válido.'
    }),
    
    resultadoValidacao: alteracaoCadastral.newNode('switch', {
        name: 'Verifica CPF após primeira tentativa',
        condition: 'Tentativa CPF No Input/No Match',
        pathCases: ['Válido(2ª tentativa)', 'Não válido(2ª tentativa)']
    }),
    
    resultadoTrocaCPF: alteracaoCadastral.newNode('switch', {
        name: 'Resultado da Troca de CPF',
        condition: 'Resultado da Troca de CPF',
        pathCases: ['Sucesso', 'Falha']
    }),
    
    enviaProtocoloSMS: alteracaoCadastral.newNode('switch', {
        name: 'Número de Protocolo por SMS?',
        condition: 'Sucesso no envio do protocolo por SMS',
        pathCases: ['Sim', 'Não']
    }),
    
    msgProtocoloEnviado: alteracaoCadastral.newNode('node', {
        name: 'Informa sucesso na Troca e SMS enviado',
        stepMessage: 'URA informa a Troca de Titularidade e envio de protocolo por SMS'
    }),
    
    msgProtocoloNaoEnviado: alteracaoCadastral.newNode('node', {
        name: 'Informa sucesso na Troca',
        stepMessage: 'URA informa a Troca de Titularidade'
    }),
    
    fim: alteracaoCadastral.newNode('node', {
        name: 'fimTESTE',
        stepMessage: 'URA agradece e desliga a ligação'
    }).turnTargetNode(),
};

module.exports = nodes;