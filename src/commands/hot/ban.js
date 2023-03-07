import { ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ButtonBuilder from "../../structures/ButtonBuilder.js";
import Command from "../../structures/Command.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: "Banir usuário",
            default_member_permissions: [PermissionFlagsBits.BanMembers],
            nsfw: false,
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "usuário para banir",
                    required: true
                },
                {
                    type: 3,
                    name: "reason",
                    description: "motivo do banimento",
                    required: false
                }
            ],
            ephemeral: false,
        })
    }

    run = async (interaction) => {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const verify_ban = await interaction.guild.bans.fetch(user.id).catch(() => {})
        if(verify_ban) return interaction.reply({ content: "Esse usuário já está banido!", ephemeral: true})
        if(user.id === interaction.client.user.id) return interaction.reply({ content: "Você não pode me banir!",ephemeral: true})
        if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode banir a si mesmo!", ephemeral: true})
        if(user.id === interaction.guild.ownerId) return interaction.reply({ content: "Você não pode banir o dono do servidor", ephemeral: true})
        if (user?.roles?.highest?.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: `Você não pode banir usuários com cargos maiores que o seu!`, ephemeral: true})
        if (interaction.guild.members.me.roles.highest.position <= user?.roles?.highest?.position) return interaction.reply({ content: `Eu não tenho permissão para banir esse usuário, pois o meu cargo é melhor que o dele!`, ephemeral: true })

        const btn = new ButtonBuilder(this.client, {
            reason: reason,
            user: user,
            interaction: interaction,
            data: {
                custom_id: `test-${interaction.id}`,
                style: ButtonStyle.Primary,
                label: 'Confirmar'
            }
        }).view()

        const row = new ActionRowBuilder().addComponents(btn)
        const embed = new EmbedBuilder().setTitle("Sistema de Punições - Tysaiw").setDescription(`${interaction.user} Você confima a punição para ${user} com o motivo \`${reason ? reason : 'Sem motivo'}\` ?`).setColor('Blurple')

        interaction.reply({ embeds: [embed], components: [row] })
    }
}