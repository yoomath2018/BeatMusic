exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('아무 음악도 흐르지 않고 있어요..');

	let userCount = message.member.voice.channel.members.size;
	let required = Math.ceil(userCount/2);
	if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

	if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`죄송해요, 하지만 이미 투표했어요! ${fetched.queue[0].voteSkips.length}/${required}`);
	fetched.queue[0].voteSkips.push(message.member.id);

	ops.active.set(message.guild.id, fetched);

	if(fetched.queue[0].voteSkips.length >= required) {
		message.channel.send('성공적으로 스킵했습니다!');
		return fetched.dispatcher.emit('finish');
	}
	message.channel.send(`성공적으로 투표했습니다! ${fetched.queue[0].voteSkips.length}/${required}`);
}