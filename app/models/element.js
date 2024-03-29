// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// element is a subdoc NOT a model
// elements will exist as a part of a conspiracy's elements array
// each element will belong to one conspiracy
// conspiracy -|--< element

const elementSchema = new Schema({
    placeholder: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = elementSchema