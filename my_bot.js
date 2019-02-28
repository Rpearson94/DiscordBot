const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const prefix = process.env.PREFIX;

client.on('ready', () => {
	console.log('Connected as ' + client.user.tag);
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

client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) {
		// Prevent bot from responding to its own messages
		return;
	}

	if (receivedMessage.content.startsWith('!')) {
		processCommand(receivedMessage);
	}
});

function processCommand(receivedMessage) {
	let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
	let splitCommand = fullCommand.split(' '); // Split the message up in to pieces for each space
	let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
	let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

	console.log('Command received: ' + primaryCommand);
	console.log('Arguments: ' + arguments); // There may not be any arguments

	if (primaryCommand == 'help') {
		helpCommand(arguments, receivedMessage);
	} else if (primaryCommand == 'multiply') {
		multiplyCommand(arguments, receivedMessage);
	} else if (primaryCommand == 'date') {
		dateCommand(receivedMessage);
	} else {
		receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`");
	}
}

function dateCommand(receivedMessage) {
	var d = new Date();
	receivedMessage.channel.send('The current date is: ' + d.getMonth() + ' ' + d.getDay() + ' ' + d.getFullYear());
}

function helpCommand(arguments, receivedMessage) {
	if (arguments.length > 0) {
		receivedMessage.channel.send('It looks like you might need help with ' + arguments);
		return;
	} else {
		receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`");
		return;
	}
}

function multiplyCommand(arguments, receivedMessage) {
	if (arguments.length < 2) {
		receivedMessage.channel.send('Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`');
		return;
	}
	let product = 1;
	arguments.forEach((value) => {
		product = product * parseFloat(value);
	});
	receivedMessage.channel.send('The product of ' + arguments + ' multiplied together is: ' + product.toString());
}

client.login();
