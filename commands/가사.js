const genius = require('genius-lyrics');
const G = new genius.Client('D2ohGelXxA56IZPX4WYK8IqTjG7Z2TUeQKuVmzU8GrMUvdghDtSni07iOdJElU8l')
const Discord = require('discord.js')
const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

exports.run = async (client, message, args, ops) => {
	if(!args[0]) return message.channel.send('노래의 이름을 입력해주세요!');
	if(korean.test() === true) return message.channel.send('한글은 되지 않아요!');
	message.channel.send('*잠시만 기다려주세요... 가사를 찾는 중이에요! (결과는 부정확 할 수 있어요!)*')
	G.tracks.search(args[0])
	.then(results => {
		const song = results[0]
		const lyricsEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${song.title}의 노래 가사는 여기에서 찾을 수 있어요!`)
		.setURL(song.url)
		message.channel.send({embed:lyricsEmbed})
	})
	.catch(err => message.channel.send('음악의 가사를 찾을 수 없어요.. Error: ' + err));
}