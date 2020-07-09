const contestacaoSaldoRecarga = require('./map');
const {
    startContestacaoSaldoRecarga,
  saudacaoURA,
  transfereParaATH,
  encerraLigacao,
  viaDeAcesso,
  perguntaQuerAlgoMais,
  desambiguador,
  agradeceDesliga,
  verificaInformacaoSaldoDisponivel,
  verificaInformacaoSaldoDisponivel2,
  verificaServicoConsultaSaldoRecarga,
  verificaServicoConsultaSaldoRecarga2,
  verificaSaldoNaValidade,
  verificaSaldoNaValidade2,
  verificaSaldoMaiorQueZeroValido,
  verificaSaldoMaiorQueZeroValido2,
  respostaMaiorQueZeroValidoSim,
  respostaMaiorQueZeroValidoSimConsultarSaldo,
  respostaMaiorQueZeroValidoSimContestarSaldo,
  respostaMaiorQueZeroNao,
  respostaMaiorQueZeroNaoConsultarSaldo,
  respostaMaiorQueZeroNaoContestarSaldo,
  verificaSaldoMaiorQueZeroInvalido,
  verificaSaldoMaiorQueZeroInvalido2,
  respostaMaiorQueZeroInvalidoSim,
  respostaMaiorQueZeroInvalidoSimConsultarSaldo,
  respostaMaiorQueZeroInvalidoSimContestarSaldo,
  verificaIntencaoConsultarSaldo,
  verificaIntencaoConsultarSaldoExlusivo,
  verificaIntencaoConsultarSaldoExlusivo2,
  perguntaQuerAlgoMaisContestacao,
  verificaIntencaoContestarSaldo,
  verificaClientePreTop,
  perguntaQuerAlgoMaisContestacao2,
  verificaIntencaoContestarSaldo2,
  verificaClientePreTop2,
  respostaClientePreTopSim,
  respostaClientePreTopSim2,
  respostaClientePreTopNao,
  respostaClientePreTopNao2,
  respostaServicoConsultaSaldoRecargaFalha,
  respostaServicoConsultaSaldoRecargaFalha2,
  verificaConsultarSaldoFalhaAcolhimento,
  respostaIntencaoConsultarSaldoFalhaAcolhimento
} = require('./nodes');

