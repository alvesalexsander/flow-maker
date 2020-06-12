class Subject {
    observers = [];

    newObserver(object) {
        this.observers.push(object);
    }

    subscribe(object) {
        if (object.constructor == this.constructor){
            object.newObserver(this);
        }
    }

    sendEvent(eventName) {
        for (const observer of this.observers) {
            if (observer.constructor == this.constructor){
                observer.sendEvent(eventName);
                return;
            }
            observer.incomingEvent(eventName);
        }
    }
}

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

// teste.sendEvent('apresentacao');