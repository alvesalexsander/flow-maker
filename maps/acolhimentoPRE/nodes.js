const acolhimentoPre = require('./map');

const nodes = {
    startAcolhimentoPre: acolhimentoPre.newNode('starting', {
        name: 'Inicia fluxo de Acolhimento',
        expectedMessage: 'Chamada é encaminhada para a URA Cognitiva;'
    }),

    saudacaoURA: acolhimentoPre.newNode('node', {
        name: 'URA atende a ligação',
        expectedMessage: 'Ouvir a saudacão da URA Cognitiva conforme descrito na DF.'
    }),

    comoPossoAjudar: acolhimentoPre.newNode('node', {
        name: 'URA pergunta como pode ajudar',
        expectedMessage: 'URA Cognitiva pede para o cliente falar em poucas palavras sobre o que precisa de atendimento;'
    }),

    transfereParaATH: acolhimentoPre.newNode('node', {
        name: "URA Informa que vai tranferir para o ATH",
        stepMessage: "Encaminha para o ATH.",
        expectedMessage: 'URA Informa que vai tranferir para o ATH'

    }).turnTargetNode(),

    encerraLigacao: acolhimentoPre.newNode('node', {
        name: 'URA encerra a ligação',
        expectedMessage: 'URA informa que, como não conseguiu escutar, irá encerrar a ligação.'
    }).turnTargetNode(),

    viaDeAcesso: acolhimentoPre.newNode('node', {
        name: 'Desambiguadores que acionam o fluxo',
        stepMessage: 'Veio de #desambiguadoracolhimentoPre',
        expectedMessage: 'A URA Congnitiva informa que entendeu que deseja falar sobre Troca de Titularidade;'
    }),

    perguntaQuerAlgoMais: acolhimentoPre.newNode('switch', {
        name: 'Pergunta se o usuario quer algo mais',
        pathCases: ['Quer algo mais', 'Não quer mais nada']
    }),

    desambiguador: acolhimentoPre.newNode('node', {
        name: 'Usuário quer algo mais',
        expectedMessage: 'A URA Cognitiva transfere para o desambiguador.'
    }).turnTargetNode(),

    agradeceDesliga: acolhimentoPre.newNode('node', {
        name: 'URA agradece e desliga a ligação',
        expectedMessage: 'A URA Cognitiva agradece e encerra a ligação.'
    }).turnTargetNode(),

    verificaServicoProfile: acolhimentoPre.newNode('switch', {
        name: 'Sucesso ao consultar as informações do cliente?',
        pathCases: ['Sucesso no profile', 'Falha no profile']
    }),

// -------------------------------------------------- INICIO PRE TOP -------------------------------------------------------

    verificaPreTop: acolhimentoPre.newNode('switch', {
        name: 'Verifica se é cliente Pré Top',
        pathCases: ['É Pré Top', 'Não é Pré Top']
    }),

    verificaBeneficiosValidos: acolhimentoPre.newNode('switch', {
        name: 'Verifica se é cliente Pré Top',
        pathCases: ['Benefícios válidos', 'Benefícios expirados']
    }),

    respostaBeneficiosValidosNao: acolhimentoPre.newNode('node', {
        name: 'URA informa que os beneficios estão expirados e oferece recarga',
        expectedMessage: 'A URA Cognitiva informa que o cliente está na promoção Pré Top, porém, os benefícios estão expirados e pergunta se o usuário gostaria de fazer uma recarga.'
    }),

    verificaQuerFazerRecarga: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente quer fazer recarga',
        pathCases: ['Quer fazer recarga', 'Não quer fazer recarga']
    }),

    verificaQuerFazerRenovacao: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente quer fazer recarga',
        pathCases: ['Quer fazer renovação', 'Não quer fazer renovação']
    }),

    encaminhaFluxoRecarga: acolhimentoPre.newNode('node', {
        name: 'Usuário encaminhado para fluxo de Recarga de Saldo',
        expectedMessage: 'A URA Cognitiva transfere para o Fluxo de Recarga de Saldo.'
    }).turnTargetNode(),

    respostaQuerFazerRecargaNao: acolhimentoPre.newNode('node', {
        name: 'Usuário não quer fazer recarga',
    }),

    verificaPossuiSaldoRecarga: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente possui saldo para fazer uma recarga',
        pathCases: ['Possui saldo em conta', 'Não possui saldo em conta']
    }),

    respostaPossuiSaldoRecargaNao: acolhimentoPre.newNode('node', {
        name: 'Usuário não possui saldo para recarga',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Pré Top e a validade. Também informa que a franquia de dados já foi consumida e oferece uma recarga;'
    }),

    respostaPossuiSaldoRecargaSim: acolhimentoPre.newNode('node', {
        name: 'Usuário possui saldo para recarga',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Pré Top e a validade. Também informa que a franquia de dados já foi consumida e oferece uma recarga;'
    }),

