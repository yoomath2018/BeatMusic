exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('지금 재생되고 있는 음악이 없어요!');

	if(fetched.dispatcher.paused) return message.channel.send('음악이 이미 일시정지되었어요.');

	fetched.dispatcher.pause();

	message.channel.send(`**${fetched.queue[0].songTitle}**을(를) 일시정지했습니다!`);
}
