const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        set: value => value.trim().replace(/\s+/g, " ").toLowerCase(),
    },
    birthYear: {
        type: Number,
        required: true,
        unique: false,
        dropDups: false,
        validate: {
            validator: async function (value) {
                let curYear = new Date().getFullYear();
                return (value > 0 && value <= curYear);
            },
            message: props => `${value} is not a valid year`
        }
    }
},
    {
        timestamps: true
    });

    module.exports = mongoose.model("author", authorSchema);