// -------------------------------------------------- FIM PRE TOP -------------------------------------------------------
// -------------------------------------------------- INICIO PROMO DIARIA -------------------------------------------------------

    verificaPromocaoDiaria: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente é elegível a promoção diaria',
        pathCases: ['Elegível promoção diária', 'Não elegível promoção diária']
    }),

    verificaPacotesDadosContratadoNaData: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente contratou algum pacote de dados no dia',
        pathCases: ['Contratou pacote hoje', 'Não contratou pacote hoje']
    }),

    verificaConsumiuTodoPacote: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente consumiu todo o pacote',
        pathCases: ['Consumiu 100% do pacote', 'Não consumiu 100% do pacote']
    }),

    respostaConsumiuTodoPacoteNao: acolhimentoPre.newNode('node', {
        name: 'Usuário não consumiu todo o pacote de dados',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção diária e informa a quantidade de dados disponível;'
    }),

    verificaSaldoMinimoRenovar: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente possui saldo minimo para fazer uma renovação',
        pathCases: ['Possui saldo para renovar', 'Não possui saldo para renovar']
    }),

    respostaSaldoMinimoRenovarSim: acolhimentoPre.newNode('node', {
        name: 'Usuário possui saldo minimo para renovar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção diária, quanto de saldo o usuário possui e sua validade. Também oferece a renovação do pacote diário;'
    }),

    verificaConfirmaRenovar: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente quer renovar o promoção diária',
        pathCases: ['Quer renovar', 'Não quer renovar']
    }),

    encaminhaFluxoRenovacao: acolhimentoPre.newNode('node', {
        name: 'Usuário encaminhado para o fluxo de Renovação',
        expectedMessage: 'A URA Cognitiva transfere para o Fluxo de Renovação;'
    }).turnTargetNode(),

    encaminhaFluxoContratacao: acolhimentoPre.newNode('node', {
        name: 'Usuário encaminhado para o fluxo de Contratacao de Pacote',
        expectedMessage: 'A URA Cognitiva transfere para o Fluxo de Contratacao de Pacote;'
    }).turnTargetNode(),

    respostaSaldoMinimoRenovarNão: acolhimentoPre.newNode('node', {
        name: 'Usuário não possui saldo minimo para renovar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção diária, quanto de saldo o usuário possui e sua validade. Também oferece uma recarga;'
    }),

    verificaConfirmaRecargaRenovar: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente possui saldo para contratar a promoção diaria',
        pathCases: ['Quer fazer recarga', 'Não quer fazer recarga']
    }),

    verificaSaldoMinimoContratar: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente possui saldo para contratar a promoção diaria',
        pathCases: ['Possui saldo para contratar', 'Não Possui saldo para contratar']
    }),

    respostaSaldoMinimoContratarSim: acolhimentoPre.newNode('node', {
        name: 'Usuário possui saldo minimo para renovar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção diária, quanto de saldo o usuário possui e sua validade. Também fornece instruções sobre como utilizar o pacote;'
    }),

    respostaSaldoMinimoContratarNão: acolhimentoPre.newNode('node', {
        name: 'Usuário não possui saldo minimo para renovar',
        expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção diária e informa que o saldo expirou. Também oferece uma recarga;'
    }),
