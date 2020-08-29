exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('아무 음악도 흐르지 않고 있어요..');
	
	fetched.loop = !fetched.loop

	return message.channel.send(`반복: ${fetched.loop ? `**활성화 됨**`: `**비활성화 됨**`}`)
}