exports.run = async (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('아무 음악도 흐르지 않고 있어요...');

	ops.active.shuffle();
	return message.channel.send('무작위로 플레이리스트가 섞어졌어요!')
}