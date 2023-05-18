const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'bing',
        description: 'Replies with Bing',
    },
    {
        name: 'bong',
        description: 'Replies with Bing',
    },
    {
        name: 'coin-flip',
        description: 'Flip a coin: Heads or Tails',
    },
    {
        name: 'sc',
        description: 'Play music from SoundCloud',
        options: [
            {
                name: 'song-title',
                description: 'Title of song',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'song-author',
                description: 'Author of song',
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    {
        name: 'streaming-sites',
        description: 'Links to currently used streaming sites',
        options: [
          {
            name: 'site',
            description: 'Select a streaming site',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
              {
                name: 'animesuge',
                value: 'animesuge'
              },
              {
                name: 'zoro',
                value: 'zoro'
              },
              {
                name: 'showboxmovies',
                value: 'showboxmovies'
              },
              {
                name: '123chill',
                value: '123chill'
              },
              {
                name: 'showboxmovies_tv',
                value: 'showboxmovies_tv'
              }
            ]
          }
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