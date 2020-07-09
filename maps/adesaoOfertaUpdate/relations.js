const adesaoOferta = require('./map');
const {
    startAdesaoOferta,   
  saudacaoURA,
  transfereParaATH,    
  encerraLigacao,
  viaDeAcesso,
  perguntaQuerAlgoMais,
  desambiguador,       
  agradeceDesliga,     
  verificaClienteBeta,
  verificaClienteBetaLab,
  respostaClienteBetaLabSim,
  respostaClienteBetaLabNao,
  respostaClienteBetaSim,
  verificaInputCliente,
  respostaInputInvalido1,
  verificaInputCliente2,
  respostaInputInvalido2,
  verificaInputValido,
  respostaInputValidoQuerAderir,
  verificaServiçoConsultaPromocoes,
  respostaFalhaConsultaPromocoes,
  respostaRealizaAdesao,
  verificaOfertasElegiveis,
  respostaSemOfertasElegiveis,
  respostaElegivelAOfertas,
  perguntaClienteQuerAderir,
  verificaInputQuerAderir,
  respostaInputQuerAderirInvalido1,
  verificaInputQuerAderirCliente2,
  verificaInputQuerAderirValido,
  verificaTemOutraPromocao,
  respostaInputMaisInfo,
  verificaInputMaisInfo,
  respostaInputMaisInfoInvalido1,
  verificaInputMaisInfoCliente2,
  respostaInputMaisInfoValido,
  verificaMaisInfoQuerAderir,
  respostaConfirmaAdesao,
  verificaInputConfirmaAdesao,
  respostaInputConfirmaAdesaoInvalido1,
  verificaInputConfirmaAdesaoCliente2,
  verificaConfirmaAdesao,
  respostaInputConfirmaAdesaoSim,
  respostaInputConfirmaAdesaoSNao,
  verificaProprioAparelho,
  verificaSenhaUnica,
  respostaSenhaUnicaNao,
  verificaServicoAdesao,
  verificaSMSProtocolo,
  enviaSMSProtocoloSim,
  enviaSMSProtocoloNao,
  verificaConsultaPlanDataAction,
  respostaConsultaPlanDataActionFalha,
  verificaSMSBeta
} = require('./nodes');