// -------------------------------------------------- FIM PROMO DIARIA -------------------------------------------------------
// -------------------------------------------------- INICIO BETA -------------------------------------------------------

    verificaBeta: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente é Beta',
        pathCases: ['Cliente é Beta', 'Cliente não é Beta']
    }),

    verificaBeneficiosValidosBeta: acolhimentoPre.newNode('switch', {
        name: 'Verifica se os beneficios são validos',
        pathCases: ['Benefícios válidos', 'Benefícios expirados']
    }),

        verificaSaldoMinimoRenovarBeta: acolhimentoPre.newNode('switch', {
            name: 'Verifica se o cliente possui saldo minimo para renovar',
            pathCases: ['Possui saldo mínimo', 'Não possui saldo mínimo']
        }),

            respostaSaldoMinimoRenovarBetaSim: acolhimentoPre.newNode('node', {
                name: 'Usuário possui saldo minimo para renovar Beta',
                expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Beta e que possui saldo para renovar seus benefícios. Oferece renovação antecipada;'
            }),

            verificaQuerRenovacaoAntecipada: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente quer renovacao antecipada dos beneficios',
                pathCases: ['Quer renovação antecipada', 'Não quer renovação antecipada']
            }),

            respostaSaldoMinimoRenovarBetaNao: acolhimentoPre.newNode('node', {
                name: 'Usuário não possui saldo minimo para renovar Beta',
                expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Beta mas não possui saldo para renovar. Oferece recarga de saldo;'
            }),

        verificaConsumiuPacote: acolhimentoPre.newNode('switch', {
            name: 'Verifica se o cliente consumiu todo o pacote',
            pathCases: ['Pacote 100% consumido', 'Pacote disponível']
        }),

            verificaPossuiBonus: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente possui bônus',
                pathCases: ['Possui bônus', 'Não possui bônus']
            }),

                respostaPossuiBonusNao: acolhimentoPre.newNode('node', {
                    name: 'Usuário não possui bônus',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Beta, a validade da promoção e a quantidade de dados disponíveis;'
                }),

                respostaPossuiBonusSim: acolhimentoPre.newNode('node', {
                    name: 'Usuário possui bônus',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Beta, a validade da promoção, quantidade de dados disponíveis e quantidade de bônus;'
                }),

            verificaSaldoRenovarBeta: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente possui saldo para renovar Beta',
                pathCases: ['Possui saldo(renovar)', 'Não possui saldo(renovar)']
            }),

                respostaSaldoRenovarBeta:  acolhimentoPre.newNode('switch', {
                    name: 'Verifica se o cliente quer contratar um novo pacote, renovar ou renovar os beneficios da sua promoção',
                    pathCases: ['Quer contratar novo pacote', 'Quer renovar', 'Nenhuma das opções']
                }),

            verificaSaldoContratarBeta: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente possui saldo para renovar Beta',
                pathCases: ['Possui saldo(contratar)', 'Não possui saldo(contratar)']
            }),

                respostaSaldoContratarBetaSim:  acolhimentoPre.newNode('switch', {
                    name: 'Verifica se o cliente quer contratar um novo pacote, renovar ou renovar os beneficios da sua promoção',
                    pathCases: ['Quer contratar novo pacote', 'Não quer contratar']
                }),

                respostaSaldoContratarBetaNao: acolhimentoPre.newNode('node', {
                    name: 'Usuário não possui saldo para contratar beta',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Beta, a validade da promoção, porém, não possui saldo para navegar. Oferece recarga;'
                }),
