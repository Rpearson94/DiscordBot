const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Connected as ' + client.user.tag);
});

client.on('ready', () => {
	// List servers the bot is connected to
	console.log('Servers:');
	client.guilds.forEach((guild) => {
		console.log(' - ' + guild.name);
	});
});

client.on('ready', () => {
	// List servers the bot is connected to
	console.log('Servers:');
	client.guilds.forEach((guild) => {
		console.log(' - ' + guild.name);

		// List all channels
		guild.channels.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
		});
	});
});

client.on('ready', () => {
	var generalChannel = client.channels.get('548340725759213590'); // Replace with known channel ID
	generalChannel.send('Hello, world!');
});

bot_secret_token = 'NTQ4MzQxMDU0MTEwNDMzMjkx.D1D6nw.NW2SFkmUYDMINI1RcGRDFlQSAj0';

client.login(bot_secret_token);
