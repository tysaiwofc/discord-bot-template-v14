import { Client, Collection } from "discord.js";
import { URL } from 'url';
import Debugger from "./Debugger.js";
import { readdirSync } from 'fs'
const __dirname = new URL('../../', import.meta.url).pathname;

export default class Pietro extends Client {
    constructor(options) {
        super(options);

        this.commands = new Array()
        this.components = new Array()
        this.events = new Array()
        this.log = new Debugger()
        this.componentUsers = new Collection()
        this.#loadCommands()
        this.#loadEvents()
        this.#loadComponents()
    }

    async registryCommands() {
        await this.application.commands.set(this.commands)
        this.log.log('INTERACTION', 'Comandos registrados com sucesso!')
    }

    async #loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)
        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)
            for (const command of commands) {
                const commandClass = await import(`${__dirname}/src/commands/${category}/${command}`)
                const cmd = new (commandClass.default)(this)
                this.commands.push(cmd)
            }
        }

        this.log.log('LOADER', 'Comandos foram carregados')
    }

    async #loadEvents(path = 'src/events') {
        const categories = readdirSync(path)
        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)
            for (const command of commands) {
                const commandClass = await import(`${__dirname}/src/events/${category}/${command}`)
                const cmd = new (commandClass.default)(this)
                
                this.on(cmd.name, cmd.run)
            }
        }

        this.log.log('LOADER', 'Eventos foram carregados')
    }

    async #loadComponents(path = 'src/components') {
        const categories = readdirSync(path)
        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)
            for (const command of commands) {
                const commandClass = await import(`${__dirname}/src/components/${category}/${command}`)
                const cmd = new (commandClass.default)(this)
                
                this.components.push(cmd)
            }
        }

        this.log.log('LOADER', 'Components foram carregados')
    }
}