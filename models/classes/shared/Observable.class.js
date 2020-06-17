// const shortid = require('shortid');

class observable {
    events = [];
    externalEvents = [];
    observersList = [];

    constructor() { };

    /**
     * 
     * @param {*} observer (Object) Host que contém uma instancia de EventEmitter que será usada para se inscrever neste observer,
     * e assim, escutar seus eventos.
     */
    subscribe(observer) {
        this.observersList.push(observer);
    };

    unsubscribe(observer) {
        this.observers = this.observersList.filter(subscriber => subscriber !== observer);
    }

    notify(data) {
        this.observersList.forEach(observer => observer(data));
    }
}

module.exports = observable;