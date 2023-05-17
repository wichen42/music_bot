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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'bing') {
        await interaction.reply('BING')
    };

    if (interaction.commandName === 'bong') {
        await interaction.reply('BONG')
    };

    if (interaction.commandName === 'coin-flip') {
        const flipped_value = random.integer(1,100);

        if (flipped_value < 51) {
            await interaction.reply("Heads");
        } else {
            await interaction.reply("Tails");
        }
    };


    if (interaction.commandName === 'roll') {
        const dice_type = interaction.options.get('dice_type').value;
        await interaction.reply(`You picked up a d${dice_type} and rolled: ${random.integer(1,dice_type)}`);
    };

    if (interaction.commandName === 'streaming-sites') {
        const category = interaction.options.getString('site');
    
        if (!category) {
          await interaction.reply('Please select a category.');
          return;
        }
    
        let siteName = '';
        let siteLink = '';
    
        switch (category) {
          case 'animesuge':
            const animeSite = interaction.options.getString('animesuge');
            if (animeSite === 'animesuge') {
              siteName = 'AnimeSuge';
              siteLink = 'https://animesuge.to/home';
            } else if (animeSite === 'zoro') {
              siteName = 'Zoro.to';
              siteLink = 'https://zoro.to/home';
            } else {
              await interaction.reply('Invalid anime streaming site option');
              return;
            }
            break;
    
          case 'zoro':
            const Site = interaction.options.getString('zoro');
            if (ite === 'showboxmovies') {
              siteName = 'ShowboxMovies';
              siteLink = 'https://showboxmovies.net/';
            } else if (movieSite === '123chill') {
              siteName = '123Chill';
              siteLink = 'https://123chill.to/';
            } else {
              await interaction.reply('Invalid movie streaming site option');
              return;
            }
            break;
    
          case 'tv':
            const tvSite = interaction.options.getString('showboxmovies_tv');
            if (tvSite === 'showboxmovies_tv') {
              siteName = 'ShowboxMovies (TV)';
              siteLink = 'https://showboxmovies.net/tv/';
            } else {
              await interaction.reply('Invalid TV streaming site option');
              return;
            }
            break;
    
          default:
            await interaction.reply('Invalid category');
            return;
        }
    
        await interaction.reply(`Here is the link to ${siteName}: ${siteLink}`);
      }

})

client.login(process.env.DISCORD_TOKEN);


