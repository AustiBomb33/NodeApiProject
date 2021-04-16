const Author = require('../models/author');

exports.index = async (request, response, next) => {
    try {
        const authors = await Author.find();

        response.status(200)
            .json(authors);
    } catch (error) {
        next(error);
    }
}

exports.show = async (request, response, next) => {
    try {
        const { id } = request.params;
        const author = Author.findById(id);
        const books = author.getBooks();
    } catch (error) {
        next(error);
    }
}

exports.create = async (request, response, next) => {
    try {
        const { name, birthYear } = request.body;
        const author = await Author.create({
            name,
            birthYear
        });

        response.status(200)
            .json({
                message: "Author was created successfully",
                status: "success",
                author
            })
    } catch (error) {
        next(error);
    }
}

exports.update = async (request, response, next) => {
    try {
        const { id, name, birthYear } = request.body;

        await Author.findOneAndUpdate({ _id: id }, { name, birthYear });
        const author = await Author.findById(id);

        response.status(200)
            .json({
                message: "Author was updated successfully",
                status: "success",
                author
            })
    } catch (error) {
        next(error);
    }
}

exports.destroy = async (request, response, next) => {
    try {
        const {id} = request.body;

        await Author.findOneAndDelete({_id:id});

        response.status(200)
        .json({
            message: "Author Deleted Successfully",
            status: "success"
        });

    } catch (error) {
        next(error);
    }
}