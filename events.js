const EventEmitter = require('events');

const Emitter = new EventEmitter();

Emitter.on("new event",() => {
    console.log("hello");
})
Emitter.on("new event",() => {
    console.log("yo yo yo");
})
Emitter.on("new event",() => {
    console.log(``);
})

Emitter.emit("new event",1,2,3);