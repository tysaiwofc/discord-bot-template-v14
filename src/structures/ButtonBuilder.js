import { ButtonBuilder } from "discord.js"

export default class Button {
    constructor(client, options) {
        this.id = options.id
        this.client = client
        this.interaction = options.interaction
        this.user = options.user
        this.data = options.data
        this.reason = options.reason
    }

    view() {

        this.client.componentUsers.set(this.interaction.id, {
            user: this.user.id,
            customId: this.id,
            component: this
        })

        setTimeout(() => {
            this.client.componentUsers.delete(this.interaction.id)
        }, 60000 * 20)

        return new ButtonBuilder(this.data)
    }
}