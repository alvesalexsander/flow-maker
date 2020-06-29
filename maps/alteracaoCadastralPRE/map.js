require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

const alteracaoCadastral = new FlowMap({ name: 'Alteracao Cadastral PRE' });

const startAlteracaoCadastral = alteracaoCadastral.newNode('starting', {
    name: 'Inicia Fluxo de AlteracaoCadastral'
});

const trocaDeTitularidade = alteracaoCadastral.newNode('switch', {
    name: 'Alteracao é troca de titularidade?',
    condition: 'Troca de Titularidade',
    pathCases: ['Sim', 'Não']
});

const transfereParaATH = alteracaoCadastral.newNode('node', {
    name: "URA Informa que vai tranferir para o ATH",
    stepMessage: "Encaminha para o ATH."
}).turnTargetNode();

const senhaResultado = alteracaoCadastral.newNode('switch', {
    name: 'Resultado Fluxo de Senha',
    condition: 'Fluxo de Senha',
    pathCases: [
        'Sucesso (Senha Correta)',
        'Falha (no Serviço)',
        'Sucesso (Data + CPF)',
        'Falha (Data OU CPF)']
});

const perguntaQuerAlgoMais = alteracaoCadastral.newNode('switch', {
    name: 'Pergunta se o usuario quer algo mais',
    condition: 'Ajudo com algo mais?',
    pathCases: ['Sim', 'Não']
})

const desambiguador = alteracaoCadastral.newNode('node', {
    name: 'Usuário quer algo mais',
    stepMessage: 'Quer algo mais.'
}).turnTargetNode();

const agradeceDesliga = alteracaoCadastral.newNode('node', {
    name: 'URA agradece e desliga a ligação',
    stepMessage: 'Não quer mais nada.'
}).turnTargetNode();

const digiteNovoCPF = alteracaoCadastral.newNode('node', {
    name: "URA solicita que cliente digite novo CPF",
    stepMessage: "Digite o novo CPF."
})

const validaCPF = alteracaoCadastral.newNode('switch', {
    name: "Verifica se o CPF foi digitado",
    condition: 'CPF Input/Match',
    pathCases: ['Válido', 'Não válido']
});

const redigiteCPF = alteracaoCadastral.newNode('node', {
    name: 'Pede para usuario informar o CPF',
    stepMessage: 'URA pede novamente um CPF válido.'
});

const resultadoValidacao = alteracaoCadastral.newNode('switch', {
    name: 'Verifica CPF após primeira tentativa',
    condition: 'Tentativa CPF No Input/No Match',
    pathCases: ['Válido(2ª tentativa)', 'Não válido(2ª tentativa)']
});

const resultadoTrocaCPF = alteracaoCadastral.newNode('switch', {
    name: 'Resultado da Troca de CPF',
    condition: 'Resultado da Troca de CPF',
    pathCases: ['Sucesso', 'Falha']
});

const enviaProtocoloSMS = alteracaoCadastral.newNode('switch', {
    name: 'Número de Protocolo por SMS?',
    condition: 'Sucesso no envio do protocolo por SMS',
    pathCases: ['Sim', 'Não']
});

const msgProtocoloEnviado = alteracaoCadastral.newNode('node', {
    name: 'Informa sucesso na Troca e SMS enviado',
    stepMessage: 'URA informa a Troca de Titularidade e envio de protocolo por SMS'
});

const msgProtocoloNaoEnviado = alteracaoCadastral.newNode('node', {
    name: 'Informa sucesso na Troca',
    stepMessage: 'URA informa a Troca de Titularidade'
});

const fim = alteracaoCadastral.newNode('node', {
    name: 'fimTESTE',
    stepMessage: 'URA agradece e desliga a ligação'
}).turnTargetNode();

alteracaoCadastral.linkNext(startAlteracaoCadastral.id, trocaDeTitularidade.id);
alteracaoCadastral.linkNext(trocaDeTitularidade.getPath('Não').id, transfereParaATH.id);
alteracaoCadastral.linkNext(trocaDeTitularidade.getPath('Sim').id, senhaResultado.id);

alteracaoCadastral.linkNext(senhaResultado.getPath('Falha (no Serviço)').id, perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Falha (Data OU CPF)').id, perguntaQuerAlgoMais.id);

alteracaoCadastral.linkNext(perguntaQuerAlgoMais.getPath('Não').id, agradeceDesliga.id);
alteracaoCadastral.linkNext(perguntaQuerAlgoMais.getPath('Sim').id, desambiguador.id);

alteracaoCadastral.linkNext(senhaResultado.getPath('Sucesso (Senha Correta)').id, digiteNovoCPF.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Sucesso (Data + CPF)').id, digiteNovoCPF.id);

alteracaoCadastral.linkNext(digiteNovoCPF.id, validaCPF.id);
alteracaoCadastral.linkNext(validaCPF.getPath('Não válido').id, redigiteCPF.id);
alteracaoCadastral.linkNext(redigiteCPF.id, resultadoValidacao.id);
alteracaoCadastral.linkNext(
    resultadoValidacao.getPath('Não válido(2ª tentativa)').id,
    perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(
    resultadoValidacao.getPath('Válido(2ª tentativa)').id,
    resultadoTrocaCPF.id);

alteracaoCadastral.linkNext(validaCPF.getPath('Válido').id, resultadoTrocaCPF.id);
alteracaoCadastral.linkNext(resultadoTrocaCPF.getPath('Falha').id, perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(resultadoTrocaCPF.getPath('Sucesso').id, enviaProtocoloSMS.id);
alteracaoCadastral.linkNext(enviaProtocoloSMS.getPath('Não').id, msgProtocoloNaoEnviado.id);
alteracaoCadastral.linkNext(enviaProtocoloSMS.getPath('Sim').id, msgProtocoloEnviado.id);

alteracaoCadastral.linkNext(msgProtocoloNaoEnviado.id, perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(msgProtocoloEnviado.id, perguntaQuerAlgoMais.id);


alteracaoCadastral.mapScenarios();
alteracaoCadastral.showScenarios();

module.exports = alteracaoCadastral;