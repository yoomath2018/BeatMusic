exports.run = async (client, message, args, ops) => {
	if(!args[0]) return message.channel.send('최근 재생한 곡들 중 몇개를 볼 것인가를 선택해 주세요!');
	
	resp = `__*최근 재생한 ${args[0]}곡*__\n`

	for(var i=1; i<=parseInt(args[0]); i++) {
		resp += `1. **${ops.recentName[i]}** | 추가한 사람 *${ops.recentadded[i]}*\n`
	}
}