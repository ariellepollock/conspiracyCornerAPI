// install dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for conspiracies
const Conspiracy = require('../models/conspiracy')
const Story = require('../models/story')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// middleware
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//
// routes go here
//+//+//+//+//+//+//+//+//+//+//+//+//+//+//+//

// INDEX
// GET /conspiracies
router.get('/conspiracies', (req, res, next) => {
	Conspiracy.find()
		.populate('story')
		.sort({ date: -1 }) // date in descending order
		.then((conspiracies) => {
			// `conspiracies` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			requireOwnership(req, conspiracy)
			
			return conspiracies.map((conspiracy) => conspiracy.toObject())
		})
		// respond with status 200 and JSON of the conspiracies
		.then((conspiracies) => res.status(200).json({ conspiracies: conspiracies }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /conspiracies/5a7db6c74d55bc51bdf39793
router.get('/conspiracies/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Conspiracy.findById(req.params.id)
		.populate('story')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "conspiracy" JSON
		.then((conspiracy) => res.status(200).json({ conspiracy: conspiracy.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /conspiracies
router.post('/conspiracies', requireToken, (req, res, next) => {
	// set owner of new conspiracy to be current user
	req.body.conspiracy.owner = req.user.id

    // extract storyId and elements from req.body
    const { story: storyId, elements } = req.body.conspiracy

    // find story template by storyId
    Story.findById(storyId)
        .then(handle404)
        .then(story => {
            // replace placeholders in story template with user content
            let filledStory = story.template
            elements.forEach(element => {
                const placeholderRegex = new RegExp(`{${element.placeholder}}`, 'g')
                filledStory = filledStory.replace(placeholderRegex, element.content)
            })

            // create new conspiracy with filled story
            return Conspiracy.create({
                ...req.body.conspiracy,
                filledStory: filledStory,
                story: storyId,
            })
        })
		// respond to succesful `create` with status 201 and JSON of new "conspiracy"
		.then((conspiracy) => {
			res.status(201).json({ conspiracy: conspiracy.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /conspiracies/5a7db6c74d55bc51bdf39793
const replacePlaceholdersWithContent = (template, elements) => {
    let filledTemplate = template;
    elements.forEach(element => {
        const placeholderRegex = new RegExp(`{${element.placeholder}}`, 'g');
        filledTemplate = filledTemplate.replace(placeholderRegex, element.content);
    });
    return filledTemplate;
};

router.patch('/conspiracies/:id', requireToken, removeBlanks, (req, res, next) => {
    delete req.body.conspiracy.owner;

    Conspiracy.findById(req.params.id)
        .then(handle404)
        .then(conspiracy => {
            requireOwnership(req, conspiracy);

            // Additional logic to update story content
            return Story.findById(conspiracy.story).then(story => {
                const updatedFilledStory = replacePlaceholdersWithContent(story.template, req.body.conspiracy.elements);
                const updatedConspiracyData = {
                    ...req.body.conspiracy,
                    filledStory: updatedFilledStory, // Update the filled story content
                };

                // Perform the update on the conspiracy document
                return conspiracy.updateOne(updatedConspiracyData).then(() => {
                    // After updating, fetch the updated conspiracy document to include in the response
                    return Conspiracy.findById(req.params.id)
                        .populate('story')
                        .then(updatedConspiracy => {
                            // Return the updated conspiracy object in the response
                            res.status(200).json({ conspiracy: updatedConspiracy.toObject() });
                        });
                });
            });
        })
        .catch(next);
});

// DESTROY
// DELETE /conspiracies/5a7db6c74d55bc51bdf39793
router.delete('/conspiracies/:id', requireToken, (req, res, next) => {
	Conspiracy.findById(req.params.id)
		.then(handle404)
		.then((conspiracy) => {
			// throw an error if current user doesn't own `conspiracy`
			requireOwnership(req, conspiracy)
			// delete the conspiracy ONLY IF the above didn't throw
			conspiracy.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
