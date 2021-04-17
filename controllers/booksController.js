const Author = require('../models/author');
const Book = require('../models/book');

exports.index = async (request, response, next) => {
    try {
        const books = await Book.find();
        response.status(200)
            .json(books);
    } catch (error) {
        next(error);
    }
}

exports.show = async (request, response, next) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        const author = await Author.findById(book.author._id);

        response.status(200)
            .json({
                author,
                book,
                status: "success"
            })

    } catch (error) {
        next(error);
    }
}

exports.create = async (request, response, next) => {
    try {
        const { title, year, authorId } = request.body;
        const author = await Author.findById(authorId);
        const book = await Book.create({
            title,
            year,
            author
        });

        response.status(200)
            .json({
                message: "Book was created successfully",
                status: "success",
                book
            })
    } catch (error) {
        next(error);
    }
}

exports.update = async (request, response, next) => {
    try {
        const { id, title, year, authorId } = request.body;
        const author = await Author.findById(authorId);
        await Book.findOneAndUpdate({ _id: id }, { title, year, author });

        response.status(200)
            .json({
                message: "Book was updated successfully",
                status: "success",
                author
            })
    } catch (error) {
        next(error);
    }
}

exports.destroy = async (request, response, next) => {
    try {
        const { id } = request.body;

        await Book.findOneAndDelete({ _id: id });

        response.status(200)
            .json({
                message: "Book Deleted Successfully",
                status: "success"
            });

    } catch (error) {
        next(error);
    }
}