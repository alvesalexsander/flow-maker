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
    encaminhaFluxo
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
        respostasInputValido.id
    );
// Path validaInputUsuario 'Input válido'

acolhimento.linkNext(validaInputUsuario.getPath('Sim').id, respostasInputValido.id);

// Path respostasInputValido


acolhimento.linkNext(
    respostasInputValido.getPath('Sim').id,
    encaminhaFluxo.id
);


acolhimento.linkNext(
    respostasInputValido.getPath('Não').id,
    transfereParaATH.id
);

acolhimento.mapScenarios();
acolhimento.showScenarios();