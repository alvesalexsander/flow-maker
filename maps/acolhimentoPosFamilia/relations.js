const acolhimento = require('./map');

const { 
    startAcolhimento,
    saudacaoURA,
    validaInputUsuario,
    respostasInputInvalido,
    respostasInputValido,
    validaInputUsuario2,
    transfereParaATH,
    encerraLigacao,
    noInputEncerraLigacao,
    encaminhaFluxo,
    intencaoATH,
    inputATH
} = require('./nodes');

acolhimento.linkNext(startAcolhimento.id, saudacaoURA.id);
acolhimento.linkNext(saudacaoURA.id, validaInputUsuario.id);
acolhimento.linkNext(validaInputUsuario.getPath('Não').id, respostasInputInvalido.id);
// Path validaInputUsuario 'Input não válido'
    acolhimento.linkNext(
        respostasInputInvalido.getPath('Input DTMF - URA pede para usuário vocalizar, não digitar').id, 
        validaInputUsuario2.id
    );
    acolhimento.linkNext(
        respostasInputInvalido.getPath('Ruído - URA pede para o usuário desativar o vivavoz').id, 
        validaInputUsuario2.id
    );
    acolhimento.linkNext(
        respostasInputInvalido.getPath('No Input - URA informa que não entendeu e pede para repetir').id, 
        validaInputUsuario2.id
    );
    acolhimento.linkNext(
        validaInputUsuario2.getPath('Não').id, 
        noInputEncerraLigacao.id
    );
    acolhimento.linkNext(
        validaInputUsuario2.getPath('Sim').id, 
        intencaoATH.id
    );
// Path validaInputUsuario 'Input válido'
acolhimento.linkNext(validaInputUsuario.getPath('Sim').id, intencaoATH.id);
acolhimento.linkNext(intencaoATH.getPath('Sim').id, inputATH.id);
acolhimento.linkNext(intencaoATH.getPath('Não').id, respostasInputValido.id);
// Path inputATH
acolhimento.linkNext(inputATH.getPath('Sim').id, transfereParaATH.id
);
acolhimento.linkNext(inputATH.getPath('Não').id, respostasInputValido.id
);

// Path respostasInputValido
acolhimento.linkNext(respostasInputValido.getPath('Sim').id, encaminhaFluxo.id
);
acolhimento.linkNext(respostasInputValido.getPath('Não').id, transfereParaATH.id
);


acolhimento.mapScenarios();
acolhimento.showScenarios();