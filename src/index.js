require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');
const { createAudioResource, joinVoiceChannel, NoSubscriberBehavior, VoiceConnectionStatus } = require('@discordjs/voice');
const scdl = require('soundcloud-downloader');
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
        const site_type = interaction.options.get('site').value;

        let siteName = '';
        let siteURL = '';

        switch (site_type) {
            case 'animesuge':
                siteName = 'AnimeSuge',
                siteURL = 'https://animesuge.to/home'
                break;
            
            case 'zoro':
                siteName = 'Zoro.to',
                siteURL = 'https://zoro.to/home'
                break;

            case 'showboxmovies':
                siteName = 'ShowBoxMovies'
                siteURL = 'https://www.showboxmovies.net/'
                break;
            
            case '123chill':
                siteName = '123Chill.to',
                siteURL = 'https://123chill.to/'
                break;

            case 'showboxmovies_tv':
                siteName = 'ShowBoxMovies TV',
                siteURL = 'https://www.showboxmovies.net/tv-show'
                break;
        };

        await interaction.reply(`${siteName}: ${siteURL}`);

        siteName = ''
        siteURL = ''
    };

})

client.login(process.env.DISCORD_TOKEN);