// -------------------------------------------------- FIM BETA -------------------------------------------------------
// -------------------------------------------------- INICIO SMART -------------------------------------------------------

    verificaSmart: acolhimentoPre.newNode('switch', {
        name: 'Verifica se o cliente é SMART',
        pathCases: ['Cliente é SMART', 'Cliente não é SMART']
    }),

    verificaBeneficiosValidosSmart: acolhimentoPre.newNode('switch', {
        name: 'Verifica se os beneficios são validos',
        pathCases: ['Benefícios válidos', 'Benefícios expirados']
    }),

        verificaSaldoMinimoRenovarSmart: acolhimentoPre.newNode('switch', {
            name: 'Verifica se o cliente possui saldo minimo para renovar',
            pathCases: ['Possui saldo mínimo', 'Não possui saldo mínimo']
        }),

            respostaSaldoMinimoRenovarSmartSim: acolhimentoPre.newNode('node', {
                name: 'Usuário possui saldo minimo para renovar Smart',
                expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Smart e que possui saldo para renovar seus benefícios. Oferece renovação antecipada;'
            }),

            verificaQuerRenovacaoAntecipada: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente quer renovacao antecipada dos beneficios',
                pathCases: ['Quer renovação antecipada', 'Não quer renovação antecipada']
            }),

            respostaSaldoMinimoRenovarSmartNao: acolhimentoPre.newNode('node', {
                name: 'Usuário não possui saldo minimo para renovar Smart',
                expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Smart mas não possui saldo para renovar. Oferece recarga de saldo;'
            }),

        verificaConsumiuPacote: acolhimentoPre.newNode('switch', {
            name: 'Verifica se o cliente consumiu todo o pacote',
            pathCases: ['Pacote 100% consumido', 'Pacote disponível']
        }),

            verificaPossuiBonus: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente possui bônus',
                pathCases: ['Possui bônus', 'Não possui bônus']
            }),

                respostaPossuiBonusNao: acolhimentoPre.newNode('node', {
                    name: 'Usuário não possui bônus',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Smart, a validade da promoção e a quantidade de dados disponíveis;'
                }),

                respostaPossuiBonusSim: acolhimentoPre.newNode('node', {
                    name: 'Usuário possui bônus',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Smart, a validade da promoção, quantidade de dados disponíveis e quantidade de bônus;'
                }),

            verificaSaldoRenovarSmart: acolhimentoPre.newNode('switch', {
                name: 'Verifica se o cliente possui saldo para renovar Smart',
                pathCases: ['Possui saldo(renovar)', 'Não possui saldo(renovar)']
            }),

                respostaSaldoRenovarSmart:  acolhimentoPre.newNode('switch', {
                    name: 'Verifica se o cliente quer contratar um novo pacote, renovar ou renovar os beneficios da sua promoção',
                    pathCases: ['Quer contratar novo pacote', 'Quer renovar', 'Nenhuma das opções']
                }),

                respostaSaldoRenovarSmartNao: acolhimentoPre.newNode('node', {
                    name: 'Usuário possui bônus',
                    expectedMessage: 'A URA Cognitiva informa que o usuário está na promoção Smart, a validade da promoção;'
                }),

// -------------------------------------------------- FIM SMART -------------------------------------------------------
// -------------------------------------------------- PARTE DO INPUT DO USUARIO -------------------------------------------------------

    verificaInputUsuario: acolhimentoPre.newNode('switch', {
        name: 'Verifica o input do usuário',
        pathCases: [
            'Intenção conhecida', 
            'Inteção não tratada', 
            'Nenhum input', 
            'Falha de reconhecimento', 
            'Input DTMF',
            'Input ATH'
        ]
    }),

    verificaInputUsuario2Tentativa: acolhimentoPre.newNode('switch', {
        name: 'Verifica o input do usuário',
        pathCases: [
            'Intenção conhecida (2ª tentativa)', 
            'Inteção não tratada (2ª tentativa)', 
            'Nenhum input (2ª tentativa)', 
            'Falha de reconhecimento (2ª tentativa)', 
            'Input DTMF (2ª tentativa)']
    }),

    verificaInputUsuario3Tentativa: acolhimentoPre.newNode('switch', {
        name: 'Verifica o input do usuário',
        pathCases: [
            'Intenção conhecida (3ª tentativa)', 
            'Inteção não tratada (3ª tentativa)', 
            'Nenhum input (3ª tentativa)', 
            'Falha de reconhecimento (3ª tentativa)', 
            'Input DTMF (3ª tentativa)']
    }),

    verificaInputATHInsistencia: acolhimentoPre.newNode('switch', {
        name: 'Verifica o input do usuário',
        pathCases: [
            'Insistencia ATH', 
            'Outro desambiguador conhecido',
            'Outro desambiguador desconhecido'
        ]
    }),

    respostaInputATHInsistenciaOutroConhecido: acolhimentoPre.newNode('node', {
        name: 'Quer outro desambiguador conhecido',
        expectedMessage: 'A URA Cognitiva transfere para o fluxo do desambiguador conhecido;'
    }),

    respostaInputATHInsistenciaOutroDesconhecido: acolhimentoPre.newNode('node', {
        name: 'Quer outro desambiguador desconhecido',
        expectedMessage: 'A URA Cognitiva transfere para o ATH;'
    }),
};

// console.log(Object.keys(nodes))
// console.log(`Número de nodes: ${Object.keys(nodes).length}`)

module.exports = nodes;