adesaoOferta.linkChain(
    // [perguntaQuerAlgoMais.getPath('Quer algo mais'), desambiguador],
    [perguntaQuerAlgoMais.getPath('Não quer mais nada'), agradeceDesliga],

    [startAdesaoOferta, viaDeAcesso],
    [viaDeAcesso, verificaClienteBeta],
        [verificaClienteBeta.getPath('Cliente é Beta'), verificaSMSBeta],
        [verificaSMSBeta.getPath('Sucesso no SMS Beta'), verificaClienteBetaLab],
        [verificaSMSBeta.getPath('Falha no SMS Beta'), verificaClienteBetaLab],
            [verificaClienteBetaLab.getPath('Cliente é Beta LAB'), respostaClienteBetaLabSim],
                [respostaClienteBetaLabSim, perguntaQuerAlgoMais],
                //
            [verificaClienteBetaLab.getPath('Cliente não é Beta LAB'), respostaClienteBetaLabNao],
                [respostaClienteBetaLabNao, perguntaQuerAlgoMais],
                //
        [verificaClienteBeta.getPath('Cliente não é Beta'), respostaClienteBetaSim],
            [respostaClienteBetaSim, verificaInputCliente],
                // [verificaInputCliente.getPath('Input Inválido (2x)'), perguntaQuerAlgoMais],
                // [verificaInputCliente.getPath('Input Inválido -> Válido'), verificaServiçoConsultaPromocoes],

                // [verificaInputCliente.getPath('Input Válido'), respostaInputValidoQuerAderir],
                [verificaInputCliente.getPath('Input Válido'), verificaServiçoConsultaPromocoes],
                    // [respostaInputValidoQuerAderir, verificaServiçoConsultaPromocoes],
                        [verificaServiçoConsultaPromocoes.getPath('Falha ao Consultar Promoções'), respostaFalhaConsultaPromocoes],
                            [respostaFalhaConsultaPromocoes, perguntaQuerAlgoMais],
                            //
                        [verificaServiçoConsultaPromocoes.getPath('Sucesso ao Consultar Promoções'), verificaConsultaPlanDataAction],
                        [verificaConsultaPlanDataAction.getPath('Falha no serviço Plan Data Action'), respostaConsultaPlanDataActionFalha],
                        [respostaConsultaPlanDataActionFalha, perguntaQuerAlgoMais],
                        // [verificaConsultaPlanDataAction.getPath('Sucesso no Plan Data Action'), verificaOfertasElegiveis],
                        [verificaConsultaPlanDataAction.getPath('Sucesso no Plan Data Action'), respostaInputValidoQuerAderir],
                        [respostaInputValidoQuerAderir, verificaOfertasElegiveis],
                            [verificaOfertasElegiveis.getPath('Sem ofertas Elegíveis'), respostaSemOfertasElegiveis],
                                [respostaSemOfertasElegiveis, perguntaQuerAlgoMais],
                                //
                            [verificaOfertasElegiveis.getPath('Elegível a ofertas'), respostaElegivelAOfertas],
                                [respostaElegivelAOfertas, verificaInputQuerAderir],
                                    // [verificaInputQuerAderir.getPath('Input Inválido (2x)'), perguntaQuerAlgoMais],
                                    // [verificaInputQuerAderir.getPath('Input Inválido -> Válido'), perguntaClienteQuerAderir],
                                        [respostaInputQuerAderirInvalido1, verificaInputQuerAderirCliente2],
                                            [verificaInputQuerAderirCliente2.getPath('Input Inválido (2ª tentativa)'), respostaInputInvalido2],
                                            //
                                            [verificaInputQuerAderirCliente2.getPath('Input Válido(2ª tentativa)'), verificaInputQuerAderirValido],
                                                [verificaInputQuerAderirValido.getPath('Não quer aderir'), verificaTemOutraPromocao],
                                                    [verificaTemOutraPromocao.getPath('Não tem outra oferta disponível'), verificaInputQuerAderirValido],
                                                        [verificaTemOutraPromocao.getPath('Não tem outra oferta disponível'), perguntaQuerAlgoMais],
                                                        //
                                                    [verificaTemOutraPromocao.getPath('Quer aderir a segunda oferta disponível'), respostaConfirmaAdesao],
                                                    //
                                                    [verificaTemOutraPromocao.getPath('Quer aderir a terceira oferta disponível'), respostaConfirmaAdesao],
                                                    //
                                                [verificaInputQuerAderirValido.getPath('Quer aderir a promoção'), respostaConfirmaAdesao],
                                                //
                                                [verificaInputQuerAderirValido.getPath('Quer mais informações'), respostaInputMaisInfo],
                                                    [respostaInputMaisInfo, verificaInputMaisInfo],
                                                        [verificaInputMaisInfo.getPath('Input Inválido (2x)'), perguntaQuerAlgoMais],
                                                        // [verificaInputMaisInfo.getPath('Input Inválido -> Válido'), respostaInputMaisInfoValido],
                                                            [respostaInputMaisInfoInvalido1, verificaInputMaisInfoCliente2],
                                                                [verificaInputMaisInfoCliente2.getPath('Input Inválido (2ª tentativa)'), respostaInputInvalido2],
                                                                //
                                                                [verificaInputMaisInfoCliente2.getPath('Input Válido(2ª tentativa)'), respostaInputMaisInfoValido],
                                                                //
                                                        [verificaInputMaisInfo.getPath('Input Válido'), respostaInputMaisInfoValido],
                                                            [respostaInputMaisInfoValido, verificaMaisInfoQuerAderir],
                                                                [verificaMaisInfoQuerAderir.getPath('Não quer aderir após mais info'), verificaTemOutraPromocao],
                                                                //
                                                                [verificaMaisInfoQuerAderir.getPath('Quer aderir após mais info'), respostaConfirmaAdesao],
                                                                    [respostaConfirmaAdesao, verificaInputConfirmaAdesao],
                                                                        // [verificaInputConfirmaAdesao.getPath('Input Inválido (2x)'), perguntaQuerAlgoMais],
                                                                        // [verificaInputConfirmaAdesao.getPath('Input Inválido -> Válido'), verificaConfirmaAdesao],
                                                                            [respostaInputConfirmaAdesaoInvalido1, verificaInputConfirmaAdesaoCliente2],
                                                                                [verificaInputConfirmaAdesaoCliente2.getPath('Input Inválido (2ª tentativa)'), perguntaQuerAlgoMais],
                                                                                //
                                                                                [verificaInputConfirmaAdesaoCliente2.getPath('Input Válido(2ª tentativa)'), verificaConfirmaAdesao],
                                                                                    [verificaConfirmaAdesao.getPath('Não confirma adesão'), respostaInputConfirmaAdesaoSNao],
                                                                                        [respostaInputConfirmaAdesaoSNao, perguntaQuerAlgoMais],
                                                                                        //
                                                                                    [verificaConfirmaAdesao.getPath('Confirma adesão'), respostaInputConfirmaAdesaoSim],
                                                                                        [respostaInputConfirmaAdesaoSim, verificaProprioAparelho],
                                                                                            [verificaProprioAparelho.getPath('Ligando de outro aparelho'), verificaSenhaUnica],
                                                                                                [verificaSenhaUnica.getPath('Sucesso fluxo de senha'), respostaRealizaAdesao],
                                                                                                    [respostaRealizaAdesao, verificaServicoAdesao],
                                                                                                        [verificaServicoAdesao.getPath('Falha na adesão'), perguntaQuerAlgoMais],
                                                                                                        //
                                                                                                        [verificaServicoAdesao.getPath('Sucesso na adesão'), verificaSMSProtocolo],
                                                                                                            [verificaSMSProtocolo.getPath('Falha no SMS'), enviaSMSProtocoloNao],
                                                                                                                [enviaSMSProtocoloNao, perguntaQuerAlgoMais],
                                                                                                                //                        
                                                                                                            [verificaSMSProtocolo.getPath('Sucesso no SMS'), enviaSMSProtocoloSim],
                                                                                                                [enviaSMSProtocoloSim, perguntaQuerAlgoMais],
                                                                                                                //
                                                                                                [verificaSenhaUnica.getPath('Falha fluxo de senha'), respostaSenhaUnicaNao],
                                                                                                    [respostaSenhaUnicaNao, perguntaQuerAlgoMais],
                                                                                            
                                                                                            [verificaProprioAparelho.getPath('Ligando do próprio aparelho'), respostaRealizaAdesao],

                                                                        [verificaInputConfirmaAdesao.getPath('Input Válido'), verificaConfirmaAdesao],


                                    [verificaInputQuerAderir.getPath('Input Válido'), perguntaClienteQuerAderir],
                                        [perguntaClienteQuerAderir.getPath('Quer aderir'), respostaConfirmaAdesao],
                                        [perguntaClienteQuerAderir.getPath('Quer informações'), respostaInputMaisInfo],
                                        [perguntaClienteQuerAderir.getPath('Não quer este'), verificaTemOutraPromocao],





)


adesaoOferta.mapScenarios();
// adesaoOferta.showScenarios();
// adesaoOferta.inspectScenario(1);
adesaoOferta.getSummary();
adesaoOferta.exportScenariosToExcel();