contestacaoSaldoRecarga.linkChain(
    [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

    [verificaIntencaoConsultarSaldoExlusivo.getPath('Intenção Consultar Saldo'), perguntaQuerAlgoMaisContestacao],
        [perguntaQuerAlgoMaisContestacao.getPath('Não quer mais nada'), agradeceDesliga],
        [perguntaQuerAlgoMaisContestacao.getPath('Quer contestar saldo'), verificaIntencaoContestarSaldo],
            [verificaIntencaoContestarSaldo.getPath('Não quer contestar'), agradeceDesliga],
            [verificaIntencaoContestarSaldo.getPath('Quer contestar saldo'), verificaClientePreTop],


    [startContestacaoSaldoRecarga, saudacaoURA],
    [saudacaoURA, viaDeAcesso],

    // [viaDeAcesso, informativocontestacaoSaldoRecarga],
    [viaDeAcesso.getPath('Intenção Consultar Saldo'), verificaInformacaoSaldoDisponivel],
        [verificaInformacaoSaldoDisponivel.getPath('Sem informação de saldo vindo do acolhimento'), verificaConsultarSaldoFalhaAcolhimento],
            [verificaConsultarSaldoFalhaAcolhimento.getPath('Intenção Consultar Saldo (Falha Serv. Recarga/Saldo acolhimento)'), respostaIntencaoConsultarSaldoFalhaAcolhimento],
                [respostaIntencaoConsultarSaldoFalhaAcolhimento, perguntaQuerAlgoMais],
                //
            [verificaConsultarSaldoFalhaAcolhimento.getPath('Intenção não é Consultar Saldo (Falha Serv. Recarga/Saldo acolhimento)'), verificaClientePreTop],
            //
        [verificaInformacaoSaldoDisponivel.getPath('Saldo consultado no acolhimento'), verificaSaldoNaValidade],
            [verificaSaldoNaValidade.getPath('Saldo válido'), verificaSaldoMaiorQueZeroValido],
                [verificaSaldoMaiorQueZeroValido.getPath('Saldo > zero'), respostaMaiorQueZeroValidoSimConsultarSaldo],
                [verificaSaldoMaiorQueZeroValido.getPath('Saldo = zero'), respostaMaiorQueZeroNaoConsultarSaldo],
                [verificaSaldoMaiorQueZeroValido.getPath('Saldo < zero'), respostaMaiorQueZeroNaoConsultarSaldo],
            [verificaSaldoNaValidade.getPath('Saldo fora da validade'), verificaSaldoMaiorQueZeroInvalido],
                [verificaSaldoMaiorQueZeroInvalido.getPath('Saldo > zero (expirado)'), respostaMaiorQueZeroInvalidoSimConsultarSaldo],
                [verificaSaldoMaiorQueZeroInvalido.getPath('Saldo = zero (expirado)'), respostaMaiorQueZeroNaoConsultarSaldo],
                [verificaSaldoMaiorQueZeroInvalido.getPath('Saldo < zero (expirado)'), respostaMaiorQueZeroNaoConsultarSaldo],
                    [respostaMaiorQueZeroNaoConsultarSaldo, verificaIntencaoConsultarSaldoExlusivo],
                    [respostaMaiorQueZeroValidoSimConsultarSaldo, verificaIntencaoConsultarSaldoExlusivo],
                    [respostaMaiorQueZeroInvalidoSimConsultarSaldo, verificaIntencaoConsultarSaldoExlusivo],
                    [verificaIntencaoConsultarSaldoExlusivo.getPath('Intenção Consultar Saldo'), perguntaQuerAlgoMaisContestacao],

//Intenção Contestar Saldo
[viaDeAcesso.getPath('Intenção Contestar Saldo'), verificaInformacaoSaldoDisponivel2],
        [verificaInformacaoSaldoDisponivel2.getPath('Sem informação de saldo vindo do acolhimento'), verificaServicoConsultaSaldoRecarga2],
            [verificaServicoConsultaSaldoRecarga2.getPath('Falha na consulta de saldo'), respostaServicoConsultaSaldoRecargaFalha2],
                [respostaServicoConsultaSaldoRecargaFalha2, perguntaQuerAlgoMais],
            [verificaServicoConsultaSaldoRecarga2.getPath('Sucesso na consulta de saldo'), verificaSaldoNaValidade2],
                [respostaServicoConsultaSaldoRecargaFalha2, perguntaQuerAlgoMais],
        [verificaInformacaoSaldoDisponivel2.getPath('Saldo consultado no acolhimento'), verificaSaldoNaValidade2],
            [verificaSaldoNaValidade2.getPath('Saldo válido'), verificaSaldoMaiorQueZeroValido2],
                [verificaSaldoMaiorQueZeroValido2.getPath('Saldo > zero'), respostaMaiorQueZeroValidoSimContestarSaldo],
                [verificaSaldoMaiorQueZeroValido2.getPath('Saldo = zero'), respostaMaiorQueZeroNaoContestarSaldo],
                [verificaSaldoMaiorQueZeroValido2.getPath('Saldo < zero'), respostaMaiorQueZeroNaoContestarSaldo],
            [verificaSaldoNaValidade2.getPath('Saldo fora da validade'), verificaSaldoMaiorQueZeroInvalido2],
                [verificaSaldoMaiorQueZeroInvalido2.getPath('Saldo > zero (expirado)'), respostaMaiorQueZeroInvalidoSimContestarSaldo],
                [verificaSaldoMaiorQueZeroInvalido2.getPath('Saldo = zero (expirado)'), respostaMaiorQueZeroNaoContestarSaldo],
                [verificaSaldoMaiorQueZeroInvalido2.getPath('Saldo < zero (expirado)'), respostaMaiorQueZeroNaoContestarSaldo],
                    [respostaMaiorQueZeroNao, verificaIntencaoConsultarSaldoExlusivo2],
                    [respostaMaiorQueZeroValidoSimContestarSaldo, verificaIntencaoConsultarSaldoExlusivo2],
                    [respostaMaiorQueZeroInvalidoSimContestarSaldo, verificaIntencaoConsultarSaldoExlusivo2],
                    [verificaIntencaoConsultarSaldoExlusivo2.getPath('Outra intenção'), verificaClientePreTop],

// FLUXO PRE TOP
[verificaClientePreTop.getPath('Cliente Pré Top'), respostaClientePreTopSim],
[verificaClientePreTop.getPath('Não é Pré Top'), respostaClientePreTopNao],
    [respostaClientePreTopSim, perguntaQuerAlgoMais],
    [respostaClientePreTopNao, perguntaQuerAlgoMais],

)

// console.log(verificaIntencaoConsultarSaldo)

contestacaoSaldoRecarga.mapScenarios();
// contestacaoSaldoRecarga.showScenarios();
contestacaoSaldoRecarga.getSummary();
contestacaoSaldoRecarga.exportScenariosToExcel();