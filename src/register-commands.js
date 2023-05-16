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
        name: 'coin-flip',
        description: 'Flip a coin: Heads or Tails',
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
    },
    {
        name: 'roll',
        description: 'Rolls X-number sided dice',
        options: [
            {
                name: 'dice_type',
                description: 'Options for dice',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'd4',
                        value: 4
                    },
                    {
                        name: 'd6',
                        value: 6
                    },
                    {
                        name: 'd8',
                        value: 8
                    },
                    {
                        name: 'd10',
                        value: 10
                    },
                    {
                        name: 'd12',
                        value: 12
                    },
                    {
                        name: 'd20',
                        value: 20
                    },
                ],
            }
        ]
    },
    
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