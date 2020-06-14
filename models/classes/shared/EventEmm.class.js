const shortid = require('shortid');

class EventEmitter {
    events = [];
    externalEvents = [];
    observersList = [];

    constructor(host) {
        this.host = host;
        this.id = host.id;
    };

    /**
     * Define um par 'eventName, callback' 
     * @param {*} eventName (String) Representa o nome do evento a ser emitido pelo metodo 'emitEvent'
     * @param {*} callback (String) Nome do método que será chamado neste host e nos host observers, caso disponível.
     */
    newEvent(eventName, callback) {
        if (typeof eventName == 'string' && typeof callback == 'string') {
            for (var i = 0; i < this.events.length; ++i) {
                if (this.events[i].slice(0, 2).toString() == [eventName, callback].toString()) {
                    return;
                }
            }
            this.events.push([eventName, callback, shortid.generate()]);
        }
        else {
            throw new Error(`Subject '${eventName}' or Callback '${callback}' não são Strings.`);
        }
        this.updateObserversExternalEvents();
    };
    /**
     * 
     * (Object) Método que percorre os 'events' deste objeto e compara com os 'events' e 'externalEvents' dos subscribers.
     * Caso haja algum 'event' próprio que não esteja em entre os dos subscribers, este é inserido. (Usada no método 'newEvent');
     */
    updateObserversExternalEvents() {
        let count = 0;
        let total = 0;

        for (let i = 0; i < this.events.length; i++) { // Loop para acessar os eventos originais deste observer.
            for (let j = 0; j < this.observersList.length; j++) { // Loop para acessar todos os observers inscritos.
                total = this.observersList[j].externalEvents.concat(this.observersList[j].events).length;  // Recupera a quantidade de events o observer inscrito da vez possui.
                let allObserverEvents = this.observersList[j].externalEvents.concat(this.observersList[j].events); // Recupera a lista de todos os eventos do observer inscrito (originais e externos).
                count = 0; // Zera o contador para iniciar a verificação
                for (let k = 0; k < allObserverEvents.length; k++) { // Loop para acessar os eventos do lista completa de eventos do observer inscrito da vez.
                    if (!(this.events[i][1] == allObserverEvents[k][1] && this.events[i][0] == allObserverEvents[k][0])
                        && count < total) { // Compara os evento original desta instancia com os do observer inscrito da vez.
                        count++; // Caso o evento desta instancia comparado seja diferente dos evento do observer inscrito, incrementa em count.
                        if (count == total) { // Caso o evento desta instancia não possua nenhum evento espelhado entre os eventos do observer inscrito
                            this.observersList[j].externalEvents.push(this.events[i]); // Pusha este evento para a lista de eventos externos do observer inscrito da vez.
                        }
                    } // o que funciona é esse 
                }
            }
        }
    };

    /**
     * 
     * @param {*} otherHostObject (Object) Host que contém uma instancia de EventEmitter que será usada para se inscrever neste observer,
     * e assim, escutar seus eventos.
     */
    subscribe(otherHostObject) {
        if (otherHostObject.observer) {
            otherHostObject.observer.observersList.push(this);
            this.updateNewSubscriberExternalEvents(otherHostObject);
        }
    };
    /**
     * 
     * @param {*} otherHostObject (Object) Host que contém uma instancia de EventEmitter que será atualizada com os events do EventEmitter
     * recém inscrito. (Usada no método 'subscribe');
     */
    updateNewSubscriberExternalEvents(otherHostObject) {
        for (const outSubject of otherHostObject.observer.events.concat(otherHostObject.observer.externalEvents)) {
            for (const insideSubject of this.events.concat(this.externalEvents)) {
                if (insideSubject.slice(0, 2).toString() != outSubject.slice(0, 2).toString()) {
                    this.externalEvents.push(outSubject);
                }
                break;
            }
        } //funcionando
    };

    /**
     * 
     * @param {*} eventName (String) Envia um evento para o host deste e de todos os observers que assinarem este objeto.
     * Este host e o dos observers deste objeto responderam a sua maneira caso possuam os respectivos metodos.
     */
    emitEvent(eventName) {
        let allEvents = this.events.concat(this.externalEvents);

        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i][0] == eventName && this.host[allEvents[i][1]] && typeof this.host[allEvents[i][1]] == 'function') {
                this.host[allEvents[i][1]]();
            }
        }

        if (this.observersList.length > 0) {
            for (const observer of this.observersList) {
                observer.emitEvent(eventName);
            }
        }
    }
};

module.exports = EventEmitter;

// class Personagem {
//     saudacao

//     constructor(apresentacao){
//         this.saudacao = apresentacao
//     }

//     incomingEvent(eventName) {
//         switch(eventName){
//             case 'apresentacao': this.seApresentar();
//         }
//     }

//     seApresentar() {
//         console.log(this.saudacao);
//     }
// }
// const goku = new Personagem("Oi, eu sou Goku!");
// const luffy = new Personagem("Meu nome é Luffy e eu serei o Rei dos Piratas!");
// const naruto = new Personagem("Eu sou Naruto Uzumaki da Aldeia da Folha. E eu vou ser Hokage! Tô certo!");

// let teste = new Subject();
// let teste1 = new Subject();
// let teste2 = new Subject();

// teste.newObserver(goku);
// teste1.newObserver(luffy);
// teste2.newObserver(naruto);

// teste1.subscribe(teste);
// teste2.subscribe(teste1);

// teste.emitEvent('apresentacao');