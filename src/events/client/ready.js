import Command from "../../structures/Command.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'ready',
        })
    }

    run = async () => {
        await this.client.registryCommands()
    }
}