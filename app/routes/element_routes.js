// import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for conspiracies
const Conspiracy = require('../models/conspiracy')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//
// routes go here
//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//

// CREATE
// POST /elements/id
router.post('/elements/:conspiracyId', removeBlanks, (req, res, next) => {
	// save element from request body
	const element = req.body.element
    // save conspiracy id for easy ref
    const conspiracyId = req.params.conspiracyId

	Conspiracy.findById(conspiracyId)
		.then(handle404)
		.then((conspiracy) => {
            conspiracy.elements.push(element)

			return element.save()
		})
        .then(conspiracy => res.status(201).json({ conspiracy: conspiracy }))
		.catch(next)
})

// UPDATE
// PATCH /elements/id/id
router.patch('/elements/:conspiracyId/:elementId', requireToken, removeBlanks, (req, res, next) => {
	// grab ids from req.params
    const { conspiracyId, elementId } = req.params

	Conspiracy.findById(conspiracyId)
		.then(handle404)
		.then((conspiracy) => {
			// single out element
            const theElement = conspiracy.elements.id(elementId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, conspiracy)

            // update existing element
            theElement.set(req.body.element)

			// pass the result of Mongoose's `.update` to the next `.then`
			return conspiracy.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DELETE /elements/id/id
router.delete('/elements/:conspiracyId/:elementId', requireToken, removeBlanks, (req, res, next) => {
	// grab ids from req.params
    const { conspiracyId, elementId } = req.params

	Conspiracy.findById(conspiracyId)
		.then(handle404)
		.then((conspiracy) => {
			// single out element
            const theElement = conspiracy.elements.id(elementId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, conspiracy)

            // update existing element
            theElement.deleteOne()

			// pass the result of Mongoose's `.update` to the next `.then`
			return conspiracy.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
