exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('지금 재생되고 있는 음악이 없어요!');

	if(isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('0부터 200까지의 수를 넣어주세요!');

	fetched.dispatcher.setVolume(args[0]/100);

	message.channel.send(`**${fetched.queue[0].songTitle}**의 볼륨을 ${args[0]}으로 정했습니다!`);
}