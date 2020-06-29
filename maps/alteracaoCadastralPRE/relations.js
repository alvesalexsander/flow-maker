const alteracaoCadastral = require('./map');
const { 
    startAlteracaoCadastral,
    trocaDeTitularidade,
    transfereParaATH,
    senhaResultado,
    perguntaQuerAlgoMais,
    desambiguador,
    agradeceDesliga,
    digiteNovoCPF,
    validaCPF,
    redigiteCPF,
    resultadoValidacao,
    resultadoTrocaCPF,
    enviaProtocoloSMS,
    msgProtocoloEnviado,
    msgProtocoloNaoEnviado,
    fim } = require('./nodes');

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