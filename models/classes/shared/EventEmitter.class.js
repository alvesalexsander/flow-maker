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

        for (let i = 0; i < this.events.length; i++) { // Loop para acessar os eventos originais deste eventEmitter.
            for (let j = 0; j < this.observersList.length; j++) {
                if (this.observersList[j].host.get(this.events[i][1])) {
                    // Loop para acessar todos os observers inscritos.
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
                        }
                    }

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
        console.log('tentando se inscrever')
        if (otherHostObject.eventEmitter) {
            otherHostObject.eventEmitter.observersList.push(this);
            this.updateNewSubscriberExternalEvents(otherHostObject);
        }
    };
    /**
     * 
     * @param {*} otherHostObject (Object) Host que contém uma instancia de EventEmitter que será atualizada com os events do EventEmitter
     * recém inscrito. (Usada no método 'subscribe');
     */
    updateNewSubscriberExternalEvents(otherHostObject) {
        for (const outsideEvent of otherHostObject.eventEmitter.events.concat(otherHostObject.eventEmitter.externalEvents)) {
            for (const insideEvent of this.events.concat(this.externalEvents)) {
                // console.log(outsideEvent[1]);
                // console.log(typeof this.host[outsideEvent[1]] == 'function');
                if (this.host.get(outsideEvent[1])) {
                    
                    console.log('possui metodo ', this.host[outsideEvent[1]])
                    if (insideEvent.slice(0, 2).toString() != outsideEvent.slice(0, 2).toString()) {
                        this.externalEvents.push(outsideEvent);
                    }
                    break;
                }
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
            for (const eventEmitter of this.observersList) {
                eventEmitter.emitEvent(eventName);
            }
        }
    }
};

module.exports = EventEmitter;