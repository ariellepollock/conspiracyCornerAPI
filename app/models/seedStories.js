// npm run seed

const mongoose = require('mongoose')
const Story = require('./models/story')
const db = require('../../config/db')

const startStories = [
    {
        title: "Moon Landing Mirage",
        template: "I've always been fascinated by the 1969 moon landing, but after years of research, I'm convinced it was a {adjective} hoax, masterminded not on the moon, but in a {place}. My theory is supported by the presence of a {noun} in the footage, clearly visible despite the supposed lack of {noun} in space. Delving deeper, I discovered evidence hidden in a {place}, suggesting the use of advanced technology and {plural noun} to fabricate the lunar environment. The anomalies in the photos, especially the shadows and flags, just don't add up unless you consider the involvement of {plural noun} and a {adjective} cover-up."
    },
    {
        title: "Atlantis Power Grid",
        template: "Deep beneath the {place} lies the lost city of Atlantis, and I've unearthed evidence of their {adjective} technologies, most notably a powerful {noun} grid. This ancient civilization harnessed {plural noun}, achieving feats beyond our modern capabilities, like {verb} through air and telepathic communication. However, a catastrophic event led to their downfall when the grid's {noun} malfunctioned. My quest is to locate the lost {noun} of Atlantis, unraveling the secrets of their {adjective} demise and possibly reviving their forgotten technologies."
    },
    {
        title: "Pyramids of Mars",
        template: "Recent images from Mars orbiters have unveiled something incredible: pyramid-like structures on the Martian surface, clearly the work of an advanced, ancient {profession}. I'm convinced Mars hosted a {adjective} civilization capable of {verb} interstellar distances, utilizing {plural noun} we can scarcely imagine. The largest pyramid, which I've named {proper noun}, likely contains {plural noun} and {plural noun} revealing their sophisticated technology. Within its hidden {noun}, I believe lies the key to understanding not only their {adjective} society but potentially unlocking the secrets of the cosmos."
    }
]

// Establish connection to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database. Seeding stories...');

        Story.create(startStories)
            .then(newStories => {
                console.log('New stories added to db: \n', newStories);
                // Close connection
                mongoose.connection.close();
            })
            .catch(error => {
                console.error('An error occurred while seeding stories: \n', error);
                // Close connection
                mongoose.connection.close();
            });
    })
    .catch(error => {
        console.error('Failed to connect to database: \n', error);
        // Close mongoose connection upon receiving error
        mongoose.connection.close();
    });