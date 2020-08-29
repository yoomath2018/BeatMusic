const Discord = require('discord.js');
const Comment = require('./models/comment.js');
const mongoose = require('mongoose')

exports.run = async (client, message, args, ops) => {
	let comments1 = args[0];
	if(!args[0]) return message.channel.send('댓글을 달아 주세요!')
	mongoose.connect('mongodb://localhost/Comments', { useNewUrlParser: true, useUnifiedTopology: true })


	const comment = new Comment({
		comment: comments1,
		time: message.createdAt,
		guildName: Discord.Guild.name,
	});

	message.channel.send('댓글 저장 중....')
	comment.save()
	.catch(err => console.log(err));

	message.reply('댓글이 저장되었어요!');
}