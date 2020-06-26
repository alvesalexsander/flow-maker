require('../../index');

const FlowMap = require('../../models/classes/flows/FlowMap.class');

alteracaoCadastral = new FlowMap({ name: 'Alteracao Cadastral PRE' });

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
    stepMessage: "Encaminha para o ATH"
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
    stepMessage: 'Não quer mais nada'
}).turnTargetNode();

const digiteNovoCPF = alteracaoCadastral.newNode('node', {
    name: "URA solicita que cliente digite novo CPF",
    stepMessage: "Digita novo CPF"
})

const cpfDigitado = alteracaoCadastral.newNode('switch', {
    name: "Verifica se o CPF foi digitado",

})

alteracaoCadastral.linkNext(startAlteracaoCadastral.id, trocaDeTitularidade.id);
alteracaoCadastral.linkNext(trocaDeTitularidade.getPath('Não').id, transfereParaATH.id);
alteracaoCadastral.linkNext(trocaDeTitularidade.getPath('Sim').id, senhaResultado.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Falha (no Serviço)').id, perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Falha (Data OU CPF)').id, perguntaQuerAlgoMais.id);
alteracaoCadastral.linkNext(perguntaQuerAlgoMais.getPath('Não').id, agradeceDesliga.id);
alteracaoCadastral.linkNext(perguntaQuerAlgoMais.getPath('Sim').id, desambiguador.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Sucesso (Senha Correta)').id, digiteNovoCPF.id);
alteracaoCadastral.linkNext(senhaResultado.getPath('Sucesso (Data + CPF)').id, digiteNovoCPF.id);

alteracaoCadastral.linkNext(digiteNovoCPF.id, digiteNovoCPF.id);


alteracaoCadastral.mapScenarios();
alteracaoCadastral.showScenarios();