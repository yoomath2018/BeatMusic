const Youtube = require('simple-youtube-api');
const youtube = new Youtube('AIzaSyCXt16QwAeQzwvJ-86LEwouXmh5PZ6Zy80');
const ytdl = require('ytdl-core');
exports.run = async (client, message, args, ops) => {
	if(!args[0]) return message.channel.send('곡의 이름이나 유튜브 URL을 써 주세요!');
	if(!message.member.voice.channel) return message.channel.send('음성 채널에 연결해 주세요!');
	if(!args[0].includes('www.youtube.com/watch?v=')) {
		const searchString = args[0]
		const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''

		try {
			var video = await youtube.getVideoByID(url)
		} catch {
			try {
				var videos = await youtube.searchVideos(searchString, 10)
				var index = 0
				message.channel.send(`
				__**곡 고르기**__\n${videos.map(video2 => `**${++index} - **${video2.title}`).join('\n')}\n1부터 10중 번호를 고르세요! (30초)`)
				try {
					var responce = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
						max: 1,
						time: 300000,
						errors: ['time']
					})
				} catch {
					return message.channel.send('시간이 지나 취소되었습니다!');
				}
				const videoindex = parseInt(responce.first().content)
				var video = await youtube.getVideoByID(videos[videoindex - 1].id)
			} catch {
				return message.channel.send('아무 결과도 찾지 못했어요...');
			}
		}
		let musicUrl = `https://www.youtube.com/watch?v=${video.id}`

		message.channel.send('*음악 찾는 중....*');
		let data = ops.active.get(message.guild.id) || {};
		let info = await ytdl.getInfo(musicUrl);
		
		

		if(!data.connection) data.connection = await message.member.voice.channel.join();
		if(!data.queue) data.queue = [];
		data.guildID = message.guild.id;
		data.queue.push({
			songTitle: info.videoDetails.title,
			requester: message.author.tag,
			url: musicUrl,
			announceChannel: message.channel.id,	
		});

		if(!data.dispatcher) play(client, ops, data);
		else {
			message.channel.send(`재생목록에 추가됨: **${info.videoDetails.title}** | 추가한 사람: ${message.author.id}`);
		}
		ops.active.set(message.guild.id, data);
	} else if(args[0].includes('www.youtube.com/watch?v=')){
		
		const validate = ytdl.validateURL(args[0]);
		if(!validate) return message.channel.send('죄송해요, 하지만 제대로 된 유튜브 URL를 넣어주세요!');
		message.channel.send('*음악 찾는 중....*');
		let data = ops.active.get(message.guild.id) || {};
		let info = await ytdl.getInfo(args[0]);
		

		if(!data.connection) data.connection = await message.member.voice.channel.join();
		if(!data.queue) data.queue = [];
		data.guildID = message.guild.id;
		data.queue.push({
			songTitle: info.videoDetails.title,
			requester: message.author.tag,
			url: args[0],
			announceChannel: message.channel.id,	
		});

		if(!data.dispatcher) play(client, ops, data);
		else {
			message.channel.send(`재생목록에 추가됨: **${info.videoDetails.title}** | 추가한 사람: ${message.author.id}`);
		}
		ops.active.set(message.guild.id, data);
	}

	async function play(client, ops, data) {
		client.channels.cache.get(data.queue[0].announceChannel).send(`지금 재생 중: **${data.queue[0].songTitle}** | 추가한 사람: ${data.queue[0].requester}`);

		data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter : 'audioonly' }));
		data.dispatcher.guildID = data.guildID;
		

		data.dispatcher.once('finish', function() {
			finish(client, ops, this);
		});
	}

	function finish(client, ops, dispatcher) {
		let fetched = ops.active.get(dispatcher.guildID);

		if(!fetched.loop) fetched.queue.shift();

		if(fetched.queue.length > 0) {
			ops.active.set(dispatcher.guildID, fetched);
			play(client, ops, fetched);
		} else {
			ops.active.delete(dispatcher.guildID);

			let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
			if(vc){
				vc.leave();
				message.channel.send('음악이 다 끝나서 자동으로 멈췄어요!');
			}
		}
	}
}