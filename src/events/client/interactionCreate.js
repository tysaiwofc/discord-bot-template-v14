import Command from "../../structures/Command.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'interactionCreate',
        })
    }

    run = async (interaction) => {
        if(interaction.type === 3) {
            console.log(interaction.customId)
            const component = this.client.components.find(cmp => cmp.id === interaction.customId.slice(0, 5))
            if(component) {
                try {
                    component.run(interaction)
                } catch (er) {
                    interaction.reply({ content: "<:a_atencao_:1059162945709428757> | Aconteceu algo errado ao executar está interação!", ephemeral: true })
                    this.client.log.warn('INTERACTION', er.message)
                }
            }
        } else {
            const cmd = this.client.commands.find(command => command.name === interaction.commandName)

        if(cmd) {
            try {
                cmd.run(interaction)
            } catch (er) {
                interaction.reply({ content: "<:a_atencao_:1059162945709428757> | Aconteceu algo errado ao executar está interação!", ephemeral: true })
                this.client.log.warn('INTERACTION', er.message)
            }
        }
        }
        
    }
}