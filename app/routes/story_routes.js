// import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for conspiracies
const Story = require('../models/story')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//
// routes go here
//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//

// INDEX
// GET /stories
router.get('/stories', (req, res, next) => {
	Story.find()
		.then((stories) => {
			// `stories` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return stories.map((story) => story.toObject())
		})
		// respond with status 200 and JSON of the stories
		.then((stories) => res.status(200).json({ stories: stories }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW - template
// GET /stories/:id/template
router.get('/stories/:id', (req, res, next) => {
    Story.findById(req.params.id)
        .then(handle404)
        .then((story) => res.status(200).json({ story: story.toObject() }))
        .catch(next)
})

// CREATE - only to be used via postman - will not be accessible to user
// POST /stories
router.post('/stories', (req, res) => {
    const { title, template } = req.body

    Story.create({ title, template })
        .then(story => {
            res.status(201).json({ story })
        })
        .catch(error => {
            res.status(400).json({ error: error.message })
        })
})

// DESTROY
// DELETE /stories/5a7db6c74d55bc51bdf39793
router.delete('/stories/:id', (req, res, next) => {
	Story.findById(req.params.id)
		.then(handle404)
		.then((story) => {
			// delete the story
			story.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
