exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('지금 재생되고 있는 음악이 없어요!');

	if(!fetched.dispatcher.paused) return message.channel.send('음악이 이미 재생되고 있어요.');

	fetched.dispatcher.resume();

	message.channel.send(`*${fetched.queue[0].songTitle}**을 계속 재생했습니다!`);
}
