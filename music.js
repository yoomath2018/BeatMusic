const Discord = require('discord.js');
const client = new Discord.Client();
const active = new Map();
const prefix = '>';
const ownerID = '';
require('dotenv').config();

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();
	
	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;
	try {
		let ops = {
			ownerID: ownerID,
			active: active,
		}
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, message, args, ops);
	} catch (e) {
		var response = getRndInteger(0, 4);
		if (response === 0) {
			message.reply(`>${cmd}.........?`);
		} else if (response === 1) {
			message.reply('뭐라고요...? 잘 못 들었어요.....')
		} else if (response === 2) {
			message.reply('.............?')
		} else if (response === 3) {
			message.reply('죄송해요.... 하지만 그런 명령어는 제 사전에 없었어요...........');
		}
	}
})

client.login(process.env.TOKEN);