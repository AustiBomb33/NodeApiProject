const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        set: value => value.trim().replace(/\s+/g, " ").toLowerCase()
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: async function (value) {
                const curYear = new Date().getFullYear()

                return (value > 0 && value <= curYear);
            },
            message: props => `${value} is not a valid year`
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true
    }
},
    {
        timestamps: true
    });

    module.exports = mongoose.model("Book", bookSchema);