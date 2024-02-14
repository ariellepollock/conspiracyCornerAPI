const mongoose = require('mongoose')
const Schema = mongoose.Schema
const elementSchema = require('./element')

const conspiracySchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
            default: Date.now
		},
		story: {
			type: Schema.Types.ObjectId,
            ref: 'Story',
			required: true,
		},
        elements: [elementSchema],
		filledStory: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Conspiracy', conspiracySchema)
