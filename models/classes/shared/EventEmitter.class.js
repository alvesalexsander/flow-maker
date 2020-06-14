const shortid = require('shortid');

class EventEmitter {
    events = [];
    externalEvents = [];
    observersList = [];

    constructor(host) {
        this.host = host;
    };

    /**
     * Define um par '
     * @param {*} subject (String) Representa o nome do evento a ser emitido pelo metodo 'emitEvent'
     * @param {*} callback (String) Nome do método que será chamado neste host e nos host observers, caso disponível.
     */
    newEvent(eventName, callback) {
        if (typeof eventName == 'string' && typeof callback == 'string') {
            for (const subject of this.events) {
                if (subject.slice(0, 2).toString() == [eventName, callback].toString()) {
                    // console.log('igual');
                    return;
                }
            }
            // console.log("unico");
            this.events.push([eventName, callback, shortid.generate()]);
        }
        else {
            throw new Error(`Subject '${eventName}' or Callback '${callback}' não são Strings.`);
        }
        this.updateObserversExternalSubjects();
    };

    /**
     * 
     * @param {*} otherHostObject (Object) Host que contém uma instancia de EventEmitter que será usada para se inscrever neste observer,
     * e assim, escutar seus eventos.
     */
    subscribe(otherHostObject) {
        if (otherHostObject.observer) {
            otherHostObject.observer.observersList.push(this);
            this.updateNewSubscriberExternalSubjects(otherHostObject);
        }
    };

    /**
     * 
     * @param {*} otherHostObject (Object) Host que contém uma instancia de EventEmitter que será atualizada com os events do EventEmitter
     * recém inscrito. (Usada no método 'subscribe');
     */
    updateNewSubscriberExternalSubjects(otherHostObject) {
        // for (const outSubject of otherHostObject.observer.events.concat(this.externalEvents)) {
        //     for (const insideSubject of this.events.concat(this.externalEvents)) {
        //         if (insideSubject.toString() != outSubject.toString()) {
        //             this.externalEvents.push(outSubject);
        //         }
        //         break;
        //     }
        // } //funcionando

        for (const outSubject of otherHostObject.observer.events.concat(this.externalEvents)) {
            for (const insideSubject of this.events.concat(this.externalEvents)) {
                if (insideSubject[2] != outSubject[2]) {
                    this.externalEvents.push(outSubject);
                }
                break;
            }
        }
    };

    /**
     * 
     * (Object) Método que percorre os 'events' deste objeto e compara com os 'events' dos subscribers.
     * Caso haja algum 'subject' próprio que não esteja em 'externalSubject' dos subscribers, este é inserido. (Usada no método 'newSubject');
     */
    updateObserversExternalSubjects() {
        let count = 0;
        let total = 0;
        for (const insideSubject of this.events) {
            for (const observer of this.observersList) {
                total = observer.externalEvents.concat(observer.events).length;
                // console.log('total ', total);
                count = 0;
                for (const outsideSubject of observer.externalEvents.concat(observer.events)) {
                    // console.log(`comparando ${insideSubject}`);
                    // console.log(`com ${outsideSubject} de ${observer.host.id}`);
                    // console.log(insideSubject.toString() == outsideSubject.toString());

                    if (!(insideSubject[2] == outsideSubject[2]) && count < total) {
                        count++;
                        // console.log(count);
                        if (count == total) {
                            observer.externalEvents.push(insideSubject);
                        }
                    } // o que funciona é esse 
                }
            }

        }
    };

    /**
     * 
     * @param {*} eventName (String) Envia um evento para o host deste e de todos os observers que assinarem este objeto.
     * Este host e o dos observers deste objeto responderam a sua maneira caso possuam os respectivos metodos.
     */
    emitEvent(eventName) {
        for (const subject of this.events) {
            if (subject[0] == eventName && this.host[subject[1]] && typeof this.host[subject[1]] == 'function') {
                this.host[subject[1]]();
            }
        }
        for (const subject of this.externalEvents) {
            if (subject[0] == eventName && this.host[subject[1]] && typeof this.host[subject[1]] == 'function') {
                this.host[subject[1]]();
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