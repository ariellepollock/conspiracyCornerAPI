const mongoose = require('mongoose')
const Schema = mongoose.Schema
const elementSchema = require('./element')

const conspiracySchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		story: {
			type: Schema.Types.ObjectId,
            ref: 'Story',
			required: true,
		},
        elements: [elementSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Conspiracy', conspiracySchema)
