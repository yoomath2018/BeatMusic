exports.run = (client, message, args, ops) => {
	if(!message.member.voice.channel) return message.channel.send('음성 채널에 연결해 주세요!');
	if(!message.guild.me.voice.channel) return message.channel.send('지금 재생되고 있는 음악이 없어요!');
	message.guild.me.voice.channel.leave();
	message.channel.send('*음악을 멈추는 중....*');
}