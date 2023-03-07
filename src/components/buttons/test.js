import { EmbedBuilder } from "discord.js";
import Button from "../../structures/Button.js";

export default class extends Button {
    constructor(client) {
        super(client, {
            id: 'test-',
        })
    }

    run = async (interaction) => {
        const ver = this.client.componentUsers.get(interaction.message.interaction.id)

        if(!ver) return interaction.reply({ content: "Essa interação já expirou!", ephemeral: true})
        if(ver && ver.component.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "Ei Ei Ei!! Sai daqui! Isto não é para você!", ephemeral: true})

        try{
            interaction.guild.members.ban(ver.component.user.id, {
                days: 7,
                reason: ver.component.reason ? ver.component.reason : 'Sistema de punições - Tysaiw'
            }).then(() => {
                const embed = new EmbedBuilder().setTitle("Sistema de Punições - Tysaiw").setDescription(`${interaction.user} o usuário ${ver.component.user.username}#${ver.component.user.discriminator} foi banido com sucesso!\n\n**Motivo:**\n\`${ver.component.reason}\``).setColor('Green')
                interaction.update({ embeds: [embed], components: []})
            })
            
        } catch(er) {
                const embed_err = new EmbedBuilder().setTitle("Sistema de Punições - Tysaiw").setDescription(`Ocorreu um erro ao tentar banir o usuário!`).setColor('Red')
                interaction.update({ embeds: [embed_err], components: []})
        }
        
    }
}