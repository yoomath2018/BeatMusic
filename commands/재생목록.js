exports.run = async (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('아무 음악도 흐르지 않고 있어요...');

	let queue = fetched.queue;
	let nowPlaying = queue[0];

	let resp = `__**지금 재생 중**__\n**${nowPlaying.songTitle}** -- **추가한 사람:** *${nowPlaying.requester}*\n\n__**재생목록**__\n`;

	for (var i = 1; i < queue.length; i++) {
		resp += `${i}. **${queue[i].songTitle}** -- **추가한 사람:** *${queue[i].requester}*\n`;
		
	}
	message.channel.send(resp);
}