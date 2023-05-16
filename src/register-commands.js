const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'bing',
        description: 'Replies with Bing.',
    },
    {
        name: 'bong',
        description: 'Replies with Bing.',
    },
    {
        name: 'roll20',
        description: 'Generate a random number from 1-20.',
    },
    {
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    }
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );

        console.log('Slash commands were registered successfully...')
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();