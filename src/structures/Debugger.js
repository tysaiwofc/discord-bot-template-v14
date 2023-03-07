import c from 'colors'

export default class Debugger {
    constructor() {
        this.date = new Date()
    }
    log(type, log) {
        console.log(c.blue(`[ ${this.date.getHours()}:${this.date.getMinutes()} ] (${type}) - ${log}`))
    }

    warn(type, log) {
        console.warn(c.red(`[ ${this.date.getHours()}:${this.date.getMinutes()} ] (${type}) - ${log}`))
    }
}