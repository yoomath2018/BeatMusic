const Discord = require('discord.js');
const client = new Discord.Client();
const active = new Map();
const prefix = '>';
const ownerID = '';


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
		console.log(e)
	}
})

client.login(process.env.TOKEN);