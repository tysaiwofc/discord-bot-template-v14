import Pietro from './structures/Client.js'
import { IntentsBitField } from 'discord.js'
import { config } from 'dotenv'
config()

const client = new Pietro({
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages
    ]
})

client.login(process.env.TOKEN).then(() => {
    client.log.log('LOGIN', `Bot logado com sucesso - ${client.user.tag}`)
})

