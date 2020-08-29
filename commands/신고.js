const Discord = require('discord.js');
const Report = require('./models/report.js');
const mongoose = require('mongoose')

exports.run = async (client, message, args, ops) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send('**그 사람**을 찾을 수 없어요...');
	let reason = args.join(' ').slice(22);
	if(!reason) return message.channel.send('이유가 없어요..');
	mongoose.connect('mongodb://localhost/Reports', { useNewUrlParser: true, useUnifiedTopology: true })


	const report = new Report({
		_id: mongoose.Types.ObjectId(),
		username: rUser.user.username,
		userID: rUser.id,
		reason: reason,
		rUsername: message.author.username,
		rID: message.author.id,
		time: message.createdAt,
		guildName: Discord.Guild.name,
	});
	report.save()
	.catch(err => console.log(err));

	message.reply('신고가 저장되었어요!');
}