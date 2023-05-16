const { Client, IntentsBitField} = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online...`);
});

client.on('messageCreate', (message) => {
    // prevents bot from replying to itself
    if (message.author.bot) {
        return;
    }

    console.log(message);
})

client.login(process.env.DISCORD_TOKEN);


