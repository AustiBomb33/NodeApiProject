const Author = require('../models/author');
const Book = require('../models/book');

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
        const author = await Author.findById(id);
        const books = await author.getBooks();

        response.status(200)
            .json({
                author,
                books,
                status: "success"
            })
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
        let message, statusMessage = "";
        let status = 200;
        const { id } = request.body;
        const author = await Author.findById(id);
        const books = await author.getBooks();
        if(books.length > 0){
            //fail
            message = `Please delete all of ${author.name}'s books first`;
            status = 409;
            statusMessage = "failure: request conflicts with server state";
        } else {
            //succeed
            await Author.findOneAndDelete({_id: id});
            message = `${author.name} successfully deleted`;
            statusMessage = "success";
        };

        
        response.status(status).json({ message, status: statusMessage});
    } catch (error) {
        next(error);
    }
}