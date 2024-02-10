const mongoose = require('mongoose')

const conspiracySchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		storySchema: {
			type: String,
			required: true,
		},
        elements: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Conspiracy', conspiracySchema)
