const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	comment: String,
	time: String,
	guildName: String,
});

module.exports = mongoose.model('Comment', commentSchema);