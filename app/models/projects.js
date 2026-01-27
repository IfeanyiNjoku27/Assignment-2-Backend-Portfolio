const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        title: {
            title: String,
            required: 'Title is required',
            trim: true
        },
        // To make URL friendly, human readable, and cleaner
        slug: {
            type: String,
            trim: true
        },
        completion: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            required: 'Description is required',
            trim: true
        },
        tags: [{
            type: String, //e.g., ["React Native", "Expo", "Python", etc.]
            trim: true
        }],
        githubUrl: {
            type: String,
            trim: true
        },
        liveUrl: {
            type: String,
            trim: true
        },
        imageUrl: {
            type: String,
            default: "https://placehold.co/600x400?text=Project+Thumbnail"
        }

    }
);

module.exports = mongoose.model('Project', projectSchema);