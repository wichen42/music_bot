require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');
const { Random } = require("random-js");

const random = new Random();

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
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'bing') {
        interaction.reply('BING')
    };

    if (interaction.commandName === 'bong') {
        interaction.reply('BONG')
    };

    if (interaction.commandName === 'coin-flip') {
        const flipped_value = random.integer(1,100);

        if (flipped_value < 51) {
            interaction.reply("Heads");
        } else {
            interaction.reply("Tails");
        }
    };

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`The sum is: ${num1 + num2}`);
    };

    if (interaction.commandName === 'roll') {
        const dice_type = interaction.options.get('dice_type').value;
        interaction.reply(`You picked up a d${dice_type} and rolled: ${random.integer(1,dice_type)}`);
    };

})

client.login(process.env.DISCORD_TOKEN);


