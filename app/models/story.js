const mongoose = require('mongoose')

const storySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		template: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Story', storySchema)
